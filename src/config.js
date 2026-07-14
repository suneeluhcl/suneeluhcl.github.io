// src/config.js
// Set VITE_CHAT_API_URL at build time in production (the *.workers.dev URL).
export const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL ?? "http://localhost:8787";
