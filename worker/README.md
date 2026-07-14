# Portfolio Chat Worker

Free Cloudflare Worker backing the "Ask my résumé" widget. Runs Workers AI
(`@cf/meta/llama-3.1-8b-instruct`) — no paid plan, no API key in the browser.

## One-time setup (human-run)
1. `cd worker && npm install`
2. `npx wrangler login`   # opens browser, authorizes YOUR Cloudflare account
3. Regenerate context:    `node ../scripts/gen-resume-context.mjs`
4. `npx wrangler deploy`  # prints the https://portfolio-chat-worker.<subdomain>.workers.dev URL

## Wire the frontend
Build the site with the Worker URL:
`VITE_CHAT_API_URL="https://portfolio-chat-worker.<subdomain>.workers.dev" npm run build`
then commit/push `dist` per the usual GitHub Pages flow.

## After any résumé change
Re-run step 3 + `npx wrangler deploy` so the assistant reflects the new résumé.
