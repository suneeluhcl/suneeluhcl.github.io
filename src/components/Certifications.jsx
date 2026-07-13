import { Cloud, BrainCircuit, BadgeCheck, ExternalLink } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { certifications } from "../data.js";

const icons = { Cloud, BrainCircuit };

export default function Certifications() {
  return (
    <section id="certifications" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHeading index="05" label="certifications" title="Certifications" />

      <div className="grid gap-5 md:grid-cols-2">
        {certifications.map((cert, i) => {
          const Icon = icons[cert.icon];
          return (
            <Reveal key={cert.name} delay={i * 0.12}>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.name} on Credly`}
                className="glow-hover group h-full rounded-xl border border-line bg-card p-6 flex items-start gap-4 transition-colors hover:border-accent/50"
              >
                <span className="p-3 rounded-lg bg-accent/10 text-accent shrink-0">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold leading-snug flex items-start gap-2">
                    {cert.name}
                    <BadgeCheck size={17} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  </h3>
                  <p className="mt-1 font-mono text-sm text-mut">
                    {cert.issuer} <span className="text-accent">·</span> {cert.year}
                  </p>
                  <p className="mt-3 font-mono text-xs text-accent inline-flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                    Verify on Credly
                    <ExternalLink size={13} aria-hidden="true" />
                  </p>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
