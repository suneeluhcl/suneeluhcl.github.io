import { describe, it, expect, beforeAll } from "vitest";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";

// Provide a generated context stub so the handler import resolves in tests —
// but ONLY when the real generated file is absent. Never clobber a context
// produced by scripts/gen-resume-context.mjs: an earlier version of this hook
// overwrote it unconditionally, and that stub once shipped to production and
// left the assistant unable to answer anything.
beforeAll(() => {
  mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });
  const file = new URL("../src/generated/resumeContext.js", import.meta.url);
  if (!existsSync(file)) {
    writeFileSync(file, 'export const RESUME_CONTEXT = "Capital One — Kafka streaming.";\n');
  }
});

// Fake Anthropic client: `messages.create` returns an async-iterable of SSE
// events shaped like the real SDK stream. `hooks` lets tests observe params or
// force an error.
function fakeAnthropic(text, hooks = {}) {
  return {
    messages: {
      create: async (params) => {
        hooks.onCreate?.(params);
        if (hooks.throwOnCreate) throw new Error("model down");
        return (async function* () {
          for (const chunk of text.split(" ")) {
            yield { type: "content_block_delta", delta: { type: "text_delta", text: chunk + " " } };
          }
        })();
      },
    },
  };
}

function makeEnv(overrides = {}) {
  return {
    RATE_LIMITER: { limit: async () => ({ success: true }) },
    ANTHROPIC: fakeAnthropic("Yes, Kafka at Capital One."),
    ...overrides,
  };
}

function post(body, origin = "https://suneelkumarbikkasani.com") {
  return new Request("https://worker.example/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      "CF-Connecting-IP": "1.2.3.4",
    },
    body: JSON.stringify(body),
  });
}

describe("worker fetch handler", () => {
  it("rejects foreign origins with 403", async () => {
    const worker = (await import("../src/index.js")).default;
    const res = await worker.fetch(post({ messages: [{ role: "user", content: "hi" }] }, "https://evil.example"), makeEnv());
    expect(res.status).toBe(403);
  });

  it("returns 429 when rate limited", async () => {
    const worker = (await import("../src/index.js")).default;
    const env = makeEnv({ RATE_LIMITER: { limit: async () => ({ success: false }) } });
    const res = await worker.fetch(post({ messages: [{ role: "user", content: "hi" }] }), env);
    expect(res.status).toBe(429);
  });

  it("returns 400 on invalid body", async () => {
    const worker = (await import("../src/index.js")).default;
    const res = await worker.fetch(post({ messages: [] }), makeEnv());
    expect(res.status).toBe(400);
  });

  it("streams an answer for a valid request, injecting the résumé system prompt and forwarding user messages", async () => {
    const worker = (await import("../src/index.js")).default;
    let seenParams;
    const env = makeEnv({ ANTHROPIC: fakeAnthropic("ok", { onCreate: (p) => { seenParams = p; } }) });
    const res = await worker.fetch(post({ messages: [{ role: "user", content: "Kafka?" }] }), env);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/event-stream");
    // System prompt is a top-level Anthropic param, not a message; user turns pass through.
    expect(seenParams.system).toContain("Capital One");
    expect(seenParams.messages[0]).toEqual({ role: "user", content: "Kafka?" });
    const text = await new Response(res.body).text();
    expect(text).toContain('data: {"response":');
    expect(text).toContain("data: [DONE]");
  });

  it("returns 502 with CORS headers when the Anthropic call fails", async () => {
    const worker = (await import("../src/index.js")).default;
    const env = makeEnv({ ANTHROPIC: fakeAnthropic("", { throwOnCreate: true }) });
    const res = await worker.fetch(post({ messages: [{ role: "user", content: "hi" }] }), env);
    expect(res.status).toBe(502);
    expect(res.headers.get("access-control-allow-origin")).toBe("https://suneelkumarbikkasani.com");
  });

  it("keys the rate limiter by client IP", async () => {
    const worker = (await import("../src/index.js")).default;
    let seenKey;
    const env = makeEnv({ RATE_LIMITER: { limit: async ({ key }) => { seenKey = key; return { success: true }; } } });
    await worker.fetch(post({ messages: [{ role: "user", content: "hi" }] }), env);
    expect(seenKey).toBe("1.2.3.4");
  });
});
