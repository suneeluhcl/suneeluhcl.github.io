import { test, expect } from "@playwright/test";

const ENDPOINT = "http://localhost:8787/contact";

async function fillForm(page) {
  await page.goto("/#contact");
  await page.getByLabel("name:").fill("Jane Recruiter");
  await page.getByLabel("email:").fill("jane@company.com");
  await page.getByLabel("message:").fill("Are you open to a senior platform role?");
}

test("submits the form to the worker and confirms delivery", async ({ page }) => {
  let posted;
  await page.route(ENDPOINT, async (route) => {
    posted = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });

  await fillForm(page);
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.getByText(/your message is on its way/i)).toBeVisible();
  expect(posted).toMatchObject({
    name: "Jane Recruiter",
    email: "jane@company.com",
    message: "Are you open to a senior platform role?",
  });
  // The form clears only on a confirmed send.
  await expect(page.getByLabel("message:")).toHaveValue("");
});

test("offers an email fallback and keeps the message when delivery fails", async ({ page }) => {
  await page.route(ENDPOINT, (route) =>
    route.fulfill({ status: 502, contentType: "application/json", body: '{"error":"contact_unavailable"}' }),
  );

  await fillForm(page);
  await page.getByRole("button", { name: "Send Message" }).click();

  const fallback = page.getByRole("link", { name: /send it by email instead/i });
  await expect(fallback).toBeVisible();

  // The typed message must survive the failure — both in the box and in the mailto.
  await expect(page.getByLabel("message:")).toHaveValue("Are you open to a senior platform role?");
  const href = await fallback.getAttribute("href");
  expect(decodeURIComponent(href)).toContain("Are you open to a senior platform role?");
});
