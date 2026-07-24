import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "./lib/systemPrompt.js";
import { isAllowedOrigin, validateMessages, ALLOWED_ORIGINS } from "./lib/validation.js";
import { validateContact, sendViaResend } from "./lib/contact.js";
import { RESUME_CONTEXT } from "./generated/resumeContext.js";

// Claude model powering the "Ask my résumé" assistant.
// Haiku 4.5 is fast + cheap (fractions of a cent per chat) and plenty capable
// for résumé Q&A. To upgrade quality, swap for "claude-sonnet-5" or "claude-opus-4-8".
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 512;

function corsHeaders(origin) {
  const allow = isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, "content-type": "application/json" },
  });
}

// Transform Anthropic's SSE event stream into the `data: {"response": "<token>"}`
// shape the frontend (src/hooks/useChat.js) already parses, so the client needs
// no changes when the backend model swaps.
function toResponseStream(anthropicStream) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const event of anthropicStream) {
          if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
            const token = event.delta.text;
            if (token) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ response: token })}\n\n`));
            }
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        console.error("stream failed:", err?.stack || err?.message || String(err));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "stream_failed" })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });
}

// POST /contact — portfolio contact form. Delivered by email so a message is never
// silently lost, which is exactly what the previous mailto: form did on machines
// with no native mail client configured.
async function handleContact(body, env, cors) {
  const v = validateContact(body);
  if (!v.ok) return json({ error: v.error }, 400, cors);

  // Honeypot tripped: answer exactly like the success path and drop the message.
  if (v.spam) return json({ ok: true }, 200, cors);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error("contact form is not configured (RESEND_API_KEY / CONTACT_TO / CONTACT_FROM)");
    return json({ error: "contact_unavailable" }, 503, cors);
  }

  try {
    // env.SEND_EMAIL lets tests inject a fake sender.
    await (env.SEND_EMAIL ?? sendViaResend)(env, v.data);
    return json({ ok: true }, 200, cors);
  } catch (err) {
    console.error("contact delivery failed:", err?.stack || err?.message || String(err));
    return json({ error: "contact_unavailable" }, 502, cors);
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, cors);
    if (!isAllowedOrigin(origin)) return json({ error: "forbidden" }, 403, cors);

    const ip = request.headers.get("CF-Connecting-IP") ?? "anon";
    const { success } = await env.RATE_LIMITER.limit({ key: ip });
    if (!success) return json({ error: "rate_limited" }, 429, cors);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "bad_json" }, 400, cors);
    }

    // The chat client posts to the worker root, so anything that is not an
    // explicit route stays on the existing chat path.
    if (new URL(request.url).pathname.replace(/\/+$/, "") === "/contact") {
      return handleContact(body, env, cors);
    }

    const v = validateMessages(body?.messages);
    if (!v.ok) return json({ error: v.error }, 400, cors);

    // env.ANTHROPIC lets tests inject a fake client; production builds one from the secret.
    const client = env.ANTHROPIC ?? new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

    try {
      const anthropicStream = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: buildSystemPrompt(RESUME_CONTEXT),
        messages: v.messages,
        stream: true,
      });
      return new Response(toResponseStream(anthropicStream), {
        headers: { ...cors, "content-type": "text/event-stream" },
      });
    } catch (err) {
      console.error("Anthropic request failed:", err?.stack || err?.message || String(err));
      return json({ error: "ai_unavailable" }, 502, cors);
    }
  },
};
