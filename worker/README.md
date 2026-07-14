# Portfolio Chat Worker

Free Cloudflare Worker backing the "Ask my résumé" widget. Runs Workers AI
(`@cf/meta/llama-3.1-8b-instruct-fp8`) — no paid plan, no API key in the browser.

## One-time setup (from the repo root)
1. Regenerate the résumé context:
   `node scripts/gen-resume-context.mjs`
2. Install worker deps, log in, and deploy:
   `cd worker && npm install && npx wrangler login && npx wrangler deploy`
   This prints the https://portfolio-chat-worker.<subdomain>.workers.dev URL.

## Wire the frontend (from the repo root)
Build the site with the Worker URL, then commit/push `dist` per the usual GitHub Pages flow:
`VITE_CHAT_API_URL="https://portfolio-chat-worker.<subdomain>.workers.dev" npm run build`

## After any résumé change (from the repo root)
1. `node scripts/gen-resume-context.mjs`
2. `cd worker && npx wrangler deploy`

Then rebuild + redeploy the frontend as above so the assistant reflects the new résumé.
