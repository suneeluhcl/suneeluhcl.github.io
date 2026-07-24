import { Phone, Mail, ArrowDown, TerminalSquare } from "lucide-react";
import Typewriter from "./Typewriter.jsx";
import SocialLinks from "./SocialLinks.jsx";
import Availability from "./Availability.jsx";
import { profile } from "../data.js";
import portrait from "../assets/suneel.webp";

// staggered CSS entrance; matches the previous 0.15s cascade
const rise = (i) => ({ animationDelay: `${0.15 * i}s` });

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Backdrop: grid + gradient blobs */}
      <div className="absolute inset-0 hero-grid" aria-hidden="true" />
      <div aria-hidden="true">
        <div className="blob w-105 h-105 bg-accent2 -top-20 -left-24" />
        <div className="blob w-96 h-96 bg-accent top-1/3 -right-20" style={{ animationDelay: "-5s" }} />
        <div className="blob w-72 h-72 bg-accent2 bottom-0 left-1/3" style={{ animationDelay: "-9s" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-28 lg:py-32 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center">
        <div>
          <p className="hero-rise font-mono text-sm text-accent mb-5 flex items-center gap-2" style={rise(0)}>
            <TerminalSquare size={16} aria-hidden="true" />
            ~/suneel-kumar $ whoami
          </p>

          <h1 className="hero-rise font-mono text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight" style={rise(1)}>
            {profile.name}
            <span className="text-accent">_</span>
          </h1>

          <h2 className="hero-rise mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-mut" style={rise(2)}>
            {profile.title}
          </h2>

          <p
            className="hero-rise mt-5 font-mono text-base md:text-lg h-7"
            style={rise(3)}
            aria-label={`Technologies: ${profile.typingWords.join(", ")}`}
          >
            <span className="text-mut">&gt; </span>
            <Typewriter words={profile.typingWords} className="text-accent" />
          </p>

          <p className="hero-rise mt-6 max-w-2xl text-mut leading-relaxed" style={rise(4)}>
            {profile.tagline}
          </p>

          <div
            className="hero-rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-mut"
            style={rise(5)}
          >
            <a href={`tel:${profile.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={15} aria-hidden="true" /> {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail size={15} aria-hidden="true" /> {profile.email}
            </a>
            <SocialLinks variant="inline" />
          </div>

          <Availability className="hero-rise mt-6" style={rise(6)} />

          <div className="hero-rise mt-10 flex flex-wrap gap-4" style={rise(7)}>
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
          </div>
        </div>

        {/* Portrait */}
        <div className="hero-pop justify-self-center order-first lg:order-none">
          <div className="relative w-44 sm:w-56 lg:w-80">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-full bg-gradient-to-tr from-accent2/45 via-accent/35 to-transparent blur-2xl"
            />
            <div className="relative rounded-full p-1.5 bg-gradient-to-tr from-accent via-accent2 to-transparent shadow-[0_0_40px_var(--c-glow)]">
              <img
                src={portrait}
                alt="Suneel Kumar, Sr. Java Fullstack Developer — professional headshot"
                width="640"
                height="640"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="rounded-full w-full aspect-square object-cover bg-gradient-to-b from-card-soft to-accent/15"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full border border-line bg-card font-mono text-xs text-accent whitespace-nowrap shadow-lg">
              Java <span className="text-mut">·</span> AWS <span className="text-mut">·</span> GCP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
