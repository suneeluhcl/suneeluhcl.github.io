export function buildResumeContext({
  profile = {}, about = [], skillCategories = [],
  experience = [], certifications = [], education = [],
}) {
  const lines = [];
  lines.push(`# ${profile.name ?? ""} — ${profile.title ?? ""}`.trim());
  if (about.length) lines.push(`\n## Summary\n${about.join(" ")}`);

  if (skillCategories.length) {
    lines.push("\n## Skills");
    for (const cat of skillCategories) {
      lines.push(`- ${cat.title}: ${(cat.items ?? []).join(", ")}`);
    }
  }

  if (experience.length) {
    lines.push("\n## Experience");
    for (const job of experience) {
      lines.push(`\n### ${job.title} — ${job.company} (${job.location}) · ${job.dates}`);
      if (job.stack?.length) lines.push(`Stack: ${job.stack.join(", ")}`);
      for (const b of job.bullets ?? []) lines.push(`- ${b}`);
    }
  }

  if (certifications.length) {
    lines.push("\n## Certifications");
    for (const c of certifications) lines.push(`- ${c.name} (${c.issuer}, ${c.year})`);
  }

  if (education.length) {
    lines.push("\n## Education");
    for (const e of education) lines.push(`- ${e.degree} — ${e.school}`);
  }

  return lines.join("\n");
}
