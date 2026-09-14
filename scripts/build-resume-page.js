/**
 * Generates dist/resume/index.html — a standalone, JavaScript-free résumé page.
 *
 * Why a second page when the PDF already exists: a PDF is opaque to search engines
 * and awkward for an ATS, and the SPA is one URL that cannot be linked to as "the
 * résumé". This page is plain semantic HTML at a clean, quotable URL — the form
 * that ATS parsers, Google, and AI crawlers all read best. It is also the version
 * that prints properly.
 *
 * Everything comes from src/data.js, so it cannot drift from the site. Runs as part
 * of `npm run build`; see package.json.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  profile,
  availability,
  about,
  skillCategories,
  experience,
  projects,
  education,
  certifications,
} from "../src/data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "dist/resume");
const SITE = "https://suneelkumarbikkasani.com";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const list = (items) => items.map((i) => `<li>${esc(i)}</li>`).join("");

// Print-first: black on white by default so "Save as PDF" and ATS text extraction
// both behave, with a dark variant for people reading it on screen at night.
const CSS = `
:root { --ink:#16191f; --mut:#5b6472; --line:#dfe3ea; --accent:#0b7285; --bg:#fff; }
@media (prefers-color-scheme: dark) {
  :root { --ink:#e6e9ef; --mut:#9aa4b2; --line:#2a3038; --accent:#3bc9db; --bg:#0f1319; }
}
* { box-sizing: border-box; }
body {
  margin:0; padding:2.5rem 1.25rem 4rem; background:var(--bg); color:var(--ink);
  font:16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Helvetica, Arial, sans-serif;
}
main { max-width: 52rem; margin: 0 auto; }
h1 { font-size: 2rem; margin: 0 0 .25rem; letter-spacing:-.02em; }
h2 {
  font-size: .8rem; text-transform: uppercase; letter-spacing:.12em; color:var(--accent);
  margin: 2.25rem 0 .75rem; padding-bottom:.35rem; border-bottom:1px solid var(--line);
}
h3 { font-size: 1rem; margin: 1.25rem 0 .15rem; }
p { margin: 0 0 .75rem; }
ul { margin: .4rem 0 .75rem; padding-left: 1.15rem; }
li { margin: .25rem 0; }
a { color: var(--accent); }
.title { font-size:1.05rem; color:var(--mut); margin:0 0 .75rem; }
.meta { font-size:.9rem; color:var(--mut); margin:0 0 .35rem; }
.meta a { color:inherit; }
.facts { list-style:none; margin:.75rem 0 0; padding:0; display:flex; flex-wrap:wrap; gap:.4rem .5rem; font-size:.82rem; }
.facts li { border:1px solid var(--line); border-radius:999px; padding:.2rem .7rem; color:var(--mut); margin:0; }
.role { display:flex; flex-wrap:wrap; justify-content:space-between; gap:.25rem 1rem; align-items:baseline; }
.role .when { font-size:.85rem; color:var(--mut); white-space:nowrap; }
.where { font-size:.9rem; color:var(--mut); margin:0 0 .35rem; }
.stack { font-size:.82rem; color:var(--mut); margin:.3rem 0 0; }
.skills dt { font-weight:600; font-size:.9rem; margin-top:.7rem; }
.skills dd { margin:.1rem 0 0; color:var(--mut); font-size:.92rem; }
.actions { margin:1.25rem 0 0; display:flex; flex-wrap:wrap; gap:.6rem; }
.actions a {
  display:inline-block; border:1px solid var(--accent); border-radius:.4rem;
  padding:.45rem .9rem; font-size:.88rem; text-decoration:none;
}
footer { margin-top:3rem; padding-top:1rem; border-top:1px solid var(--line); font-size:.82rem; color:var(--mut); }
@media print {
  :root { --ink:#000; --mut:#333; --line:#bbb; --accent:#000; --bg:#fff; }
  body { padding:0; font-size:10.5pt; }
  .actions, footer { display:none; }
  h2 { margin-top:1.1rem; }
  h3, .role { break-after: avoid; }
  li, p { break-inside: avoid; }
}
`.trim();

function jsonLd() {
  const sameAs = [profile.linkedin, profile.github].filter(Boolean);
  const [locality, region] = (availability.location || "").split(",").map((s) => s.trim());

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    url: `${SITE}/resume/`,
    mainEntityOfPage: `${SITE}/resume/`,
    email: `mailto:${profile.email}`,
    ...(profile.phone && { telephone: profile.phone }),
    ...(sameAs.length && { sameAs }),
    ...(locality && {
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        ...(region && { addressRegion: region }),
        addressCountry: "US",
      },
    }),
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certification",
      ...(c.issuer && { recognizedBy: { "@type": "Organization", name: c.issuer } }),
      ...(c.url && { url: c.url }),
    })),
    ...(experience.some(e => e.current) && { worksFor: experience.filter(e => e.current).map((e) => ({ "@type": "Organization", name: e.company })) }),
  };
}

const facts = [availability.location, availability.arrangement, availability.workAuth, availability.status]
  .filter(Boolean)
  .map((f) => `<li>${esc(f)}</li>`)
  .join("");

const contact = [
  profile.phone && `<a href="tel:${esc(profile.phone)}">${esc(profile.phone)}</a>`,
  profile.email && `<a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>`,
  profile.linkedin && `<a href="${esc(profile.linkedin)}" rel="me">LinkedIn</a>`,
  profile.github && `<a href="${esc(profile.github)}" rel="me">GitHub</a>`,
]
  .filter(Boolean)
  .join(" &middot; ");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(profile.name)} — Résumé | ${esc(profile.title)}</title>
<meta name="description" content="${esc(profile.tagline)}">
<link rel="canonical" href="${SITE}/resume/">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(profile.name)} — Résumé">
<meta property="og:description" content="${esc(profile.tagline)}">
<meta property="og:url" content="${SITE}/resume/">
<meta property="og:image" content="${SITE}/og.png">
<script type="application/ld+json">
${JSON.stringify(jsonLd(), null, 2)}
</script>
<style>${CSS}</style>
</head>
<body>
<main>
  <header>
    <h1>${esc(profile.name)}</h1>
    <p class="title">${esc(profile.title)}</p>
    <p class="meta">${contact}</p>
    <ul class="facts">${facts}</ul>
    <div class="actions">
      <a href="/resume.pdf" download>Download PDF</a>
      <a href="${SITE}/">Full portfolio</a>
    </div>
  </header>

  <h2>Summary</h2>
  ${about.map((p) => `<p>${esc(p)}</p>`).join("\n  ")}

  <h2>Skills</h2>
  <dl class="skills">
  ${skillCategories
    .map((c) => `<dt>${esc(c.title)}</dt><dd>${esc(c.items.join(" · "))}</dd>`)
    .join("\n  ")}
  </dl>

  <h2>Experience</h2>
  ${experience
    .map(
      (e) => `<article>
    <div class="role"><h3>${esc(e.title)} — ${esc(e.company)}</h3><span class="when">${esc(e.dates)}</span></div>
    <p class="where">${esc(e.location)}</p>
    <ul>${list(e.bullets)}</ul>
    <p class="stack"><strong>Environment:</strong> ${esc(e.environment)}</p>
  </article>`,
    )
    .join("\n  ")}

  <h2>Selected Projects</h2>
  ${projects
    .map(
      (p) => `<article>
    <h3>${esc(p.title)} <span class="when">— ${esc(p.org)}</span></h3>
    <p>${esc(p.tagline)}</p>
    <ul>${list(p.highlights)}</ul>
    <p class="stack"><strong>Stack:</strong> ${esc(p.stack.join(", "))}</p>
  </article>`,
    )
    .join("\n  ")}

  <h2>Certifications</h2>
  <ul>
  ${certifications
    .map(
      (c) =>
        `<li>${c.url ? `<a href="${esc(c.url)}">${esc(c.name)}</a>` : esc(c.name)} — ${esc(c.issuer)}${
          c.year ? ` (${esc(c.year)})` : ""
        }</li>`,
    )
    .join("\n  ")}
  </ul>

  <h2>Education</h2>
  <ul>
  ${education.map((e) => `<li>${esc(e.degree)} — ${esc(e.school)}</li>`).join("\n  ")}
  </ul>

  <footer>
    <p>Generated from the same source as <a href="${SITE}/">suneelkumarbikkasani.com</a>. Last built ${
      new Date().toISOString().slice(0, 10)
    }.</p>
  </footer>
</main>
</body>
</html>
`;

await mkdir(outDir, { recursive: true });
await writeFile(resolve(outDir, "index.html"), html, "utf8");
console.log(`[resume-page] wrote dist/resume/index.html (${html.length.toLocaleString()} chars)`);
