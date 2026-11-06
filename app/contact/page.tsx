import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapIcon, MapPin, Phone, type IconType } from "@/components/icons";
import { InView } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Button, Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Elevation Inspections in Sevierville, TN. Call (865) 801-3331 or email connect@elevationtninspections.com.",
};

function Row({
  icon: Icon,
  label,
  children,
  d,
}: {
  icon: IconType;
  label: string;
  children: ReactNode;
  d: number;
}) {
  return (
    <li className="rv flex gap-5 border-t border-line py-6 last:border-b" style={{ ["--d" as string]: `${d}ms` }}>
      <span className="flex size-11 shrink-0 items-center justify-center bg-green text-ink">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="label text-muted">{label}</p>
        <div className="mt-2 text-lg">{children}</div>
      </div>
    </li>
  );
}

const linkCls = "font-semibold underline decoration-green decoration-2 underline-offset-[5px] hover:decoration-fg";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in touch."
        intro={"Questions about membership, pricing or a property? We’re happy to help."}
      />

      {/* Details + map */}
      <section className="relative bg-bg py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <InView as="ul" className="lg:col-span-5">
            <Row icon={Phone} label="Phone" d={0}>
              <a href={site.phoneHref} className="font-display text-2xl font-extrabold hover:text-muted">
                {site.phone}
              </a>
            </Row>
            <Row icon={Mail} label="Email" d={80}>
              <a href={site.emailHref} className={`${linkCls} break-all`}>
                {site.email}
              </a>
            </Row>
            <Row icon={MapPin} label="Office" d={160}>
              <p>{site.address}</p>
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={`${linkCls} mt-2 inline-block text-base`}>
                Get directions<span className="sr-only"> (opens Google Maps)</span>
              </a>
            </Row>
            <Row icon={MapIcon} label="Service area" d={240}>
              <p>
                Sevier County, including the City of Sevierville, City of Pigeon Forge and City of
                Gatlinburg, and the surrounding areas.
              </p>
            </Row>
          </InView>

          <InView className="lg:col-span-7" threshold={0.15}>
            {/* Double frame, like the logo */}
            <div className="h-full border-[1.5px] border-line-strong p-1.5">
              <div className="relative h-full min-h-[22rem] overflow-hidden border-2 border-green bg-bg-alt">
                <iframe
                  title="Map of our office at 318 Cherry St., Sevierville, TN"
                  src="https://www.google.com/maps?q=318%20Cherry%20St%2C%20Sevierville%2C%20TN%2037862&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map absolute inset-0 size-full"
                />
                <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 bg-ink py-2.5 pr-4 pl-3 text-white shadow-lg">
                  <MapPin className="size-5 text-green" />
                  <span className="font-display text-sm font-bold">{site.addressLines[0]}</span>
                </div>
              </div>
            </div>
          </InView>
        </Container>
      </section>

      {/* Form + register prompt */}
      <section className="grain relative bg-bg-alt py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="relative bg-surface p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)] sm:p-10 lg:p-12">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-green" />
              <h2 className="mb-8 font-display text-2xl font-extrabold uppercase">Send a message</h2>
              <ContactForm />
            </div>
          </div>

          <InView as="aside" className="lg:col-span-4">
            <div className="rv relative overflow-hidden bg-green p-8 text-ink lg:p-10">
              <p className="label text-ink/70">Register</p>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 bg-ink" />
              <p className="relative mt-6 font-display text-[1.7rem] leading-[1.1] font-extrabold uppercase">
                Ready to sign up?
              </p>
              <p className="relative mt-4 text-lg leading-relaxed text-ink/80">
                Skip the wait and register your property now.
              </p>
              <div className="relative mt-8">
                <Button href="/register" variant="ink" arrow>
                  Register Now
                </Button>
              </div>
            </div>
            <div className="rv mt-8 px-1" style={{ ["--d" as string]: "120ms" }}>
              <ArrowLink href="/pricing">See pricing</ArrowLink>
            </div>
          </InView>
        </Container>
      </section>
    </>
  );
}
