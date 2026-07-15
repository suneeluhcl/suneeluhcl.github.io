# Portfolio Chat Worker

Cloudflare Worker backing the "Ask my résumé" widget. Calls the Anthropic API
(**Claude Haiku 4.5** — see `MODEL` in `src/index.js`) server-side, so the API key
never touches the browser. The résumé is injected as grounding context and the
response is streamed back as SSE.

## One-time setup (from the repo root)
1. Regenerate the résumé context:
   `node scripts/gen-resume-context.mjs`
2. Create an Anthropic API key at https://console.anthropic.com/settings/keys
3. Install deps, log in, store the key as a secret, and deploy:
   ```
   cd worker
   npm install
   npx wrangler login
   npx wrangler secret put ANTHROPIC_API_KEY   # paste the key when prompted
   npx wrangler deploy
   ```
   Deploy prints the https://portfolio-chat-worker.<subdomain>.workers.dev URL.

## Wire the frontend (from the repo root)
Build the site with the Worker URL, then commit/push `dist` per the usual GitHub Pages flow:
`VITE_CHAT_API_URL="https://portfolio-chat-worker.<subdomain>.workers.dev" npm run build`

## After any résumé change (from the repo root)
1. `node scripts/gen-resume-context.mjs`
2. `cd worker && npx wrangler deploy`

Then rebuild + redeploy the frontend as above so the assistant reflects the new résumé.

## Cost & model
Haiku 4.5 costs fractions of a cent per chat and is rate-limited to 20 requests/min
per IP. To raise answer quality, change `MODEL` in `src/index.js` to `claude-sonnet-5`
or `claude-opus-4-8` and redeploy.

## Tests
`npm test` — the Anthropic client is injected via `env.ANTHROPIC` so tests run offline
with no API key.
