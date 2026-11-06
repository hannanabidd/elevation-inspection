import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { HouseLine, UsersThree } from "@/components/icons";
import { Timeline } from "@/components/about/timeline";
import { InView } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Container } from "@/components/ui";
import { pending, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why we started Elevation Inspections, and how our sister company Elevation Engineering & Design backs every membership with a team of engineers.",
};

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });
const heading = "text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.02em] uppercase";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="We were tired of being the bad guys."
        intro={
          <p className="font-display text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug font-medium text-fg italic">
            So we started catching problems early.
          </p>
        }
      />

      {/* Our story */}
      <section className="bg-bg py-16 lg:py-24">
        <Container>
          <InView className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
            <h2 className={`rv mb-8 text-fg ${heading}`}>Our story</h2>
            <p className="rv" style={d(60)}>
              For years, our engineering team at {site.sisterCompany} got the call after something
              had already gone wrong. A home inspection would flag a cracked foundation, sagging
              framing or a failing deck. By the time we were brought in, the problem was expensive
              and extensive.
            </p>
            <p className="rv" style={d(120)}>
              We were always the ones delivering the bad news. The hardest part? Most of it started
              small: clogged gutters, downspouts dumping water at the foundation, poor drainage, a
              few missing bolts. Problems that cost very little to fix when someone catches them
              early.
            </p>
            <p className="rv text-fg" style={d(180)}>
              So we started Elevation Inspections to be there before the damage, not after it. Two
              inspections a year, a team of engineers behind every one, and clear answers instead of
              bad news.
            </p>
          </InView>

          {/* The story in one picture: the green "Now" pin slides from "after the damage" back to "before" */}
          <div className="mt-16 lg:mt-20">
            <Timeline />
          </div>
        </Container>
      </section>

      {/* Partnership */}
      <section data-theme="dark" className="grain relative overflow-hidden bg-ink py-16 text-fg lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <InView className="lg:col-span-5">
            <h2 className={`rv ${heading}`}>
              Our partnership with <span className="text-green">{site.sisterCompany}</span>
            </h2>
          </InView>
          <InView className="text-lg leading-relaxed lg:col-span-7 lg:pt-2">
            <p className="rv text-muted">
              Elevation Inspections is not an engineering firm, but we&rsquo;re backed by one. Our
              sister company, {site.sisterCompany}, provides a team of engineers who:
            </p>
            <ul className="rv mt-5 space-y-2.5" style={d(60)}>
              {[
                "review your first inspection, and",
                "take a closer look at anything that needs attention in future inspections.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2.5 block size-2 shrink-0 rotate-45 bg-green" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="rv mt-6" style={d(120)}>
              So you&rsquo;ll never get a report that just says &ldquo;you need to consult a
              professional.&rdquo; The professionals are already on your team.
            </p>
            <div className="rv mt-8" style={d(180)}>
              {pending.engineeringUrl ? (
                <ArrowLink href={pending.engineeringUrl}>Visit {site.sisterCompany}</ArrowLink>
              ) : (
                // TODO: Elevation Engineering & Design website link from Rebekah.
                <p className="font-display text-[0.8rem] font-bold tracking-[0.16em] text-muted uppercase">
                  Visit {site.sisterCompany} <span className="normal-case">[website link to come]</span>
                </p>
              )}
            </div>
          </InView>
        </Container>
      </section>

      {/* Who we serve */}
      <section className="bg-bg py-16 lg:py-24">
        <Container>
          <InView>
            <h2 className={`rv ${heading}`}>Who we serve</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
              {[
                {
                  icon: HouseLine,
                  title: "Short-term rental owners",
                  text: "in Sevier County, including Sevierville, Pigeon Forge and Gatlinburg, plus the surrounding areas.",
                },
                {
                  icon: UsersThree,
                  title: "Property maintenance and management companies",
                  text: "who want the owners they work with to be protected.",
                },
              ].map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="rv flex gap-5" style={d(i * 100)}>
                  <span className="flex size-12 shrink-0 items-center justify-center bg-green text-ink">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight font-extrabold uppercase">{title}</h3>
                    <p className="mt-2 text-lg leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </InView>
        </Container>
      </section>

      <CtaBand lead={"Let’s catch it"} accent="early." secondary="contact" photo="windowCloseup" />
    </>
  );
}
