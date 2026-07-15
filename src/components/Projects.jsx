import { ExternalLink, Github, ArrowUpRight, Check } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { projects } from "../data.js";

const linkIcons = { ExternalLink, Github };

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-5 md:px-8 py-24">
      <SectionHeading index="04" label="projects" title="Selected Work" />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.12}>
            <article className="glow-hover group h-full rounded-xl border border-line bg-card p-6 flex flex-col transition-colors hover:border-accent/50">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  {project.org && (
                    <p className="font-mono text-xs text-accent mb-1">{project.org}</p>
                  )}
                  <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
                </div>
                {project.links?.length > 0 && (
                  <ArrowUpRight
                    size={18}
                    className="text-mut shrink-0 mt-1 transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                )}
              </div>

              <p className="mt-2 text-sm text-mut leading-relaxed">{project.tagline}</p>

              {project.highlights?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-mut leading-relaxed">
                      <Check size={15} className="text-accent shrink-0 mt-1" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded-md border border-line text-mut"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {project.links?.length > 0 && (
                <div className="mt-5 pt-4 border-t border-line flex flex-wrap gap-4">
                  {project.links.map((link) => {
                    const Icon = linkIcons[link.icon] ?? ExternalLink;
                    const external = link.url.startsWith("http");
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="font-mono text-xs text-accent inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
                      >
                        <Icon size={14} aria-hidden="true" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
