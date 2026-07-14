import { test, expect } from "@playwright/test";

test("ask-my-résumé widget streams a grounded answer", async ({ page }) => {
  // Stub the worker: return a canned SSE stream.
  await page.route("http://localhost:8787", async (route) => {
    await route.fulfill({
      status: 200,
      headers: { "content-type": "text/event-stream" },
      body:
        'data: {"response":"Yes — Suneel built Kafka "}\n\n' +
        'data: {"response":"streaming pipelines at Capital One."}\n\n' +
        "data: [DONE]\n\n",
    });
  });

  await page.goto("/");
  await page.getByLabel("Ask my résumé").click();
  await page.getByPlaceholder("Ask about Suneel's experience…").fill("Kafka?");
  await page.getByLabel("Send").click();

  await expect(page.getByText("Kafka streaming pipelines at Capital One.")).toBeVisible();
});
