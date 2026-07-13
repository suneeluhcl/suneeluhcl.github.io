import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, ChevronDown, Building2 } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { experience, stats } from "../data.js";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1500;
        const step = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setDisplay(Math.round(eased * value));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="font-mono text-3xl md:text-4xl font-bold text-accent">
      {display}
      {suffix}
    </span>
  );
}

function TimelineEntry({ job, index }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <li className="relative pl-10 md:pl-14 pb-12 last:pb-0">
      {/* Timeline dot */}
      <span
        aria-hidden="true"
        className="absolute left-0 md:left-2 top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-base shadow-[0_0_16px_var(--c-glow)]"
      />

      <Reveal y={20}>
        <article className="glow-hover rounded-xl border border-line bg-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-mono font-bold text-lg flex items-center gap-2">
                <Building2 size={17} className="text-accent" aria-hidden="true" />
                {job.company}
              </h3>
              <p className="text-accent font-medium mt-0.5">{job.title}</p>
            </div>
            <div className="font-mono text-xs text-mut text-right space-y-1">
              <p className="flex items-center gap-1.5 justify-end">
                <Calendar size={13} aria-hidden="true" /> {job.dates}
              </p>
              <p className="flex items-center gap-1.5 justify-end">
                <MapPin size={13} aria-hidden="true" /> {job.location}
              </p>
            </div>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
            {job.stack.map((tech) => (
              <li
                key={tech}
                className="chip-glow font-mono text-xs px-2.5 py-1 rounded-md border border-line bg-card-soft text-mut"
              >
                {tech}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="mt-4 flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
          >
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
            {expanded ? "hide responsibilities" : "show responsibilities"}
          </button>

          <div className={`collapse-grid${expanded ? " collapse-open" : ""}`}>
            <div className="overflow-hidden">
              <ul className="mt-3 space-y-2 text-sm text-mut leading-relaxed">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-accent font-mono select-none shrink-0">▹</span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-xs text-mut/80 border-t border-line pt-3">
                <span className="text-accent">env:</span> {job.environment}
              </p>
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHeading index="03" label="experience" title="Where I've Worked" />

      {/* Stats */}
      <Reveal className="mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glow-hover rounded-xl border border-line bg-card p-5 text-center">
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-1.5 text-xs md:text-sm text-mut">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Timeline */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[7px] md:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-line to-transparent"
        />
        <ol className="list-none">
          {experience.map((job, i) => (
            <TimelineEntry key={`${job.company}-${job.dates}`} job={job} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
