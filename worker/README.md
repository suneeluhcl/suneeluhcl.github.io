# Portfolio Worker

Cloudflare Worker backing two things on the site:

| Route      | Purpose                                                              |
| ---------- | -------------------------------------------------------------------- |
| `/`        | "Ask my résumé" chat — Anthropic API (**Claude Haiku 4.5**, see `MODEL` in `src/index.js`), streamed back as SSE |
| `/contact` | Contact-form delivery via [Resend](https://resend.com)                |

Both run server-side so no API key touches the browser, and both share the same
origin allowlist and 20 req/min per-IP rate limit.

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

## Contact form setup (one-time)
The form posts to `POST /contact`, which sends through Resend. Until this is done
the route answers `503` and the form shows recruiters an email fallback instead —
it never silently drops a message.

1. Sign up at https://resend.com (free tier: 3,000 emails/month).
2. **Verify the domain** — Resend → Domains → Add `suneelkumarbikkasani.com`, then
   add the DKIM/SPF records it shows you at your DNS host. Sending from an
   unverified domain fails, so this step is not optional.
3. Create an API key at https://resend.com/api-keys (sending permission is enough).
4. Store it and redeploy:
   ```
   cd worker
   npx wrangler secret put RESEND_API_KEY   # paste the key when prompted
   npx wrangler deploy
   ```

`CONTACT_TO` (destination) and `CONTACT_FROM` (must be on the verified domain) live
in `wrangler.toml` under `[vars]`. Submissions carry the sender's address in
`reply_to`, so replying from the inbox goes straight back to them.

Spam handling: a hidden honeypot field is dropped silently with a `200`, so bots
get no signal that they were caught.

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
`npm test` — the Anthropic client is injected via `env.ANTHROPIC` and the mail sender
via `env.SEND_EMAIL`, so the whole suite runs offline with no API keys.
