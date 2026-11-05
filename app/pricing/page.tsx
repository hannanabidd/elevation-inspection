import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import {
  Buildings,
  CalendarCheck,
  Camera,
  HardHat,
  Lightning,
  Report,
  Tag,
  Wrench,
  type IconType,
} from "@/components/icons";
import { InView } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { PriceExplorer } from "@/components/pricing/price-explorer";
import { ArrowLink, Container, Label } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple membership pricing for twice-a-year structural inspections, based on your home’s square footage. Serving Sevier County, TN.",
};

const includes: { icon: IconType; text: string }[] = [
  { icon: CalendarCheck, text: "Two structural inspections a year" },
  { icon: HardHat, text: "Engineering review of your first inspection and any concerns" },
  { icon: Report, text: "Detailed digital report after every visit" },
  // TODO: remove "stored in your online portal" if the portal isn't live at launch.
  { icon: Camera, text: "Photo history stored in your online portal" },
  { icon: Lightning, text: "Priority scheduling and support" },
  { icon: Tag, text: "Member pricing on repairs" },
];

const faqs = [
  {
    q: "How do you measure square footage?",
    // TODO: confirm with Rebekah (copy doc gives this as the suggested answer).
    a: "We use the home’s living space. Not sure of the number? Give us your best estimate and we’ll confirm it with you.",
  },
  {
    q: "When do I pay?",
    a: "Nothing is due when you register. Our team will reach out to set up your membership and billing.",
  },
  {
    q: "What happens if an inspection finds a problem?",
    a: "You’ll get a clear report with photos and next steps. Anything that needs a closer look is reviewed by our engineering team, and members get member pricing on repairs.",
  },
  {
    q: "Can I cancel?",
    // TODO: cancellation terms from Rebekah.
    a: "[Confirm cancellation terms with Rebekah.]",
  },
  {
    q: "Do you cover my area?",
    a: "We serve Sevier County, including Sevierville, Pigeon Forge and Gatlinburg, plus the surrounding areas.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title={
          <>
            Simple pricing, based on your home&rsquo;s <span className="hl">size.</span>
          </>
        }
        intro="One membership. Two inspections a year. Your price depends on the square footage of the home."
      />

      {/* Price table */}
      <section className="relative bg-bg py-16 lg:py-24">
        <Container>
          <PriceExplorer />
        </Container>
      </section>

      {/* Every membership includes */}
      <section data-theme="dark" className="grain relative overflow-hidden bg-ink py-20 text-fg lg:py-28">
        <Container className="relative grid gap-12 lg:grid-cols-12">
          <InView className="lg:col-span-4">
            <div className="rv">
              <Label>Membership</Label>
            </div>
            <h2
              className="rv text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-extrabold tracking-[-0.02em] uppercase"
              style={{ ["--d" as string]: "80ms" }}
            >
              Every membership <span className="text-green">includes</span>
            </h2>
          </InView>
          <InView as="ul" className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8" threshold={0.15}>
            {includes.map(({ icon: Icon, text }, i) => (
              <li
                key={text}
                className="rv flex items-start gap-4 border-t border-line py-6"
                style={{ ["--d" as string]: `${120 + i * 90}ms` }}
              >
                <span className="flex size-10 shrink-0 items-center justify-center bg-green text-ink">
                  <span className="pop" style={{ ["--d" as string]: `${330 + i * 90}ms` }}>
                    <Icon className="size-5" />
                  </span>
                </span>
                <span className="pt-1.5 text-lg font-semibold">{text}</span>
              </li>
            ))}
          </InView>
        </Container>
      </section>

      {/* Extras */}
      <section className="grain relative bg-bg-alt py-20 lg:py-24">
        <Container>
          <InView className="grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Buildings,
                q: "Own several rentals?",
                a: "Ask about volume discounts for multiple properties.",
              },
              {
                // TODO: confirm the TrueDeck name and add a link or one-line description.
                icon: Wrench,
                q: "Want more than inspections?",
                a: "Add preventive maintenance with TrueDeck.",
              },
            ].map(({ icon: Icon, ...x }, i) => (
              <div
                key={x.q}
                className="rv chamfer-lg relative bg-surface p-8 sm:p-10"
                style={{ ["--d" as string]: `${i * 120}ms` }}
              >
                <span className="flex size-12 items-center justify-center bg-ink text-green dark:bg-green dark:text-ink">
                  <Icon className="size-6" />
                </span>
                <p className="mt-6 font-display text-2xl font-extrabold uppercase">{x.q}</p>
                <p className="mt-2 text-lg text-muted">{x.a}</p>
              </div>
            ))}
          </InView>
          <div className="mt-10">
            <ArrowLink href="/contact">Contact us</ArrowLink>
          </div>
        </Container>
      </section>

      {/* Common questions */}
      <section className="relative bg-bg py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <InView className="lg:col-span-4">
            <div className="rv">
              <Label>Questions</Label>
            </div>
            <h2
              className="rv text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-extrabold tracking-[-0.02em] uppercase"
              style={{ ["--d" as string]: "80ms" }}
            >
              Common questions
            </h2>
          </InView>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </Container>
      </section>

      <CtaBand lead="Ready to protect your" accent="rental?" />
    </>
  );
}
