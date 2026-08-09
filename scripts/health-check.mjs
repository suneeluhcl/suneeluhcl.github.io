const site = (process.argv[2] ?? "https://suneelkumarbikkasani.com").replace(/\/+$/, "");

function requireOk(response, label) {
  if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}`);
}

const page = await fetch(`${site}/`, { redirect: "follow" });
requireOk(page, "portfolio");
const html = await page.text();
const asset = html.match(/(?:src|href)="\/?(assets\/index-[^"]+\.js)"/)?.[1];
if (!asset) throw new Error("could not locate the production JavaScript asset");

const bundle = await fetch(`${site}/${asset}`);
requireOk(bundle, "portfolio JavaScript");
const javascript = await bundle.text();
if (javascript.includes("http://localhost:8787")) throw new Error("production chat points at localhost");
const worker = javascript.match(/https:\/\/[A-Za-z0-9.-]+\.workers\.dev/)?.[0];
if (!worker) throw new Error("could not locate the configured Worker URL");

for (const path of ["/", "/contact"]) {
  const response = await fetch(`${worker}${path}`, {
    method: "OPTIONS",
    headers: { Origin: site },
  });
  requireOk(response, `Worker ${path}`);
  if (response.headers.get("access-control-allow-origin") !== site) {
    throw new Error(`Worker ${path} returned the wrong CORS origin`);
  }
}

console.log(`healthy: ${site}`);
console.log(`worker: ${worker} (chat and contact preflights passed)`);
