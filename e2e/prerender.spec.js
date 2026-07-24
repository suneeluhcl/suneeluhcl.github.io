import { test, expect } from "@playwright/test";

/**
 * Guards the static-HTML build (scripts/prerender.js). These run against the
 * built output, not the dev server, because `vite dev` never prerenders.
 */

test("résumé content is readable without executing JavaScript", async ({ request }) => {
  // A raw HTTP fetch is exactly what an ATS scraper or a non-JS AI crawler sees.
  const html = await (await request.get("/")).text();

  for (const needle of [
    "Capital One",
    "Payments Fulfillment Platform",
    "Senior Java Full Stack Developer",
    "Fidelity Investments",
    "AWS Certified Solutions Architect",
    "Houston, TX",
    "Available immediately",
  ]) {
    expect(html, `static HTML should contain "${needle}"`).toContain(needle);
  }

  // Guard against a regression to the empty-<body> SPA shell.
  expect(html.length).toBeGreaterThan(50_000);
});

test("configured social profiles reach crawlers in the static HTML", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const { profile } = await import("../src/data.js");

  for (const url of [profile.linkedin, profile.github].filter(Boolean)) {
    expect(html, `static HTML should link to ${url}`).toContain(url);
  }
});

test("structured data is valid JSON and describes a Person", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

  expect(match, "JSON-LD block should be present").not.toBeNull();
  const data = JSON.parse(match[1]);
  expect(data["@type"]).toBe("Person");
  expect(data.jobTitle).toBeTruthy();
  expect(Array.isArray(data.hasCredential)).toBe(true);

  // sameAs is what tells Google/AI crawlers this page and the LinkedIn profile are
  // the same person, so it must carry every configured profile — and nothing blank.
  const { profile } = await import("../src/data.js");
  const configured = [profile.linkedin, profile.github].filter(Boolean);
  expect(data.sameAs ?? []).toEqual(configured);
});

test("hydrates without React errors or mismatches", async ({ page }) => {
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("/");
  // Interactivity only works once hydration has completed.
  await page.getByRole("button", { name: /switch to (light|dark) mode/i }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  expect(errors, `console errors during hydration:\n${errors.join("\n")}`).toHaveLength(0);
});
