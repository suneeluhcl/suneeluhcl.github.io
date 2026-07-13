import { useState } from "react";
import { Phone, Mail, Send, FileDown } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { profile } from "../data.js";

const inputClasses =
  "w-full rounded-lg border border-line bg-card-soft px-4 py-2.5 text-sm text-ink placeholder:text-mut/60 " +
  "focus:outline-none focus:border-accent/70 focus:shadow-[0_0_12px_var(--c-glow)] transition";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // No backend: compose the message into a mailto link.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHeading index="06" label="contact" title="Get In Touch" />

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
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Let's talk about..."
                className={`${inputClasses} resize-y`}
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold
                         bg-accent text-[#06121a] hover:shadow-[0_0_28px_var(--c-glow)] transition-shadow"
            >
              <Send size={16} aria-hidden="true" />
              Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
