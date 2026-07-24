// src/config.js
// Set VITE_CHAT_API_URL at build time in production (the *.workers.dev URL).
const configuredUrl = import.meta.env.VITE_CHAT_API_URL;

if (import.meta.env.PROD && !configuredUrl) {
  console.warn(
    "[chat] VITE_CHAT_API_URL is not set for this production build — the résumé assistant will fall back to http://localhost:8787 and will not work on the live site. Rebuild with VITE_CHAT_API_URL set to the Worker URL (see worker/README.md).",
  );
}

export const CHAT_API_URL = configuredUrl ?? "http://localhost:8787";

// Same Worker, dedicated route (see worker/src/index.js).
export const CONTACT_API_URL = `${CHAT_API_URL.replace(/\/+$/, "")}/contact`;
