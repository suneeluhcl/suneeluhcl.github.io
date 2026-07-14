import { useState, useCallback } from "react";
import { CHAT_API_URL } from "../config.js";

const GREETING = {
  role: "assistant",
  content: "Hi — ask me anything about Suneel's experience, stack, or projects.",
};

export function useChat() {
  const [messages, setMessages] = useState([GREETING]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const send = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setError(null);
    setBusy(true);

    const history = messages.filter((m) => m !== GREETING);
    const outgoing = [...history, { role: "user", content: trimmed }];
    setMessages((prev) => [...prev, { role: "user", content: trimmed }, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: outgoing }),
      });
      if (!res.ok || !res.body) throw new Error(`status ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n");
        buffer = parts.pop() ?? "";
        for (const line of parts) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;
          const payload = trimmedLine.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const token = JSON.parse(payload).response ?? "";
            if (token) {
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = {
                  role: "assistant",
                  content: next[next.length - 1].content + token,
                };
                return next;
              });
            }
          } catch {
            /* ignore keep-alive / non-JSON lines */
          }
        }
      }
    } catch {
      setError("Chat is momentarily unavailable — reach Suneel at suneeluhcl@gmail.com.");
      setMessages((prev) => prev.slice(0, -1)); // drop the empty assistant bubble
    } finally {
      setBusy(false);
    }
  }, [messages, busy]);

  return { messages, busy, error, send };
}
