/*
  Server only: imported solely from app/actions.ts ("use server").

  Sends email through Resend's HTTP API (https://resend.com/docs/api-reference/emails/send-email).

  Environment:
    RESEND_API_KEY   API key from Resend
    EMAIL_FROM       Verified sender, e.g. "Elevation Inspections <connect@elevationtninspections.com>"
    EMAIL_TO         Where submissions go (defaults to connect@ElevationTNInspections.com)

  Without RESEND_API_KEY in development, emails are printed to the terminal instead.
*/

export const inbox = process.env.EMAIL_TO ?? "connect@ElevationTNInspections.com";

type Email = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail(email: Email): Promise<{ ok: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!key || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `\n[email: not sent, RESEND_API_KEY/EMAIL_FROM not set]\nTo: ${email.to}\nSubject: ${email.subject}\n${email.replyTo ? `Reply-To: ${email.replyTo}\n` : ""}\n${email.text}\n`,
      );
      return { ok: true };
    }
    console.error("Email not configured: set RESEND_API_KEY and EMAIL_FROM.");
    return { ok: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email.to],
        subject: email.subject,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("Resend request failed", err);
    return { ok: false };
  }
}
