import { test, expect } from "@playwright/test";

/**
 * Guards /resume/ (scripts/build-resume-page.js) — the linkable, indexable,
 * ATS-parseable version of the résumé. Runs against the built output.
 */

test("serves a complete résumé with no JavaScript", async ({ request }) => {
  const res = await request.get("/resume/");
  expect(res.status()).toBe(200);

  const html = await res.text();
  const { profile, availability, experience, certifications } = await import("../src/data.js");

  // Every employer and every certification must be present — a résumé missing a
  // role is worse than no page at all.
  for (const needle of [
    profile.name,
    profile.title,
    profile.email,
    ...new Set(experience.map((e) => e.company)),
    ...experience.map((e) => e.dates),
    ...certifications.map((c) => c.name),
    ...Object.values(availability).filter(Boolean),
  ]) {
    expect(html, `résumé page should contain "${needle}"`).toContain(needle);
  }

  expect(html).not.toContain("<script src");
});

test("uses semantic structure an ATS can parse", async ({ page }) => {
  await page.goto("/resume/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Suneel Kumar/);

  const sections = await page.getByRole("heading", { level: 2 }).allTextContents();
  for (const expected of ["Summary", "Skills", "Experience", "Certifications", "Education"]) {
    expect(sections.map((s) => s.toLowerCase())).toContain(expected.toLowerCase());
  }

  // Bullets must be real list items, not styled divs.
  expect(await page.locator("main ul li").count()).toBeGreaterThan(20);
});

test("declares itself as a Person at the canonical résumé URL", async ({ request }) => {
  const html = await (await request.get("/resume/")).text();
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

  expect(data["@type"]).toBe("Person");
  expect(data.worksFor).toEqual([{ "@type": "Organization", name: "Capital One" }]);
  expect(data.url).toBe("https://suneelkumarbikkasani.com/resume/");
  expect(html).toContain('<link rel="canonical" href="https://suneelkumarbikkasani.com/resume/">');
});

test("is reachable from the main site and offers the PDF", async ({ page }) => {
  await page.goto("/#contact");
  const link = page.getByRole("link", { name: /view résumé/i });
  await expect(link).toHaveAttribute("href", "/resume/");

  await page.goto("/resume/");
  await expect(page.getByRole("link", { name: /download pdf/i })).toHaveAttribute("href", "/resume.pdf");
});
