-- Schema for the chat_log D1 database.
--
-- Apply with (from worker/):
--   npx wrangler d1 execute portfolio-chat-log --remote --file=./schema.sql
--
-- Privacy: this deliberately stores no IP address, user agent, or any other
-- identifier. It records what was asked and what the assistant answered for at most
-- 90 days — enough
-- to learn what recruiters want to know and to catch a bad answer, and nothing
-- that identifies who asked.

CREATE TABLE IF NOT EXISTS chat_logs (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  asked_at  TEXT NOT NULL,           -- ISO-8601 UTC
  question  TEXT NOT NULL,
  answer    TEXT,                    -- NULL when the model call failed
  error     TEXT                     -- NULL on success
);

CREATE INDEX IF NOT EXISTS idx_chat_logs_asked_at ON chat_logs (asked_at DESC);
