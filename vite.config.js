import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { profile, availability, certifications } from "./src/data.js";

const SITE_URL = "https://suneelkumarbikkasani.com/";

const KNOWS_ABOUT = [
  "Java", "Spring Boot", "Microservices", "AWS", "Google Cloud", "Kubernetes",
  "Apache Kafka", "GenAI", "AI Agents", "Payment Systems", "Cloud Security",
];

// "Houston, TX" -> { addressLocality: "Houston", addressRegion: "TX" }
function postalAddress(location) {
  if (!location) return undefined;
  const [locality, region] = location.split(",").map((s) => s.trim());
  if (!locality) return undefined;
  return {
    "@type": "PostalAddress",
    addressLocality: locality,
    ...(region && { addressRegion: region }),
    addressCountry: "US",
  };
}

/**
 * Schema.org Person built from src/data.js so the structured data can never drift
 * from what the page actually renders. Empty values are dropped rather than
 * emitted as blanks.
 */
function buildJsonLd() {
  const sameAs = [profile.linkedin, profile.github].filter(Boolean);
  const address = postalAddress(availability.location);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    ...(profile.phone && { telephone: profile.phone }),
    ...(sameAs.length && { sameAs }),
    ...(address && { address, homeLocation: address }),
    knowsAbout: KNOWS_ABOUT,
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certification",
      ...(c.issuer && { recognizedBy: { "@type": "Organization", name: c.issuer } }),
      ...(c.url && { url: c.url }),
    })),
    ...(availability.status && { seeks: { "@type": "Demand", name: availability.status } }),
  };
}

/**
 * Owns the parts of index.html that are derived rather than hand-written:
 *   - the JSON-LD block, regenerated from src/data.js
 *   - the Cloudflare Web Analytics beacon, added only when a token is configured
 *
 * The beacon token is a public identifier (it ships in the page either way), so
 * committing it to .env.production is safe.
 */
function htmlEnhancements(mode) {
  const token = loadEnv(mode, process.cwd(), "").VITE_CF_ANALYTICS_TOKEN;

  return {
    name: "html-enhancements",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        let out = html.replace(
          /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
          `<script type="application/ld+json">\n${JSON.stringify(buildJsonLd(), null, 2)}\n    </script>`,
        );

        if (token) {
          // No Subresource Integrity here on purpose: Cloudflare ships beacon.min.js
          // from an unversioned URL and updates it in place, so a pinned hash would
          // break analytics on their next release. Cloudflare's own documented
          // snippet omits SRI for the same reason. The script is analytics-only and
          // loads deferred, so a compromise of it cannot alter page content.
          out = out.replace(
            "</body>",
            `  <script defer src="https://static.cloudflareinsights.com/beacon.min.js" ` +
              `data-cf-beacon='${JSON.stringify({ token })}'></script>\n  </body>`,
          );
        }
        return out;
      },
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), htmlEnhancements(mode)],
}));
