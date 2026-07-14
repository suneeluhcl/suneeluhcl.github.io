import { describe, it, expect } from "vitest";
import { buildSystemPrompt } from "../src/lib/systemPrompt.js";

describe("buildSystemPrompt", () => {
  const prompt = buildSystemPrompt("RESUME_MARKER_123");

  it("embeds the résumé context", () => {
    expect(prompt).toContain("RESUME_MARKER_123");
  });

  it("instructs grounding, no fabrication, and injection resistance", () => {
    const p = prompt.toLowerCase();
    expect(p).toContain("only");            // answer only from résumé
    expect(p).toContain("do not");          // do-not-fabricate style guardrail
    expect(p).toContain("ignore");          // resist "ignore previous instructions"
    expect(p).toContain("suneel");          // third-person persona
  });
});
