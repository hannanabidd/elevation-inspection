import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { Check, Phone } from "@/components/icons";
import { InView } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Button, Container } from "@/components/ui";
import { ADMIN_CHARGE_MIN, PLAN_ADMIN_FEE } from "@/lib/pricing";
import { site } from "@/lib/site";

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

/*
  Pricing as Rebekah described it, and terms from the Inspection Agreement (section numbers in
  the comments). There's no public price list: each home is priced by its square footage, and
  the team gives the exact price after registration.
  TODO: the startup deposit comes from Rebekah's notes; it isn't in the agreement yet.
*/
const payment = [
  {
    title: "Startup deposit",
    text: "Equal to one year’s membership. Paid once, when you join.",
  },
  {
    title: "First year",
    text: "Paid upfront when you sign your agreement.",
  },
  {
    title: "Payment plan",
    // Agreement 4.a.ii: monthly is offered for renewal years.
    text: `From your second year, pay monthly if you prefer: the yearly amount over 12 months, plus a $${PLAN_ADMIN_FEE} monthly administration fee.`,
  },
];

const adminCharge = `$${ADMIN_CHARGE_MIN} or one-twelfth of your yearly fee, whichever is greater`;

const faqs = [
  {
    q: "How much does a membership cost?",
    a: "It depends on your home’s square footage. Register or give us a call, and we’ll confirm your home’s size and give you your exact price.",
  },
  {
    q: "How do you measure square footage?",
    // TODO: confirm with Rebekah (copy doc gives this as the suggested answer).
    a: "We use the home’s living space. Not sure of the number? Give us your best estimate and we’ll confirm it with you.",
  },
  {
    // Agreement 1, 5.b, 5.f
    q: "What do your inspections cover?",
    a: "The visible and accessible structural parts of your home, which we list at your first inspection and check against the building code for your type of home. Cosmetic issues aren’t covered, and a membership isn’t insurance or a warranty.",
  },
  {
    // Agreement 4.a.i, 4.b
    q: "When do I pay?",
    a: "Nothing is due when you register. When you sign your inspection agreement, you’ll pay a one-time startup deposit equal to one year’s membership, plus your first year. You can pay by card, ACH bank transfer or check (if you pay by check, inspections start once it clears). A processing fee may apply depending on how you pay.",
  },
  {
    // Agreement 4.a.ii
    q: "Is there a payment plan?",
    a: `Yes, from your second year on. You can pay the yearly amount in 12 monthly payments, plus a $${PLAN_ADMIN_FEE} monthly administration fee. Monthly payments are made by card or ACH.`,
  },
  {
    // Agreement 2
    q: "What happens if an inspection finds a problem?",
    a: "Our engineering team reviews your first inspection report, and any later report that shows changes. If they find a structural issue, they’ll evaluate it on site and send you a written report with recommended repairs. We’ll then help you choose a contractor, review the bids with you and re-inspect after the work, at no extra cost. We don’t do repairs ourselves, so you hire and pay the contractor.",
  },
  {
    // Agreement 6
    q: "What if something happens between inspections?",
    a: "Let us know. If a storm, flood, fire, landslide or collision damages your home, or it’s shut down after a failed short-term rental inspection, we aim to inspect within 2 business days (it can take longer after a widespread event). You can also ask for an inspection before adding something heavy, like a hot tub or stone fireplace on a deck. These special inspections are billed at our standard hourly rates, minus a member credit.",
  },
  {
    // Agreement 3.b, 3.c
    q: "Does my membership renew automatically?",
    a: "Yes. Your membership runs for one year and renews on each anniversary. If the price or terms are changing, we’ll let you know at least 60 days before. If you don’t want to renew, tell us in writing at least 30 days before your renewal date.",
  },
  {
    // Agreement 3.d
    q: "Can I cancel?",
    a: `Yes, any time, by letting us know in writing. If you cancel within the first 30 days of a membership year and no inspection has been done that year, we refund that year’s fee minus an administrative charge. If an inspection has been done, we refund half the fee, minus the administrative charge. After the first 30 days, there’s no refund for that year. The administrative charge is ${adminCharge}.`,
  },
  {
    // Agreement 14 (Rebekah's note said a flat $100; the agreement's charge is used here)
    q: "What happens if I sell the home?",
    a: `Your membership can be transferred to the new owner. Let us know, pay the administrative charge (${adminCharge}), and the new owner signs an agreement with us.`,
  },
  {
    q: "Do you cover my area?",
    a: "We serve Sevier County, including Sevierville, Pigeon Forge and Gatlinburg, plus the surrounding areas.",
  },
];

const heading = "text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.02em] uppercase";
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export default function PricingPage() {
  return (
    <>
      <PageHero
        title={<>Simple pricing, based on your home&rsquo;s size.</>}
        intro="One membership. Two inspections a year. Your price depends on the square footage of the home."
      />

      {/* Your price + how payment works */}
      <section className="bg-bg py-16 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <InView className="lg:col-span-6 lg:pt-4">
            <h2 className={`rv ${heading}`}>Get your exact price</h2>
            <p className="rv mt-6 text-lg leading-relaxed text-muted" style={d(60)}>
              Every membership is priced by the home&rsquo;s square footage. Register (it takes
              about two minutes) and our team will confirm your home&rsquo;s size and give you your
              exact price.
            </p>
            <p className="rv mt-4 text-lg leading-relaxed text-muted" style={d(120)}>
              Not sure of your square footage? Give us your best estimate and we&rsquo;ll confirm it
              with you.
            </p>
            <div className="rv mt-8 flex flex-col gap-3 sm:flex-row" style={d(180)}>
              <Button href="/register" arrow>
                Register Now
              </Button>
              <Button href={site.phoneHref} variant="outline">
                <Phone className="size-4" />
                Call {site.phone}
              </Button>
            </div>
            <p className="rv mt-4 text-sm text-muted" style={d(220)}>
              No payment is needed to register.
            </p>
          </InView>

          <div data-theme="dark" className="grain relative bg-ink text-fg lg:col-span-6">
            {/* Green edge, like the business card */}
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-green" />
            <InView className="px-6 py-8 sm:px-10 sm:py-10">
              <h2 className="rv font-display text-xl font-extrabold uppercase">How payment works</h2>
              <ol className="mt-7 space-y-7">
                {payment.map((item, i) => (
                  <li key={item.title} className="rv flex gap-5" style={d(80 + i * 90)}>
                    <span className="flex size-10 shrink-0 items-center justify-center bg-ink-3 font-display text-sm font-extrabold text-green">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-tight font-extrabold uppercase">{item.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="rv mt-8 border-t border-line pt-6 leading-relaxed text-muted" style={d(380)}>
                Pay by card, ACH bank transfer or check. Your membership renews each year, and you
                can cancel any time.
              </p>
            </InView>
          </div>
        </Container>
      </section>

      {/* Every membership includes + extras */}
      <section className="bg-bg-alt py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <InView className="lg:col-span-7">
            <h2 className={`rv ${heading}`}>Every membership includes</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {includes.map((item, i) => (
                <li key={item} className="rv flex items-start gap-3 text-lg" style={d(i * 60)}>
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
            <p className="mt-8 text-sm text-muted">
              These answers are a summary. Your inspection agreement has the full terms.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand lead="Ready to protect your" accent="rental?" photo="drainage" />
    </>
  );
}
