import { buildSystemPrompt } from "./lib/systemPrompt.js";
import { isAllowedOrigin, validateMessages, ALLOWED_ORIGINS } from "./lib/validation.js";
import { validateContact, sendViaResend } from "./lib/contact.js";
import { logChat, runInBackground } from "./lib/chatLog.js";
import { createModelStream } from "./lib/modelProvider.js";
import { RESUME_CONTEXT } from "./generated/resumeContext.js";

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
//
// `onComplete(answer, error)` fires once the stream finishes either way, so the
// caller can record the full answer without buffering it out of the response path.
function toResponseStream(modelStream, onComplete) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      let answer = "";
      let failure = null;
      try {
        for await (const token of modelStream) {
          if (token) {
            answer += token;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ response: token })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        failure = err?.message || String(err);
        console.error("stream failed:", err?.stack || failure);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "stream_failed" })}\n\n`));
      } finally {
        controller.close();
        onComplete?.(answer, failure);
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
  async fetch(request, env, ctx) {
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

    // The last user turn is the question being asked right now; earlier turns are
    // history already recorded by their own request.
    const question = [...v.messages].reverse().find((m) => m.role === "user")?.content ?? "";

    try {
      const modelStream = await createModelStream(env, {
        instructions: buildSystemPrompt(RESUME_CONTEXT),
        messages: v.messages,
        maxTokens: MAX_TOKENS,
      });

      const stream = toResponseStream(modelStream, (answer, error) =>
        runInBackground(ctx, logChat(env, { question, answer, error })),
      );
      return new Response(stream, {
        headers: { ...cors, "content-type": "text/event-stream" },
      });
    } catch (err) {
      const message = err?.message || String(err);
      console.error("AI request failed:", err?.stack || message);
      runInBackground(ctx, logChat(env, { question, answer: null, error: message }));
      return json({ error: "ai_unavailable" }, 502, cors);
    }
  },
};
