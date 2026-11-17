/*
  Server only: imported solely from app/actions.ts ("use server").

  Sends email through Resend's HTTP API (https://resend.com/docs/api-reference/emails/send-email).
  Free plan: 3,000 emails a month, 100 a day.

  Environment (see .env.example):
    RESEND_API_KEY   API key from Resend (Sending access is enough)
    EMAIL_FROM       Sender on the domain verified in Resend.
                     Default: "Elevation Inspections <connect@elevationtninspections.com>"
    EMAIL_TO         Where submissions go. Default: connect@elevationtninspections.com

  Without RESEND_API_KEY in development, emails are printed to the terminal instead.
  In production they fail safely and the form asks the visitor to call.
*/

export const inbox = process.env.EMAIL_TO || "connect@elevationtninspections.com";
const from = process.env.EMAIL_FROM || "Elevation Inspections <connect@elevationtninspections.com>";

type Email = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail(email: Email): Promise<{ ok: boolean }> {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `\n[email: not sent, RESEND_API_KEY not set]\nTo: ${email.to}\nSubject: ${email.subject}\n${email.replyTo ? `Reply-To: ${email.replyTo}\n` : ""}\n${email.text}\n`,
      );
      return { ok: true };
    }
    console.error("Email not configured: set RESEND_API_KEY.");
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
      // Resend explains the problem, e.g. "The elevationtninspections.com domain is not verified."
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("Resend request failed", err);
    return { ok: false };
  }
}
