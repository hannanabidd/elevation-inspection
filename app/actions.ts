"use server";

import { inbox, sendEmail } from "@/lib/email";
import { billingOptions, cities, pending, propertyTypes, site } from "@/lib/site";

export type FormState = {
  status: "idle" | "error" | "success";
  errors?: Record<string, string>;
  values?: Record<string, string>;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const read = (fd: FormData, key: string, max = 200) =>
  String(fd.get(key) ?? "")
    .trim()
    .slice(0, max);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
const oneOf = <T extends readonly string[]>(list: T, v: string) => (list as readonly string[]).includes(v);

const sendFailed = `Something went wrong sending your details. Please call ${site.phone} or email ${site.email}.`;

/* Register page: 11 fields, 6 required. Goes to the inbox, plus an auto-reply. */
export async function registerProperty(_prev: FormState, fd: FormData): Promise<FormState> {
  // Honeypot: real people never see or fill this field.
  if (read(fd, "website")) return { status: "success", values: { firstName: "" } };

  const v = {
    fullName: oneLine(read(fd, "fullName", 100)),
    email: oneLine(read(fd, "email", 200)),
    phone: oneLine(read(fd, "phone", 40)),
    address: oneLine(read(fd, "address", 200)),
    city: read(fd, "city", 40),
    sqft: read(fd, "sqft", 12),
    propertyType: read(fd, "propertyType", 40),
    propertyCount: read(fd, "propertyCount", 6),
    billing: read(fd, "billing", 20),
    referredBy: oneLine(read(fd, "referredBy", 150)),
    notes: read(fd, "notes", 2000),
  };

  const errors: Record<string, string> = {};
  if (!v.fullName) errors.fullName = "Enter your full name.";
  if (!EMAIL_RE.test(v.email)) errors.email = "Enter a valid email address, like name@example.com.";
  if (v.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a phone number with the area code.";
  if (!v.address) errors.address = "Enter the property address.";
  if (!oneOf(cities, v.city)) errors.city = "Choose the city the property is in.";
  const sqft = Number(v.sqft.replace(/[,\s]/g, ""));
  if (!v.sqft || !Number.isFinite(sqft) || sqft < 100 || sqft > 100_000)
    errors.sqft = "Enter the approximate square footage. A best guess is fine.";
  if (v.propertyType && !oneOf(propertyTypes, v.propertyType)) errors.propertyType = "Choose a property type.";
  if (v.propertyCount && (!/^\d+$/.test(v.propertyCount) || Number(v.propertyCount) < 1))
    errors.propertyCount = "Enter a whole number, like 1 or 3.";
  if (v.billing && !oneOf(billingOptions, v.billing)) errors.billing = "Choose monthly or annual.";

  if (Object.keys(errors).length) return { status: "error", errors, values: v };

  const text = [
    "New property registration",
    "",
    `Full name:            ${v.fullName}`,
    `Email:                ${v.email}`,
    `Phone:                ${v.phone}`,
    `Property address:     ${v.address}`,
    `City:                 ${v.city}`,
    `Approx. square feet:  ${sqft.toLocaleString("en-US")}`,
    `Property type:        ${v.propertyType || "-"}`,
    `Number of properties: ${v.propertyCount || "-"}`,
    `Billing preference:   ${v.billing || "-"}`,
    `Referred by:          ${v.referredBy || "-"}`,
    "",
    "Anything we should know?",
    v.notes || "-",
  ].join("\n");

  const sent = await sendEmail({
    to: inbox,
    subject: `New registration: ${v.fullName}, ${v.city}`,
    text,
    replyTo: v.email,
  });
  if (!sent.ok) return { status: "error", values: v, message: sendFailed };

  const firstName = v.fullName.split(/\s+/)[0];
  // Auto-reply (copy doc, Register page section 4). A failure here shouldn't fail the registration.
  await sendEmail({
    to: v.email,
    subject: "We got your registration",
    text: `Hi ${firstName}, thanks for registering with Elevation Inspections. Our team will reach out within ${pending.followUp} to confirm your property details and set up your membership. If you have questions before then, reply to this email or call ${site.phone}.`,
    replyTo: inbox,
  });

  return { status: "success", values: { firstName } };
}

/* Contact page: Name | Email | Phone (optional) | Message. */
export async function sendContactMessage(_prev: FormState, fd: FormData): Promise<FormState> {
  if (read(fd, "website")) return { status: "success" };

  const v = {
    name: oneLine(read(fd, "name", 100)),
    email: oneLine(read(fd, "email", 200)),
    phone: oneLine(read(fd, "phone", 40)),
    message: read(fd, "message", 4000),
  };

  const errors: Record<string, string> = {};
  if (!v.name) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(v.email)) errors.email = "Enter a valid email address, like name@example.com.";
  if (v.phone && v.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Enter a phone number with the area code, or leave it blank.";
  if (v.message.length < 2) errors.message = "Enter your message.";

  if (Object.keys(errors).length) return { status: "error", errors, values: v };

  const sent = await sendEmail({
    to: inbox,
    subject: `Website message from ${v.name}`,
    text: [
      "New message from the website contact form",
      "",
      `Name:  ${v.name}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone || "-"}`,
      "",
      v.message,
    ].join("\n"),
    replyTo: v.email,
  });
  if (!sent.ok) return { status: "error", values: v, message: sendFailed };

  return { status: "success" };
}
