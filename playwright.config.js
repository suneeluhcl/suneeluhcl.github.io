// playwright.config.js
import { defineConfig } from "@playwright/test";

// Two surfaces need testing: the dev server (fast feedback on app behaviour) and
// the built, prerendered output (what crawlers and recruiters actually receive).
export default defineConfig({
  testDir: "./e2e",
  webServer: [
    {
      command: "npm run dev",
      url: "http://localhost:5173",
      reuseExistingServer: true,
    },
    {
      command: "npm run build && npm run preview -- --port 4173 --strictPort",
      url: "http://localhost:4173",
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
  projects: [
    {
      name: "dev",
      testIgnore: /prerender\.spec\.js/,
      use: { baseURL: "http://localhost:5173" },
    },
    {
      name: "built",
      testMatch: /prerender\.spec\.js/,
      use: { baseURL: "http://localhost:4173" },
    },
  ],
});
