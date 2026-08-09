# Portfolio Worker

The Cloudflare Worker provides the streaming résumé chat at `/` and contact-form
delivery at `/contact`. Both routes share the site's origin allowlist and a 20-request
per-minute, per-IP rate limit. API keys stay server-side.

## AI provider

`AI_PROVIDER` selects the implementation without changing the frontend:

| Value | Secret | Model setting |
|---|---|---|
| `anthropic` (default) | `ANTHROPIC_API_KEY` | `ANTHROPIC_MODEL` environment override |
| `openai` | `OPENAI_API_KEY` | `OPENAI_MODEL` in `wrangler.toml` |

Anthropic preserves the currently deployed behavior. To switch to OpenAI, store the
secret and change `AI_PROVIDER` in `wrangler.toml` before deploying:

```bash
npx wrangler secret put OPENAI_API_KEY
npx wrangler deploy
```

Use provider dashboards and current pricing documentation when choosing a model; do not
put secrets or assumed pricing in the repository.

## Initial setup

From the repository root, regenerate the résumé context, then install and configure the
Worker:

```bash
node scripts/gen-resume-context.mjs
cd worker
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler deploy
```

The deploy prints the `workers.dev` URL. Build the frontend against it:

```bash
VITE_CHAT_API_URL="https://portfolio-chat-worker.<subdomain>.workers.dev" npm run build
```

After résumé changes, regenerate the context, deploy the Worker, rebuild the frontend,
and deploy the site so both surfaces stay aligned.

## Contact form

The route sends through Resend. Until configured, it returns `503` and the frontend shows
an email fallback; messages are never silently discarded.

1. Verify `suneelkumarbikkasani.com` in Resend and add its DKIM/SPF records at the DNS host.
2. Create a sending-only Resend API key.
3. Run `npx wrangler secret put RESEND_API_KEY` and redeploy.

`CONTACT_TO` and `CONTACT_FROM` live in `wrangler.toml`; the latter must use the verified
domain. The form uses a honeypot field for basic bot filtering.

## Optional chat log

D1 logging stores only timestamp, question, answer, and errors—never an IP, user agent,
or session identifier. Entries older than 90 days are removed after successful writes.
Logging is best-effort and never delays or breaks chat.

Create and bind the database as described beside `[[d1_databases]]` in `wrangler.toml`,
then summarize recent activity without mutating it:

```bash
npm run logs:summary -- 30
```

## Verification

```bash
npm test
cd ..
npm run build
npm run test:e2e
npm run health
```

Worker tests run offline using injected model and mail transports. The root health check
verifies the live site, its deployed JavaScript configuration, and both Worker CORS
preflight routes. CI repeats build, Worker tests, browser tests, deployment, and the
post-deploy health check.
