// Answers can be long; cap what is stored so one runaway response cannot bloat
// the table. The question is already capped at 2000 by validateMessages.
const MAX_ANSWER = 8000;
const RETENTION_DAYS = 90;

/**
 * Records what a visitor asked and what the assistant replied.
 *
 * Deliberately stores no IP, user agent, or session identifier — the point is to
 * learn which questions recruiters actually ask (and to catch the assistant
 * answering badly), not to identify who asked.
 *
 * Logging is best-effort by design: it must never take the chat down, so a missing
 * binding is a no-op and a failed write is swallowed after logging to the console.
 */
export async function logChat(env, { question, answer, error }) {
  if (!env.CHAT_LOG) return; // D1 not bound (local dev, tests) — logging is optional.

  try {
    await env.CHAT_LOG.prepare(
      "INSERT INTO chat_logs (asked_at, question, answer, error) VALUES (?, ?, ?, ?)",
    )
      .bind(
        new Date().toISOString(),
        question,
        answer ? answer.slice(0, MAX_ANSWER) : null,
        error ?? null,
      )
      .run();
    await env.CHAT_LOG.prepare(
      `DELETE FROM chat_logs WHERE datetime(asked_at) < datetime('now', '-${RETENTION_DAYS} days')`,
    ).run();
  } catch (err) {
    console.error("chat log write failed:", err?.stack || err?.message || String(err));
  }
}

/**
 * Runs a background promise without blocking the response.
 *
 * `ctx` is absent in unit tests, so fall back to awaiting directly rather than
 * dropping the write.
 */
export function runInBackground(ctx, promise) {
  if (ctx?.waitUntil) {
    ctx.waitUntil(promise);
    return;
  }
  return promise;
}
