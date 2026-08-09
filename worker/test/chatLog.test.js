import { describe, it, expect, beforeAll, vi } from "vitest";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { logChat } from "../src/lib/chatLog.js";

beforeAll(() => {
  mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });
  const file = new URL("../src/generated/resumeContext.js", import.meta.url);
  if (!existsSync(file)) {
    writeFileSync(file, 'export const RESUME_CONTEXT = "Capital One — Kafka streaming.";\n');
  }
});

// Minimal D1 stand-in that records the bound parameters of each insert.
function fakeD1(onRun = async () => {}) {
  const rows = [];
  return {
    rows,
    prepare(sql) {
      if (sql.startsWith("DELETE")) {
        return { async run() { await onRun(); } };
      }
      return {
        bind(...params) {
          return {
            async run() {
              await onRun();
              rows.push({ sql, params });
            },
          };
        },
      };
    },
  };
}

function fakeAnthropic(text, { throwOnCreate = false, throwMidStream = false } = {}) {
  return {
    messages: {
      create: async () => {
        if (throwOnCreate) throw new Error("model down");
        return (async function* () {
          yield { type: "content_block_delta", delta: { type: "text_delta", text } };
          if (throwMidStream) throw new Error("stream exploded");
        })();
      },
    },
  };
}

function chatRequest(content = "Does he know Kafka?") {
  return new Request("https://worker.example/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://suneelkumarbikkasani.com" },
    body: JSON.stringify({ messages: [{ role: "user", content }] }),
  });
}

function makeEnv(overrides = {}) {
  return {
    RATE_LIMITER: { limit: async () => ({ success: true }) },
    ANTHROPIC: fakeAnthropic("Yes — Kafka at Capital One."),
    ...overrides,
  };
}

// Drain the SSE body so the stream's finally block (which triggers logging) runs.
async function drain(res) {
  await new Response(res.body).text();
}

describe("logChat", () => {
  it("stores the question, answer, and timestamp", async () => {
    const db = fakeD1();
    await logChat({ CHAT_LOG: db }, { question: "Kafka?", answer: "Yes." });

    expect(db.rows).toHaveLength(1);
    const [askedAt, question, answer, error] = db.rows[0].params;
    expect(question).toBe("Kafka?");
    expect(answer).toBe("Yes.");
    expect(error).toBeNull();
    expect(() => new Date(askedAt).toISOString()).not.toThrow();
  });

  it("removes chat records older than 90 days after each write", async () => {
    const statements = [];
    const db = {
      prepare(sql) {
        statements.push(sql);
        return {
          bind() { return { async run() {} }; },
          async run() {},
        };
      },
    };
    await logChat({ CHAT_LOG: db }, { question: "q", answer: "a" });
    expect(statements[1]).toContain("-90 days");
  });

  it("truncates a runaway answer", async () => {
    const db = fakeD1();
    await logChat({ CHAT_LOG: db }, { question: "q", answer: "x".repeat(20_000) });
    expect(db.rows[0].params[2]).toHaveLength(8000);
  });

  it("is a no-op when the database is not bound", async () => {
    await expect(logChat({}, { question: "q", answer: "a" })).resolves.toBeUndefined();
  });

  it("swallows a write failure instead of throwing", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const db = fakeD1(async () => {
      throw new Error("d1 unavailable");
    });

    await expect(logChat({ CHAT_LOG: db }, { question: "q", answer: "a" })).resolves.toBeUndefined();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("chat logging through the handler", () => {
  it("records the exchange after the stream completes", async () => {
    const worker = (await import("../src/index.js")).default;
    const db = fakeD1();
    const res = await worker.fetch(chatRequest(), makeEnv({ CHAT_LOG: db }));
    await drain(res);

    expect(db.rows).toHaveLength(1);
    const [, question, answer] = db.rows[0].params;
    expect(question).toBe("Does he know Kafka?");
    expect(answer).toBe("Yes — Kafka at Capital One.");
  });

  it("logs only the latest user turn, not the whole history", async () => {
    const worker = (await import("../src/index.js")).default;
    const db = fakeD1();
    const req = new Request("https://worker.example/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://suneelkumarbikkasani.com" },
      body: JSON.stringify({
        messages: [
          { role: "user", content: "First question" },
          { role: "assistant", content: "First answer" },
          { role: "user", content: "Second question" },
        ],
      }),
    });
    await drain(await worker.fetch(req, makeEnv({ CHAT_LOG: db })));

    expect(db.rows[0].params[1]).toBe("Second question");
  });

  it("records the error when the model call fails outright", async () => {
    const worker = (await import("../src/index.js")).default;
    const db = fakeD1();
    const env = makeEnv({ CHAT_LOG: db, ANTHROPIC: fakeAnthropic("", { throwOnCreate: true }) });

    const res = await worker.fetch(chatRequest("Kafka?"), env);
    expect(res.status).toBe(502);
    expect(db.rows[0].params[1]).toBe("Kafka?");
    expect(db.rows[0].params[2]).toBeNull();
    expect(db.rows[0].params[3]).toContain("model down");
  });

  it("still answers the visitor when logging blows up", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const worker = (await import("../src/index.js")).default;
    const db = fakeD1(async () => {
      throw new Error("d1 unavailable");
    });

    const res = await worker.fetch(chatRequest(), makeEnv({ CHAT_LOG: db }));
    expect(res.status).toBe(200);
    expect(await new Response(res.body).text()).toContain("Kafka at Capital One.");
    spy.mockRestore();
  });

  it("chats normally with no database bound at all", async () => {
    const worker = (await import("../src/index.js")).default;
    const res = await worker.fetch(chatRequest(), makeEnv());

    expect(res.status).toBe(200);
    expect(await new Response(res.body).text()).toContain("data: [DONE]");
  });

  it("uses ctx.waitUntil so the write does not block the response", async () => {
    const worker = (await import("../src/index.js")).default;
    const db = fakeD1();
    const pending = [];
    const ctx = { waitUntil: (p) => pending.push(p) };

    await drain(await worker.fetch(chatRequest(), makeEnv({ CHAT_LOG: db }), ctx));

    expect(pending).toHaveLength(1);
    await Promise.all(pending);
    expect(db.rows).toHaveLength(1);
  });
});
