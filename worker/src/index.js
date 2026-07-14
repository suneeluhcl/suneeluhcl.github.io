import { buildSystemPrompt } from "./lib/systemPrompt.js";
import { isAllowedOrigin, validateMessages, ALLOWED_ORIGINS } from "./lib/validation.js";
import { RESUME_CONTEXT } from "./generated/resumeContext.js";

const MODEL = "@cf/meta/llama-3.1-8b-instruct-fp8";

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

    const v = validateMessages(body?.messages);
    if (!v.ok) return json({ error: v.error }, 400, cors);

    const messages = [
      { role: "system", content: buildSystemPrompt(RESUME_CONTEXT) },
      ...v.messages,
    ];

    try {
      const stream = await env.AI.run(MODEL, { messages, stream: true, max_tokens: 512 });
      return new Response(stream, {
        headers: { ...cors, "content-type": "text/event-stream" },
      });
    } catch (err) {
      console.error("AI.run failed:", err?.stack || err?.message || String(err));
      return json({ error: "ai_unavailable" }, 502, cors);
    }
  },
};
