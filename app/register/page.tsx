import type { Metadata } from "next";
import { CalendarCheck, Check, ClipboardText, Mail, Phone, PhoneCall } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { RegisterForm } from "@/components/register/register-form";
import { Container } from "@/components/ui";
import { pending, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register your short-term rental for twice-a-year structural inspections. Our team will reach out to get you set up.",
};

const next = [
  { icon: ClipboardText, title: "You register", text: "It takes about two minutes." },
  { icon: PhoneCall, title: "We reach out", text: `Within ${pending.followUp}, to confirm your details and start your membership.` },
  { icon: CalendarCheck, title: "Two inspections a year", text: "Reviewed by our engineering team." },
];

export default function RegisterPage() {
  return (
    <>
      <PageHero
        title="Register your property."
        intro={
          <p>
            Tell us about your property and our team will reach out within {pending.followUp} to
            confirm your details and set up your membership.{" "}
            <span className="bg-green px-1 font-semibold text-ink">No payment is needed today.</span>
          </p>
        }
      />

      <section className="grain relative bg-bg-alt py-14 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* The form, set like a report sheet */}
          <div className="lg:col-span-8">
            <div className="relative bg-surface p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)] sm:p-10 lg:p-12">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-green" />
              <RegisterForm />
            </div>
          </div>

          {/* What happens next */}
          <aside className="lg:col-span-4">
            <div data-theme="dark" className="grain relative overflow-hidden bg-ink p-8 text-fg lg:sticky lg:top-32">
              <p className="label text-muted">What happens next</p>
              <ol className="mt-7 space-y-7">
                {next.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center bg-green text-ink">
                      <s.icon className="size-5" />
                      <span className="sr-only">Step {i + 1}:</span>
                    </span>
                    <div>
                      <p className="font-display font-extrabold uppercase">{s.title}</p>
                      <p className="mt-1 text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 flex items-center gap-3 border-t border-line pt-6 font-semibold">
                <Check className="size-5 text-green" />
                No payment is needed today.
              </p>
              <div className="mt-6 space-y-3 border-t border-line pt-6 text-muted">
                <p className="label">Questions first?</p>
                <a href={site.phoneHref} className="flex items-center gap-3 font-semibold text-fg hover:text-green">
                  <Phone className="size-4 text-green" />
                  {site.phone}
                </a>
                <a href={site.emailHref} className="flex items-center gap-3 text-sm break-all hover:text-fg">
                  <Mail className="size-4 shrink-0 text-green" />
                  {site.email}
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
