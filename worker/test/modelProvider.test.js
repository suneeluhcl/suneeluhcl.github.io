import { describe, it, expect } from "vitest";
import { createModelStream, DEFAULT_MODELS } from "../src/lib/modelProvider.js";

async function collect(stream) {
  let value = "";
  for await (const token of stream) value += token;
  return value;
}

describe("model provider", () => {
  it("keeps Anthropic as the compatibility default", async () => {
    let params;
    const env = {
      ANTHROPIC: {
        messages: {
          create: async (value) => {
            params = value;
            return (async function* () {
              yield { type: "content_block_delta", delta: { type: "text_delta", text: "answer" } };
            })();
          },
        },
      },
    };
    expect(await collect(await createModelStream(env, { instructions: "rules", messages: [], maxTokens: 10 }))).toBe("answer");
    expect(params.model).toBe(DEFAULT_MODELS.anthropic);
    expect(params.system).toBe("rules");
  });

  it("streams OpenAI Responses API output text deltas", async () => {
    let requestBody;
    const events = [
      { type: "response.output_text.delta", delta: "Open" },
      { type: "response.output_text.delta", delta: "AI" },
    ].map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
    const env = {
      AI_PROVIDER: "openai",
      OPENAI_FETCH: async (_url, options) => {
        requestBody = JSON.parse(options.body);
        return new Response(events, { status: 200, headers: { "content-type": "text/event-stream" } });
      },
    };
    const stream = await createModelStream(env, {
      instructions: "ground this",
      messages: [{ role: "user", content: "hello" }],
      maxTokens: 20,
    });
    expect(await collect(stream)).toBe("OpenAI");
    expect(requestBody.model).toBe(DEFAULT_MODELS.openai);
    expect(requestBody.instructions).toBe("ground this");
    expect(requestBody.input[0].content[0]).toEqual({ type: "input_text", text: "hello" });
    expect(requestBody.stream).toBe(true);
  });

  it("rejects unknown providers", async () => {
    await expect(createModelStream({ AI_PROVIDER: "unknown" }, {})).rejects.toThrow("unsupported AI_PROVIDER");
  });
});
