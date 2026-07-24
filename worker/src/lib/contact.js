const LIMITS = { name: 100, email: 200, message: 5000 };

// Deliberately permissive: the address only has to be plausible enough to reply
// to. Real verification happens when Suneel hits reply.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a contact-form submission.
 *
 * Returns `{ ok: true, spam, data }`. `spam` is true when the honeypot field was
 * filled — the caller should answer 200 and silently drop the message, because
 * telling a bot it was detected just teaches it to try again.
 */
export function validateContact(input) {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "invalid body" };
  }

  const field = (key) => (typeof input[key] === "string" ? input[key].trim() : "");
  const name = field("name");
  const email = field("email");
  const message = field("message");

  if (!name) return { ok: false, error: "name is required" };
  if (name.length > LIMITS.name) return { ok: false, error: "name is too long" };

  if (!email) return { ok: false, error: "email is required" };
  if (email.length > LIMITS.email) return { ok: false, error: "email is too long" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "email is not valid" };

  if (!message) return { ok: false, error: "message is required" };
  if (message.length > LIMITS.message) return { ok: false, error: "message is too long" };

  // Hidden field that humans never see and bots reliably fill in.
  const honeypot = field("website");

  return { ok: true, spam: honeypot.length > 0, data: { name, email, message } };
}

/**
 * Delivers the message through Resend.
 *
 * The submitter's address goes in `reply_to`, never in `from` — sending as an
 * address on someone else's domain would fail SPF/DKIM and land the mail in spam.
 */
export async function sendViaResend(env, { name, email, message }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\n—\n${name}\n${email}\nSent from suneelkumarbikkasani.com`,
    }),
  });

  if (!res.ok) {
    throw new Error(`resend responded ${res.status}: ${await res.text()}`);
  }
}
