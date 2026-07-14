export const ALLOWED_ORIGINS = [
  "https://suneelkumarbikkasani.com",
  "https://suneeluhcl.github.io",
  "http://localhost:5173",
];

export function isAllowedOrigin(origin) {
  return typeof origin === "string" && ALLOWED_ORIGINS.includes(origin);
}

const MAX_MESSAGES = 20;
const MAX_CONTENT = 2000;

export function validateMessages(input) {
  if (!Array.isArray(input) || input.length === 0) {
    return { ok: false, error: "messages must be a non-empty array" };
  }
  if (input.length > MAX_MESSAGES) {
    return { ok: false, error: "too many messages" };
  }
  const messages = [];
  for (const m of input) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) {
      return { ok: false, error: "invalid role" };
    }
    if (typeof m.content !== "string" || m.content.length === 0) {
      return { ok: false, error: "empty content" };
    }
    if (m.content.length > MAX_CONTENT) {
      return { ok: false, error: "content too long" };
    }
    messages.push({ role: m.role, content: m.content });
  }
  return { ok: true, messages };
}
