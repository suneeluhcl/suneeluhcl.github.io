import { spawnSync } from "node:child_process";

const requested = Number.parseInt(process.argv[2] ?? "30", 10);
const days = Number.isInteger(requested) ? Math.min(365, Math.max(1, requested)) : 30;
const sql = `
SELECT
  COUNT(*) AS conversations,
  SUM(CASE WHEN error IS NOT NULL THEN 1 ELSE 0 END) AS failures,
  MIN(asked_at) AS first_seen,
  MAX(asked_at) AS last_seen
FROM chat_logs
WHERE datetime(asked_at) >= datetime('now', '-${days} days');

SELECT asked_at, question, error
FROM chat_logs
WHERE datetime(asked_at) >= datetime('now', '-${days} days')
ORDER BY id DESC
LIMIT 20;
`.trim();

const result = spawnSync(
  "npx",
  ["wrangler", "d1", "execute", "portfolio-chat-log", "--remote", "--command", sql],
  { cwd: new URL("..", import.meta.url), stdio: "inherit" },
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
