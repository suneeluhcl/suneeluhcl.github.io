import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { projects } from "../data.js";

// Summaries of existing résumé evidence, not new performance claims.
const featured = [
  { index: 0, label: "Payments & distributed systems", value: "Millions", metric: "of payments processed daily", description: "Secure fulfillment across ACH, debit, checks, balance transfers, and cross-border payments.", ownership: "Own the public fulfillment API; build vendor ingestion and batch-posting pipelines across 40+ file formats." },
  { index: 1, label: "Application & API security", value: "PCI DSS", metric: "controls embedded end to end", description: "A real-time card-transfer service operating inside the Cardholder Data Environment.", ownership: "Built the Fastify service with proof-of-possession tokens, field-level encryption, and structured security logging." },
  { index: 2, label: "Modernization & observability", value: "30%", metric: "faster incident response", description: "A campaign platform handling millions of user events, rebuilt around independent services.", ownership: "Led platform delivery, decomposed monoliths, and improved incident response through Splunk and CloudWatch." },
];

function ProjectDetails({ project }) {
  return <>
    <ul className="project-highlights">{project.highlights.map((point) => <li key={point}>{point}</li>)}</ul>
    <ul className="tech-tags" aria-label="Technology stack">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
    {project.links?.map((link) => <a key={link.url} href={link.url} className="text-link" target={link.url.startsWith("http") ? "_blank" : undefined} rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}>{link.label} <ArrowUpRight size={15} aria-hidden="true" /></a>)}
  </>;
}

export default function Projects() {
  return (
    <section id="projects" className="page-width section-space">
      <SectionHeading index="01" label="Selected work" title="Built for real-world complexity." />
      <p className="section-intro">A closer look at the systems I’ve helped deliver—and the work I owned.</p>
      <div className="featured-grid">
        {featured.map((item) => {
          const project = projects[item.index];
          return <article className="case-card" key={project.title}>
            <p className="eyebrow">{item.label}</p>
            <div className="case-metric"><strong>{item.value}</strong><span>{item.metric}</span></div>
            <div className="case-body">
              <p className="case-company">{project.org}</p>
              <h3>{project.title}</h3><p>{item.description}</p>
              <div className="ownership"><span>My contribution</span><p>{item.ownership}</p></div>
            </div>
            <details className="case-details"><summary>Explore the engineering<span aria-hidden="true">+</span></summary><ProjectDetails project={project} /></details>
          </article>;
        })}
      </div>
      <details className="more-work">
        <summary>More enterprise work <span>Healthcare, commerce &amp; web platforms</span><span aria-hidden="true">+</span></summary>
        <div className="additional-projects">
          {projects.slice(3).map((project) => <article key={project.title}><p className="case-company">{project.org}</p><h3>{project.title}</h3><p>{project.tagline}</p><ProjectDetails project={project} /></article>)}
        </div>
      </details>
      <p className="confidentiality-note">Enterprise work; source code is private. These summaries describe my contributions without sharing proprietary code.</p>
    </section>
  );
}
