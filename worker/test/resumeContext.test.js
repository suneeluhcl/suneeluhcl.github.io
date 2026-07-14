import { describe, it, expect } from "vitest";
import { buildResumeContext } from "../src/lib/resumeContext.js";

const sample = {
  profile: { name: "Suneel Kumar", title: "Senior Java Full Stack Developer" },
  about: ["10+ years building enterprise apps."],
  skillCategories: [{ title: "Backend", items: ["Spring Boot", "Kafka"] }],
  experience: [{
    company: "Capital One", location: "Richmond, VA",
    title: "Senior Java Full Stack Developer", dates: "Nov 2023 – Present",
    stack: ["Java 17", "Kafka"], bullets: ["Built streaming pipelines with Kafka."],
  }],
  certifications: [{ name: "AWS SA Pro", issuer: "AWS", year: "2025" }],
  education: [{ degree: "MS Computer Science", school: "Houston, TX" }],
};

describe("buildResumeContext", () => {
  it("includes name, title, and role facts", () => {
    const ctx = buildResumeContext(sample);
    expect(ctx).toContain("Suneel Kumar");
    expect(ctx).toContain("Capital One");
    expect(ctx).toContain("Kafka");
    expect(ctx).toContain("AWS SA Pro");
  });

  it("is a non-trivial single string", () => {
    const ctx = buildResumeContext(sample);
    expect(typeof ctx).toBe("string");
    expect(ctx.length).toBeGreaterThan(100);
  });
});
