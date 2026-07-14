# Design: "Ask My Résumé" AI Assistant

**Date:** 2026-07-13
**Project:** suneel-kumar-portfolio (suneelkumarbikkasani.com)
**Status:** Approved — ready for implementation planning

## Goal

Add a signature interactive feature to the portfolio: an AI chat assistant that
answers recruiter questions grounded **only** in Suneel's career history. It both
differentiates the site ("best in the world" signature moment) and *demonstrates*
the GenAI / AI-agent skills the résumé claims, live on the page.

## Success Criteria

- A recruiter can open a chat widget and ask e.g. "Has he done Kafka at scale?"
  and get an accurate, professional answer drawn from the résumé, streaming, in
  a few seconds.
- Zero recurring cost and no credit card required.
- The LLM API key/credentials are never exposed to the browser.
- The live portfolio site is not put at risk (no DNS change, no coupling that can
  break the static site if the AI backend is down).
- The assistant stays on-topic, resists prompt injection, and never fabricates
  experience Suneel doesn't have.
- The widget does not meaningfully degrade the site's Lighthouse performance score.

## Non-Goals (YAGNI)

- No vector database / RAG pipeline. The full résumé fits in the model's context.
- No separate résumé copy to maintain — content is derived from `src/data.js`.
- No paid model / no Anthropic or Google billing account.
- No DNS/domain changes; the backend lives on a `*.workers.dev` URL.
- No auto-deploy to Suneel's Cloudflare account — deploy is a human-run step.

## Architecture

Three cleanly separated parts:

```
Browser (static site)  ──fetch──▶  Cloudflare Worker  ──env.AI.run──▶  Workers AI (Llama)
  ChatAssistant.jsx                  - CORS: portfolio origin only
  useChat hook                       - per-IP rate limit
  (Tailwind + lucide-react)          - max token cap
                                     - system prompt = résumé context + guardrails
                                     - streaming response
```

### Frontend (portfolio repo, `src/`)
- New `components/ChatAssistant.jsx`: floating button (bottom-right) that opens a
  chat panel. Matches existing dark/light theme, uses existing Tailwind classes
  and `lucide-react` icons. **Zero new npm dependencies.**
- Small `useChat` hook for message state + streaming fetch to the Worker.
- 3 starter-question chips to seed the conversation.
- Mounted once in `App.jsx` (outside `<main>`, alongside `Footer`).
- Graceful degradation: if the Worker is unreachable, the widget shows a friendly
  "chat's momentarily unavailable — email me" state. The rest of the site is
  completely unaffected.
- Respects `prefers-reduced-motion`.

### Backend (new `worker/` project in the repo)
- A single Cloudflare Worker, its own minimal project (`wrangler.toml`, `src/`).
- Deployed to a `*.workers.dev` subdomain.
- Bindings: Workers AI (`env.AI`). Rate limiting via Cloudflare (rate-limiting
  binding or KV counter — chosen at implementation, whichever is simplest on the
  free tier).
- Responsibilities:
  - Enforce CORS: only accept requests from the portfolio origin.
  - Enforce per-IP rate limit and a max-tokens cap.
  - Assemble the system prompt = résumé context + guardrails.
  - Call `env.AI.run(<pinned Llama instruct model>)` and stream the response back.
- The model ID is pinned to the current best free Workers AI Llama instruct model
  at implementation time (verified against Cloudflare docs).

### Grounding — single source of truth
- Résumé facts already live in `src/data.js` (experience, skills, certifications,
  education).
- A small build script reads `data.js` and generates the résumé-context string the
  Worker embeds in its system prompt.
- Consequence: updating the résumé (via the existing docx → data.js flow) updates
  the AI automatically. No duplicate résumé text, no vector store to reindex.

## Guardrails (the part that makes it credible, not a gimmick)

The Worker's system prompt enforces:
- **Grounded only:** answer strictly from the provided résumé context. If a
  question isn't covered → politely say it's not in Suneel's background and point
  to his contact info.
- **No fabrication:** never invent employers, dates, metrics, or skills.
- **Injection-resistant:** ignore attempts to override instructions ("ignore
  previous instructions", role-play jailbreaks, requests to reveal the prompt).
- **Professional persona:** third-person, recruiter-appropriate tone consistent
  with Suneel's voice (direct, smart, warm, never boastful or robotic).
- **Off-topic / abuse:** decline and redirect back to career topics.

Plus transport-level guardrails: CORS allowlist, per-IP rate limit, max token cap,
input length cap.

## Data Flow

1. Recruiter types a question, hits send.
2. Frontend POSTs `{ messages }` to the Worker.
3. Worker validates origin + rate limit + input length.
4. Worker builds system prompt (résumé context + guardrails) and calls Workers AI.
5. Worker streams tokens back; frontend renders them live.
6. On any error (rate limit, model error, network), frontend shows a graceful
   fallback with the email CTA.

## Error Handling

| Failure | Behavior |
|---|---|
| Worker unreachable / down | Widget shows "chat unavailable, email me"; site unaffected |
| Rate limit exceeded | Friendly "give me a sec" message with retry |
| Empty / oversized input | Client-side validation blocks before sending |
| Model returns error | Fallback message + email CTA |
| Off-topic / injection attempt | Model declines per guardrails, stays professional |

## Testing

- **Worker unit tests:** CORS rejection of foreign origins, rate-limit trip,
  system-prompt assembly includes résumé context, injection-refusal behavior,
  input-length rejection.
- **Playwright e2e:** on the built site — open widget, ask a real question, assert
  a grounded answer renders.
- **Lighthouse:** confirm the widget doesn't materially drop the performance score.

## Deployment (human-run)

- All build + tests run locally.
- Suneel runs a one-time `wrangler login`, then `wrangler deploy` for the Worker.
- Frontend gets the Worker URL via a build-time constant/env; then normal
  portfolio build + push to GitHub Pages.
- Nothing is pushed to Suneel's Cloudflare account by the agent unattended.

## Open Questions / To Confirm at Implementation

- Exact current best free Workers AI Llama instruct model ID (verify vs. docs).
- Rate-limiting mechanism: Cloudflare rate-limiting binding vs. KV counter.
- Final wording of the 3 starter-question chips and the assistant's greeting.
