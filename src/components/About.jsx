import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { about } from "../data.js";

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHeading index="01" label="about" title="About Me" />

      <Reveal>
        <div className="rounded-xl border border-line bg-card overflow-hidden">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-card-soft">
            <span className="w-3 h-3 rounded-full bg-red-400/80" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" aria-hidden="true" />
            <span className="ml-3 font-mono text-xs text-mut">suneel@dev: ~/about — less README.md</span>
          </div>
          <div className="p-6 md:p-10 space-y-5 leading-relaxed text-mut">
            {about.map((para, i) => (
              <Reveal key={i} delay={i * 0.1} y={16}>
                <p>
                  <span className="font-mono text-accent select-none mr-2">&gt;</span>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
