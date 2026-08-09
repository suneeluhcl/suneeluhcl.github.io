import Anthropic from "@anthropic-ai/sdk";

const ANTHROPIC_MODEL = "claude-haiku-4-5";
const OPENAI_MODEL = "gpt-5.6-luna";

async function* anthropicTokens(stream) {
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
      if (event.delta.text) yield event.delta.text;
    }
  }
}

async function* openAITokens(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done });
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";
      for (const block of events) {
        for (const line of block.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          const event = JSON.parse(payload);
          if (event.type === "response.output_text.delta" && event.delta) yield event.delta;
          if (event.type === "error") throw new Error(event.error?.message ?? "OpenAI stream failed");
        }
      }
      if (done) break;
    }
  } finally {
    reader.releaseLock();
  }
}

async function createAnthropicStream(env, { instructions, messages, maxTokens }) {
  const client = env.ANTHROPIC ?? new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const stream = await client.messages.create({
    model: env.ANTHROPIC_MODEL ?? ANTHROPIC_MODEL,
    max_tokens: maxTokens,
    system: instructions,
    messages,
    stream: true,
  });
  return anthropicTokens(stream);
}

async function createOpenAIStream(env, { instructions, messages, maxTokens }) {
  if (!env.OPENAI_API_KEY && !env.OPENAI_FETCH) throw new Error("OPENAI_API_KEY is not configured");
  const request = env.OPENAI_FETCH ?? fetch;
  const response = await request("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY ?? "test-key"}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL ?? OPENAI_MODEL,
      instructions,
      input: messages.map(({ role, content }) => ({
        role,
        content: [{ type: "input_text", text: content }],
      })),
      max_output_tokens: maxTokens,
      stream: true,
    }),
  });
  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    throw new Error(`OpenAI request failed (${response.status})${detail ? `: ${detail.slice(0, 300)}` : ""}`);
  }
  return openAITokens(response.body);
}

export async function createModelStream(env, request) {
  const provider = (env.AI_PROVIDER ?? "anthropic").toLowerCase();
  if (provider === "anthropic") return createAnthropicStream(env, request);
  if (provider === "openai") return createOpenAIStream(env, request);
  throw new Error(`unsupported AI_PROVIDER: ${provider}`);
}

export const DEFAULT_MODELS = { anthropic: ANTHROPIC_MODEL, openai: OPENAI_MODEL };
