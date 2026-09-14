import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { useChat } from "../hooks/useChat.js";
import { RESUME_ASSISTANT_ENABLED } from "../config.js";

const STARTERS = [
  "What application and cloud security experience does he have?",
  "How deep is his Java and full-stack experience?",
  "What has he built with GenAI?",
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, busy, error, send } = useChat();
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const close = () => { setOpen(false); launcherRef.current?.focus(); };

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const submit = (event) => {
    event.preventDefault();
    if (busy || !input.trim()) return;
    send(input);
    setInput("");
  };

  return (
    <div data-chat-widget>
      <button ref={launcherRef} onClick={() => setOpen((value) => !value)} aria-label={open ? "Close résumé assistant" : "Ask my résumé"} aria-expanded={open} aria-controls={open ? "resume-assistant" : undefined} className="chat-launcher">
        {open ? <X size={21} aria-hidden="true" /> : <MessageSquare size={21} aria-hidden="true" />}
      </button>
      {open && (
        <div id="resume-assistant" role="dialog" aria-label="Résumé assistant" className="chat-panel" onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); close(); } }}>
          <div className="chat-heading"><div><strong>Ask my résumé</strong><p>AI answers based on my experience</p></div><button aria-label="Close assistant panel" onClick={close} className="icon-button"><X size={17} aria-hidden="true" /></button></div>
          {!RESUME_ASSISTANT_ENABLED ? <div className="chat-messages"><p>The assistant is being updated with my latest experience.</p><p><a className="text-link" href="/resume/">Read my current résumé</a></p><p><a className="text-link" href="#contact" onClick={close}>Discuss an opportunity</a></p></div> : <>
          <div ref={scrollRef} className="chat-messages" aria-busy={busy}>
            <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">
              {messages.map((message, index) => <div key={index} className={message.role === "user" ? "chat-message chat-user" : "chat-message"}><span>{message.content || (busy ? "…" : "")}</span></div>)}
            </div>
            {messages.length <= 1 && <div className="chat-starters">{STARTERS.map((starter) => <button key={starter} onClick={() => send(starter)} disabled={busy}>{starter}</button>)}</div>}
            {error && <p role="alert" className="chat-error">{error}</p>}
          </div>
          <form onSubmit={submit} className="chat-form">
            <input ref={inputRef} aria-label="Your question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Suneel's experience…" disabled={busy} />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send"><Send size={17} aria-hidden="true" /></button>
          </form>
          </>}
        </div>
      )}
    </div>
  );
}
