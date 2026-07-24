/**
 * Bakes the rendered React tree into dist/index.html.
 *
 * Why: the site is a client-rendered SPA, so without this step dist/index.html
 * ships an empty <body>. Anything that does not execute JavaScript — ATS and
 * recruiter scrapers, and the AI assistants recruiters increasingly research
 * candidates with — sees a blank page. Prerendering makes the full résumé
 * readable as static HTML while the client bundle still hydrates on top for the
 * interactive pieces (theme toggle, typewriter, chat, contact form).
 *
 * Runs after both Vite builds; see the "build" script in package.json.
 */
import { readFile, writeFile, access, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrEntry = resolve(root, "dist-ssr/entry-server.js");
const indexPath = resolve(dist, "index.html");

const ROOT_DIV = '<div id="root"></div>';

function fail(message) {
  console.error(`\n[prerender] ${message}\n`);
  process.exit(1);
}

/**
 * The SSR and client builds hash assets independently. Vite's hashes are
 * content-derived so they normally agree, but a silent mismatch would ship
 * prerendered HTML pointing at files that do not exist — exactly the kind of
 * breakage this script exists to prevent. So every asset the markup references
 * is checked against dist before the file is written.
 */
async function verifyAssetRefs(markup) {
  const refs = [...markup.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1]);
  const missing = [];

  for (const ref of new Set(refs)) {
    try {
      await access(resolve(dist, `.${ref}`));
    } catch {
      missing.push(ref);
    }
  }
  return missing;
}

let render;
try {
  ({ render } = await import(pathToFileURL(ssrEntry).href));
} catch (err) {
  fail(`could not load the SSR bundle at ${ssrEntry}\n${err.stack ?? err}`);
}

let markup;
try {
  markup = render();
} catch (err) {
  fail(
    "rendering the app threw. This usually means a component touches window or " +
      `document during render instead of inside an effect.\n${err.stack ?? err}`,
  );
}

if (!markup || markup.length < 1000) {
  fail(`render produced suspiciously little markup (${markup?.length ?? 0} chars) — refusing to write.`);
}

const missing = await verifyAssetRefs(markup);
if (missing.length) {
  fail(`prerendered markup references assets that are not in dist/:\n  ${missing.join("\n  ")}`);
}

const html = await readFile(indexPath, "utf8");
if (!html.includes(ROOT_DIV)) {
  fail(`could not find ${ROOT_DIV} in dist/index.html — the injection point changed.`);
}

await writeFile(indexPath, html.replace(ROOT_DIV, `<div id="root">${markup}</div>`), "utf8");
await rm(resolve(root, "dist-ssr"), { recursive: true, force: true });

console.log(`[prerender] baked ${markup.length.toLocaleString()} chars of HTML into dist/index.html`);
