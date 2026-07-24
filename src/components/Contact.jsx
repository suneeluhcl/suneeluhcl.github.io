import { useState } from "react";
import { Phone, Mail, Send, FileDown, CheckCircle2, AlertTriangle } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import SocialLinks from "./SocialLinks.jsx";
import { profile } from "../data.js";
import { CONTACT_API_URL } from "../config.js";

const inputClasses =
  "w-full rounded-lg border border-line bg-card-soft px-4 py-2.5 text-sm text-ink placeholder:text-mut/60 " +
  "focus:outline-none focus:border-accent/70 focus:shadow-[0_0_12px_var(--c-glow)] transition " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

const EMPTY = { name: "", email: "", message: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Prefilled mailto used only as an escape hatch when delivery fails, so a typed
  // message is never lost with nowhere to go.
  const mailtoFallback =
    `mailto:${profile.email}` +
    `?subject=${encodeURIComponent(`Portfolio contact from ${form.name || "the website"}`)}` +
    `&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);

      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHeading index="07" label="contact" title="Get In Touch" />

      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="text-mut leading-relaxed max-w-md">
              I'm open to senior fullstack, platform, and modernization roles. Whether you have a
              question, an opportunity, or just want to talk shop about Java and AWS — my inbox is
              always open.
            </p>
            <div className="mt-8 space-y-4 font-mono text-sm">
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 text-mut hover:text-accent transition-colors"
              >
                <span className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Phone size={16} aria-hidden="true" />
                </span>
                {profile.phone}
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-mut hover:text-accent transition-colors"
              >
                <span className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Mail size={16} aria-hidden="true" />
                </span>
                {profile.email}
              </a>
            </div>

            <SocialLinks variant="icon" className="mt-6" />

            <a
              href="/resume.pdf"
              download="Suneel-Kumar-Resume.pdf"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-semibold
                         border border-accent/50 text-accent hover:bg-accent/10 hover:shadow-[0_0_20px_var(--c-glow)] transition"
            >
              <FileDown size={16} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-card p-6 md:p-8 space-y-4">
            <div>
              <label htmlFor="name" className="block font-mono text-xs text-mut mb-1.5">
                name<span className="text-accent">:</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={status === "sending"}
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Recruiter"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-xs text-mut mb-1.5">
                email<span className="text-accent">:</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={status === "sending"}
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-xs text-mut mb-1.5">
                message<span className="text-accent">:</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                disabled={status === "sending"}
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Let's talk about..."
                className={`${inputClasses} resize-y`}
              />
            </div>

            {/* Honeypot: invisible to people, reliably filled by bots. Kept out of
                the tab order and the accessibility tree. */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
              <label htmlFor="website">Leave this field empty</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold
                         bg-accent text-[#06121a] hover:shadow-[0_0_28px_var(--c-glow)] transition-shadow
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={16} aria-hidden="true" />
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            <p role="status" aria-live="polite" className="font-mono text-xs">
              {status === "sent" && (
                <span className="flex items-center gap-2 text-accent">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  Thanks — your message is on its way. I'll reply to the address you gave.
                </span>
              )}
              {status === "error" && (
                <span className="flex items-start gap-2 text-amber-500">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    That didn't go through. Your message is still in the box —{" "}
                    <a href={mailtoFallback} className="underline hover:text-accent">
                      send it by email instead
                    </a>{" "}
                    or write to {profile.email}.
                  </span>
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
