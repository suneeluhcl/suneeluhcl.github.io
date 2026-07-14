import { describe, it, expect, beforeAll } from "vitest";
import { mkdirSync, writeFileSync } from "node:fs";

// Provide a generated context stub so the handler import resolves in tests.
beforeAll(() => {
  mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });
  writeFileSync(
    new URL("../src/generated/resumeContext.js", import.meta.url),
    'export const RESUME_CONTEXT = "Capital One — Kafka streaming.";\n',
  );
});

function fakeStream(text) {
  return new ReadableStream({
    start(c) {
      c.enqueue(new TextEncoder().encode(`data: {"response":${JSON.stringify(text)}}\n\n`));
      c.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      c.close();
    },
  });
}

function makeEnv(overrides = {}) {
  return {
    RATE_LIMITER: { limit: async () => ({ success: true }) },
    AI: { run: async () => fakeStream("Yes, Kafka at Capital One.") },
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

  it("streams an answer for a valid request and injects the system prompt", async () => {
    const worker = (await import("../src/index.js")).default;
    let seenMessages;
    const env = makeEnv({ AI: { run: async (_model, opts) => { seenMessages = opts.messages; return fakeStream("ok"); } } });
    const res = await worker.fetch(post({ messages: [{ role: "user", content: "Kafka?" }] }), env);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/event-stream");
    expect(seenMessages[0].role).toBe("system");
    expect(seenMessages[0].content).toContain("Capital One");
    const text = await new Response(res.body).text();
    expect(text).toContain("data:");
  });
});
