import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildResumeContext } from "../worker/src/lib/resumeContext.js";
import * as data from "../src/data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "../worker/src/generated/resumeContext.js");

const ctx = buildResumeContext({
  profile: data.profile,
  about: data.about,
  skillCategories: data.skillCategories,
  experience: data.experience,
  certifications: data.certifications,
  education: data.education,
});

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  `// AUTO-GENERATED from src/data.js by scripts/gen-resume-context.mjs. Do not edit.\nexport const RESUME_CONTEXT = ${JSON.stringify(ctx)};\n`,
);
console.log(`Wrote ${out} (${ctx.length} chars)`);
