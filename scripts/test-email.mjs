// Checks the Resend settings in .env / .env.local and sends one test email to EMAIL_TO.
// Run: npm run email:test
const { RESEND_API_KEY, EMAIL_FROM, EMAIL_TO } = process.env;

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY. Add it to .env or .env.local (see .env.example).");
  process.exit(1);
}

const from = EMAIL_FROM || "Elevation Inspections <connect@elevationtninspections.com>";
const to = EMAIL_TO || "connect@elevationtninspections.com";

let res;
try {
  res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Website email test",
      text: "This is a test from the Elevation Inspections website. If you got it, the contact and registration forms can send email.",
    }),
    signal: AbortSignal.timeout(10_000),
  });
} catch (err) {
  console.error("Couldn't reach Resend:", err instanceof Error ? err.message : err);
  process.exit(1);
}

const body = await res.json().catch(() => ({}));

if (!res.ok) {
  const message = body.message ?? res.statusText;
  console.error(`Email test failed (${res.status}): ${message}`);
  if (/not verified/i.test(message)) {
    console.error(
      "→ Verify the domain at https://resend.com/domains (add its DNS records, then click Verify).\n" +
        '  To test before that, use EMAIL_FROM="Elevation Inspections <onboarding@resend.dev>" and set\n' +
        "  EMAIL_TO to the email you signed up to Resend with.",
    );
  } else if (/testing emails/i.test(message)) {
    console.error(
      "→ Until a domain is verified, Resend only delivers to the email you signed up with.\n" +
        "  Set EMAIL_TO to that address, or verify the domain.",
    );
  } else if (res.status === 401 || res.status === 403) {
    console.error("→ Check RESEND_API_KEY, or create a new key at https://resend.com/api-keys.");
  }
  process.exit(1);
}

console.log(`Test email sent from ${from} to ${to} (id ${body.id}).`);
