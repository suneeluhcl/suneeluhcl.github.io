# Suneel Kumar — Portfolio

Single-page portfolio for a Sr. Java Fullstack Developer. Dark-themed by default with a light-mode
toggle, smooth-scroll navigation, scroll-reveal animations, and a terminal/engineering aesthetic.

## Stack

- [React 19](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config, class-based dark mode)
- [Framer Motion](https://www.framer.com/motion/) — scroll reveals, timeline dots, counters
- [lucide-react](https://lucide.dev) — icons

## Run locally

```bash
npm install
npm run dev      # dev server at http://localhost:5173
```

## Production build

```bash
npm run build    # outputs static site to dist/
npm run preview  # serve the production build locally
```

Deploy `dist/` anywhere static (Netlify, Vercel, GitHub Pages, S3 + CloudFront).

## Resume download

The "Download Resume" button links to `/resume.pdf`. Drop your resume PDF into `public/resume.pdf`
and it will be served automatically.

## Editing content

All resume content (hero, about, skills, experience, education) lives in one file:
`src/data.js`. Edit it and the UI updates — no component changes needed.

## Structure

```
src/
  data.js               # all portfolio content
  index.css             # theme tokens (dark/light), grid + blob + glow effects
  App.jsx
  hooks/useTypewriter.js
  components/
    Navbar.jsx          # glassmorphism sticky nav + theme toggle + mobile menu
    Hero.jsx            # typing effect, gradient blobs, grid backdrop, CTAs
    About.jsx           # terminal-window styled summary
    Skills.jsx          # category cards with icons + glowing chips
    Experience.jsx      # animated vertical timeline + stat counters
    Education.jsx
    Certifications.jsx  # AWS SA Pro + Google Cloud ML Engineer
    Contact.jsx         # form with mailto fallback + resume download
    Footer.jsx
    Reveal.jsx          # shared scroll-reveal wrapper
    SectionHeading.jsx
```
