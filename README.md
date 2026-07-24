# Suneel Kumar — Portfolio

Single-page portfolio for a Sr. Java Fullstack Developer. Dark-themed by default with a light-mode
toggle, smooth-scroll navigation, scroll-reveal animations, and a terminal/engineering aesthetic.

## Stack

- [React 19](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config, class-based dark mode)
- [lucide-react](https://lucide.dev) — icons
- Scroll reveals, the typing effect, and counters are plain CSS + `IntersectionObserver`
  (no animation library)

## Run locally

```bash
npm install
npm run dev      # dev server at http://localhost:5173
```

## Production build

```bash
npm run build    # outputs a prerendered static site to dist/
npm run preview  # serve the production build locally
npm run test:e2e # Playwright: dev-server behaviour + the built output
```

Deploy `dist/` anywhere static (Netlify, Vercel, GitHub Pages, S3 + CloudFront).

### Prerendering

`npm run build` runs three steps: the client build, an SSR build of
`src/entry-server.jsx`, and `scripts/prerender.js`, which bakes the rendered markup
into `dist/index.html`. Without it the page ships an empty `<body>` and every
non-JavaScript reader — ATS and recruiter scrapers, and the AI assistants recruiters
research candidates with — sees a blank page. The client hydrates that markup rather
than replacing it (`src/main.jsx`).

Consequence for components: anything touching `window` or `document` must do it
inside an effect, never during render. The build fails loudly if that rule is broken.

## Resume download

The "Download Resume" button links to `/resume.pdf`. Drop your resume PDF into `public/resume.pdf`
and it will be served automatically.

## Editing content

All resume content (hero, about, skills, experience, education) lives in one file:
`src/data.js`. Edit it and the UI updates — no component changes needed.

Two things there are worth knowing:

- `profile.linkedin` / `profile.github` — each link renders only when its value is
  non-empty, so an unfilled entry is hidden rather than shipped as a dead link. They
  also feed `sameAs` in the page's structured data.
- `availability` — the location / work-arrangement / work-authorization / notice
  strip under the hero. Set any field to `""` to hide just that item.

Structured data (JSON-LD) is generated from `src/data.js` at build time by the
`html-enhancements` plugin in `vite.config.js`, so it can't drift from the page.

## Analytics

Cloudflare Web Analytics is injected at build time when `VITE_CF_ANALYTICS_TOKEN` is
set in `.env.production`; leave it blank to ship no analytics. Get the token from the
Cloudflare dashboard → Analytics & Logs → Web Analytics.

## Backend (chat + contact form)

Both the "Ask my résumé" widget and the contact form are served by one Cloudflare
Worker. See [worker/README.md](worker/README.md) for deployment, the Anthropic key,
and the Resend setup the contact form needs.

## Structure

```
scripts/prerender.js    # bakes rendered HTML into dist/index.html
src/
  data.js               # all portfolio content
  config.js             # worker endpoints (chat + contact)
  index.css             # theme tokens (dark/light), grid + blob + glow effects
  App.jsx
  main.jsx              # hydrates the prerendered markup (falls back to a fresh root in dev)
  entry-server.jsx      # SSR entry, build-time only
  components/
    Navbar.jsx          # glassmorphism sticky nav + theme toggle + mobile menu
    Hero.jsx            # typing effect, gradient blobs, grid backdrop, CTAs
    Availability.jsx    # location / arrangement / work auth / notice strip
    SocialLinks.jsx     # LinkedIn + GitHub, rendered only when configured
    About.jsx           # terminal-window styled summary
    Skills.jsx          # category cards with icons + glowing chips
    Experience.jsx      # animated vertical timeline + stat counters
    Education.jsx
    Certifications.jsx  # AWS SA Pro + Google Cloud ML Engineer
    Contact.jsx         # worker-backed form (email fallback if delivery fails)
    Footer.jsx
    Reveal.jsx          # shared scroll-reveal wrapper
    SectionHeading.jsx
e2e/                    # chat, contact, and prerender/hydration tests
```
