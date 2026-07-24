import { Linkedin, Github } from "lucide-react";
import { profile } from "../data.js";

// Only profiles with a URL configured in data.js are rendered — an empty value
// hides the link instead of shipping a dead one.
const accounts = [
  { key: "linkedin", url: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { key: "github", url: profile.github, label: "GitHub", Icon: Github },
];

export const configuredAccounts = accounts.filter((a) => Boolean(a.url));

/**
 * Social profile links.
 *
 * variant="inline" — icon + label, sits alongside the phone/email row.
 * variant="icon"   — bordered icon buttons for the contact card and footer.
 */
export default function SocialLinks({ variant = "inline", className = "" }) {
  if (configuredAccounts.length === 0) return null;

  if (variant === "icon") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {configuredAccounts.map(({ key, url, label, Icon }) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${label} profile`}
            className="p-2 rounded-lg border border-line text-mut hover:text-accent hover:border-accent/50
                       hover:shadow-[0_0_16px_var(--c-glow)] transition"
          >
            <Icon size={17} aria-hidden="true" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <>
      {configuredAccounts.map(({ key, url, label, Icon }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer me"
          className={`flex items-center gap-2 hover:text-accent transition-colors ${className}`}
        >
          <Icon size={15} aria-hidden="true" /> {label}
        </a>
      ))}
    </>
  );
}
