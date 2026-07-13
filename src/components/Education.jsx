import { GraduationCap, BookOpen } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { education } from "../data.js";

const icons = { GraduationCap, BookOpen };

export default function Education() {
  return (
    <section id="education" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHeading index="04" label="education" title="Education" />

      <div className="grid gap-5 md:grid-cols-2">
        {education.map((ed, i) => {
          const Icon = icons[ed.icon];
          return (
            <Reveal key={ed.degree} delay={i * 0.12}>
              <article className="glow-hover h-full rounded-xl border border-line bg-card p-6 flex items-start gap-4">
                <span className="p-3 rounded-lg bg-accent/10 text-accent shrink-0">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold leading-snug">{ed.degree}</h3>
                  <p className="mt-1 font-mono text-sm text-mut">{ed.school}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
