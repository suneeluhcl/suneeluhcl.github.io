import { ArrowUpRight } from "lucide-react";
import { about } from "../data.js";

export default function About() {
  return (
    <section id="about" className="page-width about-section">
      <div className="about-heading"><p className="eyebrow">How I work</p><h2>Ownership beyond<br />the pull request.</h2><a href="/resume/" className="text-link">Read the full résumé <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      <div className="about-copy"><p>I connect the application, infrastructure, and operational details that make a system dependable. My work spans API design and front-end delivery, cloud architecture, security, and the production support that comes after launch.</p><p>Java and Spring Boot are my foundation. Go, Python, React, and Angular let me work across the stack. More recently, I’ve shipped LLM inference services and reusable AI workflows for payment operations.</p><details><summary>More about my approach <span aria-hidden="true">+</span></summary>{about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</details></div>
    </section>
  );
}
