import { motion } from "framer-motion";
import { Phone, Mail, ArrowDown, TerminalSquare } from "lucide-react";
import useTypewriter from "../hooks/useTypewriter.js";
import { profile } from "../data.js";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 * i, ease: "easeOut" },
  }),
};

export default function Hero() {
  const typed = useTypewriter(profile.typingWords);

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Backdrop: grid + gradient blobs */}
      <div className="absolute inset-0 hero-grid" aria-hidden="true" />
      <div aria-hidden="true">
        <div className="blob w-105 h-105 bg-accent2 -top-20 -left-24" />
        <div className="blob w-96 h-96 bg-accent top-1/3 -right-20" style={{ animationDelay: "-5s" }} />
        <div className="blob w-72 h-72 bg-accent2 bottom-0 left-1/3" style={{ animationDelay: "-9s" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-32 w-full">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-mono text-sm text-accent mb-5 flex items-center gap-2"
        >
          <TerminalSquare size={16} aria-hidden="true" />
          ~/suneel-kumar $ whoami
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
        >
          {profile.name}
          <span className="text-accent">_</span>
        </motion.h1>

        <motion.h2
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-mut"
        >
          {profile.title}
        </motion.h2>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-5 font-mono text-base md:text-lg h-7"
          aria-label={`Technologies: ${profile.typingWords.join(", ")}`}
        >
          <span className="text-mut">&gt; </span>
          <span className="text-accent">{typed}</span>
          <span className="type-cursor text-accent" aria-hidden="true">▌</span>
        </motion.p>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-2xl text-mut leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-mut"
        >
          <a href={`tel:${profile.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone size={15} aria-hidden="true" /> {profile.phone}
          </a>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            <Mail size={15} aria-hidden="true" /> {profile.email}
          </a>
        </motion.div>

        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold
                       bg-accent text-[#06121a] hover:shadow-[0_0_28px_var(--c-glow)] transition-shadow"
          >
            View Experience
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold
                       border border-accent/50 text-accent hover:bg-accent/10 hover:shadow-[0_0_20px_var(--c-glow)] transition"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
