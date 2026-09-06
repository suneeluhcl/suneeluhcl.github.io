import { Code2, ShieldCheck, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { skillCategories } from "../data.js";

const tracks = [
  {
    title: "Java Full Stack Engineer", icon: Code2, scope: "Application delivery · Distributed systems · Cloud platforms",
    description: "End-to-end delivery of enterprise applications: secure APIs, event-driven services, responsive interfaces, and production operations.",
    technologies: ["Java 17/21", "Spring Boot", "React", "Angular", "TypeScript", "AWS", "GCP", "Kafka", "Docker", "Kubernetes", "SQL", "JUnit / Mockito"],
    href: "#experience", evidence: "See enterprise delivery experience",
  },
  {
    title: "Cybersecurity Engineer", icon: ShieldCheck, scope: "Application security · Cloud security · Secure software engineering",
    description: "Security engineering embedded in production software: identity and access controls, API protection, encryption, vulnerability remediation, and compliance-aligned delivery.",
    technologies: ["OAuth2 / OIDC", "JWT", "Mutual TLS / PKI", "AWS IAM", "KMS", "Secrets Manager", "Vault", "PGP", "Checkmarx", "Threat modeling", "PCI DSS", "NIST 800-53"],
    href: "#projects", evidence: "See secure payment-platform work",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="page-width section-space">
      <SectionHeading index="03" label="Role fit & expertise" title="Engineering depth. Security built in." />
      <p className="section-intro">Two closely connected role tracks, grounded in the same production experience. My cybersecurity focus is application and cloud security.</p>
      <div className="role-grid">{tracks.map(({ title, icon: Icon, scope, description, technologies, href, evidence }) => <article className="role-card" key={title}>
        <Icon size={26} aria-hidden="true" /><h3>{title}</h3><p className="role-scope">{scope}</p><p>{description}</p>
        <ul className="tech-tags">{technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        <a href={href} className="role-evidence">{evidence}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </article>)}</div>
      <details className="all-technologies"><summary>Explore the complete technology toolkit <span aria-hidden="true">+</span></summary>
        <div className="skills-grid">{skillCategories.map((category) => <article key={category.title} className="skill-category"><h3>{category.title}</h3><ul className="tech-tags">{category.items.map((tech) => <li key={tech}>{tech}</li>)}</ul></article>)}</div>
      </details>
    </section>
  );
}
