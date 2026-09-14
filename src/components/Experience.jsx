import SectionHeading from "./SectionHeading.jsx";
import { experience } from "../data.js";

export default function Experience() {
  return (
    <section id="experience" className="page-width section-space">
      <SectionHeading index="02" label="Career" title="A decade of building & delivering." />
      <p className="section-intro">From Java services to cloud platforms and production AI. Finance, healthcare, and commerce.</p>
      <ol className="career-list">
        {experience.map((job, index) => <li key={job.company + job.dates}>
          <article className="career-entry">
            <div className="career-date"><span>{job.dates}</span>{index === 0 && <span className="current-label">Most recent engagement</span>}</div>
            <div className="career-content">
              <div className="career-heading"><h3>{job.company}</h3><span>{job.location}</span></div>
              <p className="career-title">{job.title}</p>{job.focus && <p className="career-focus">{job.focus}</p>}<p className="career-summary">{job.bullets[0]}</p>
              <details className="career-details">
                <summary>Role details &amp; technologies <span aria-hidden="true">+</span></summary>
                <ul className="project-highlights">{job.bullets.slice(1).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                <ul className="tech-tags" aria-label="Tech stack">{job.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                <p className="career-environment"><strong>Environment:</strong> {job.environment}</p>
              </details>
            </div>
          </article>
        </li>)}
      </ol>
    </section>
  );
}
