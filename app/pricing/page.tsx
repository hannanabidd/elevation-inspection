import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { Check } from "@/components/icons";
import { InView } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { PriceTable } from "@/components/pricing/price-table";
import { ArrowLink, Button, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple membership pricing for twice-a-year structural inspections, based on your home’s square footage. Serving Sevier County, TN.",
};

const includes = [
  "Two structural inspections a year",
  "Engineering review of your first inspection and any concerns",
  "Detailed digital report after every visit",
  // TODO: remove "stored in your online portal" if the portal isn't live at launch.
  "Photo history stored in your online portal",
  "Priority scheduling and support",
  "Member pricing on repairs",
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

const heading = "text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.02em] uppercase";

export default function PricingPage() {
  return (
    <>
      <PageHero
        title={<>Simple pricing, based on your home&rsquo;s size.</>}
        intro="One membership. Two inspections a year. Your price depends on the square footage of the home."
      />

      {/* Price table */}
      <section className="bg-bg py-16 lg:py-24">
        <Container>
          <InView className="rv max-w-4xl">
            <PriceTable />
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-muted">
                Not sure of your square footage? Give us your best estimate and we&rsquo;ll confirm
                it with you.
              </p>
              <Button href="/register" arrow>
                Register Now
              </Button>
            </div>
          </InView>
        </Container>
      </section>

      {/* Every membership includes + extras */}
      <section className="bg-bg-alt py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <InView className="lg:col-span-7">
            <h2 className={`rv ${heading}`}>Every membership includes</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {includes.map((item, i) => (
                <li key={item} className="rv flex items-start gap-3 text-lg" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <Check className="mt-1 size-5 shrink-0 text-fg" />
                  {item}
                </li>
              ))}
            </ul>
          </InView>

          <InView className="space-y-6 lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
            <p className="rv text-lg">
              <strong className="font-display font-extrabold uppercase">Own several rentals?</strong>
              <br />
              <span className="text-muted">Ask about volume discounts for multiple properties.</span>
            </p>
            <p className="rv text-lg">
              {/* TODO: confirm the TrueDeck name and add a link or one-line description. */}
              <strong className="font-display font-extrabold uppercase">Want more than inspections?</strong>
              <br />
              <span className="text-muted">Add preventive maintenance with TrueDeck.</span>
            </p>
            <div className="rv">
              <ArrowLink href="/contact">Contact us</ArrowLink>
            </div>
          </InView>
        </Container>
      </section>

      {/* Common questions */}
      <section className="bg-bg py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <InView className="lg:col-span-4">
            <h2 className={`rv ${heading}`}>Common questions</h2>
          </InView>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </Container>
      </section>

      <CtaBand lead="Ready to protect your" accent="rental?" photo="waterHeater" />
    </>
  );
}
