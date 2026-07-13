import {
  Code2, Database, ShieldCheck, Layers, KeyRound, Server,
  Container, Wrench, FlaskConical, Hammer, Cloud,
} from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { skillCategories } from "../data.js";

const icons = {
  Code2, Database, ShieldCheck, Layers, KeyRound, Server,
  Container, Wrench, FlaskConical, Hammer, Cloud,
};

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHeading index="02" label="skills" title="Technical Arsenal" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => {
          const Icon = icons[cat.icon];
          return (
            <Reveal key={cat.title} delay={(i % 3) * 0.1}>
              <article className="glow-hover h-full rounded-xl border border-line bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-mono font-semibold">{cat.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="chip-glow font-mono text-xs px-2.5 py-1 rounded-md border border-line bg-card-soft text-mut"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
