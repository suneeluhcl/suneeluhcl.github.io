import { describe, it, expect, beforeAll } from "vitest";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { validateContact } from "../src/lib/contact.js";

// Same guard as handler.test.js: make the handler import resolve without ever
// clobbering a real generated context.
beforeAll(() => {
  mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });
  const file = new URL("../src/generated/resumeContext.js", import.meta.url);
  if (!existsSync(file)) {
    writeFileSync(file, 'export const RESUME_CONTEXT = "Capital One — Kafka streaming.";\n');
  }
});

const VALID = { name: "Jane Recruiter", email: "jane@company.com", message: "Are you available?" };

function makeEnv(overrides = {}) {
  return {
    RATE_LIMITER: { limit: async () => ({ success: true }) },
    RESEND_API_KEY: "re_test",
    CONTACT_TO: "suneeluhcl@gmail.com",
    CONTACT_FROM: "Portfolio <portfolio@suneelkumarbikkasani.com>",
    SEND_EMAIL: async () => {},
    ...overrides,
  };
}

function postContact(body, origin = "https://suneelkumarbikkasani.com") {
  return new Request("https://worker.example/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      "CF-Connecting-IP": "1.2.3.4",
    },
    body: JSON.stringify(body),
  });
}

describe("validateContact", () => {
  it("accepts a well-formed submission and trims whitespace", () => {
    const v = validateContact({ name: "  Jane  ", email: " jane@company.com ", message: " hi " });
    expect(v.ok).toBe(true);
    expect(v.spam).toBe(false);
    expect(v.data).toEqual({ name: "Jane", email: "jane@company.com", message: "hi" });
  });

  it.each([
    ["missing name", { ...VALID, name: "   " }],
    ["missing email", { ...VALID, email: "" }],
    ["malformed email", { ...VALID, email: "not-an-email" }],
    ["missing message", { ...VALID, message: "" }],
    ["overlong message", { ...VALID, message: "x".repeat(5001) }],
    ["overlong name", { ...VALID, name: "x".repeat(101) }],
    ["not an object", "nope"],
  ])("rejects %s", (_label, input) => {
    expect(validateContact(input).ok).toBe(false);
  });

  it("flags a filled honeypot as spam without failing validation", () => {
    const v = validateContact({ ...VALID, website: "http://spam.example" });
    expect(v.ok).toBe(true);
    expect(v.spam).toBe(true);
  });
});

describe("POST /contact", () => {
  it("sends the message and returns ok", async () => {
    const worker = (await import("../src/index.js")).default;
    let sent;
    const env = makeEnv({ SEND_EMAIL: async (_env, data) => { sent = data; } });
    const res = await worker.fetch(postContact(VALID), env);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sent).toEqual(VALID);
  });

  it("silently drops honeypot submissions but looks identical to the client", async () => {
    const worker = (await import("../src/index.js")).default;
    let called = false;
    const env = makeEnv({ SEND_EMAIL: async () => { called = true; } });
    const res = await worker.fetch(postContact({ ...VALID, website: "spam" }), env);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(called).toBe(false);
  });

  it("returns 400 on an invalid submission", async () => {
    const worker = (await import("../src/index.js")).default;
    const res = await worker.fetch(postContact({ ...VALID, email: "bad" }), makeEnv());
    expect(res.status).toBe(400);
  });

  it("returns 503 when the form is not configured", async () => {
    const worker = (await import("../src/index.js")).default;
    const env = makeEnv({ RESEND_API_KEY: undefined });
    const res = await worker.fetch(postContact(VALID), env);
    expect(res.status).toBe(503);
  });

  it("returns 502 with CORS headers when delivery fails", async () => {
    const worker = (await import("../src/index.js")).default;
    const env = makeEnv({ SEND_EMAIL: async () => { throw new Error("resend down"); } });
    const res = await worker.fetch(postContact(VALID), env);

    expect(res.status).toBe(502);
    expect(res.headers.get("access-control-allow-origin")).toBe("https://suneelkumarbikkasani.com");
  });

  it("rejects foreign origins and rate-limits like the chat route", async () => {
    const worker = (await import("../src/index.js")).default;
    const forbidden = await worker.fetch(postContact(VALID, "https://evil.example"), makeEnv());
    expect(forbidden.status).toBe(403);

    const limited = await worker.fetch(
      postContact(VALID),
      makeEnv({ RATE_LIMITER: { limit: async () => ({ success: false }) } }),
    );
    expect(limited.status).toBe(429);
  });

  it("leaves the chat route on the worker root untouched", async () => {
    const worker = (await import("../src/index.js")).default;
    const req = new Request("https://worker.example/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://suneelkumarbikkasani.com" },
      body: JSON.stringify({ messages: [{ role: "user", content: "Kafka?" }] }),
    });
    const env = makeEnv({
      ANTHROPIC: {
        messages: {
          create: async () => (async function* () {
            yield { type: "content_block_delta", delta: { type: "text_delta", text: "yes" } };
          })(),
        },
      },
    });
    const res = await worker.fetch(req, env);
    expect(res.headers.get("content-type")).toContain("text/event-stream");
  });
});
