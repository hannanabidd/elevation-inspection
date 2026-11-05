import type { Metadata } from "next";
import Image from "next/image";
import { Ridges } from "@/components/brand";
import { CheckCircle, ClipboardText, HardHat, HouseLine, UsersThree } from "@/components/icons";
import { Timeline } from "@/components/about/timeline";
import { CtaBand } from "@/components/cta-band";
import { InView } from "@/components/motion";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Container, Label } from "@/components/ui";
import { pending, site } from "@/lib/site";
import logoWhite from "@/public/brand/logo-white.png";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why we started Elevation Inspections, and how our sister company Elevation Engineering & Design backs every membership with a team of engineers.",
};

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="We were tired of being the bad guys."
        intro={
          <p className="font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-snug font-medium text-fg italic">
            So we started catching problems <span className="hl font-extrabold not-italic">early.</span>
          </p>
        }
      />

      {/* Our story */}
      <section className="relative bg-bg py-20 lg:py-28">
        <Container>
          <InView className="grid gap-2 lg:grid-cols-12 lg:gap-10">
            <div className="rv lg:col-span-3">
              <Label>Our story</Label>
            </div>
            <p
              className="rv font-display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.35] font-medium lg:col-span-9"
              style={d(80)}
            >
              For years, our engineering team at {site.sisterCompany} got the call after something
              had already gone wrong. A home inspection would flag a cracked foundation, sagging
              framing or a failing deck. By the time we were brought in, the problem was{" "}
              <span className="hl-v">expensive and extensive.</span>
            </p>
          </InView>

          <div className="mt-16 lg:mt-24">
            <Timeline />
          </div>

          <InView className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12">
            <blockquote className="rv lg:col-span-5">
              <span aria-hidden="true" className="block h-1 w-16 bg-green" />
              <p className="mt-6 font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.15] font-semibold italic">
                Problems that cost very little to fix when someone catches them early.
              </p>
            </blockquote>
            <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
              <p className="rv" style={d(100)}>
                We were always the ones delivering the bad news. The hardest part? Most of it started
                small: clogged gutters, downspouts dumping water at the foundation, poor drainage, a
                few missing bolts. Problems that cost very little to fix when someone catches them
                early.
              </p>
              <p className="rv text-fg" style={d(180)}>
                So we started Elevation Inspections to be there{" "}
                <strong className="font-bold">before the damage, not after it.</strong> Two
                inspections a year, a team of engineers behind every one, and clear answers instead of
                bad news.
              </p>
            </div>
          </InView>
        </Container>
      </section>

      {/* Partnership */}
      <section data-theme="dark" className="grain relative overflow-hidden bg-ink py-20 text-fg lg:py-28">
        <div
          aria-hidden="true"
          className="blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]"
        />
        <Container className="relative grid gap-14 lg:grid-cols-12 lg:gap-12">
          <InView className="lg:col-span-6">
            <div className="rv">
              <Label>Partnership</Label>
            </div>
            <h2
              className="rv text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.02em] uppercase"
              style={d(80)}
            >
              Our partnership with <span className="text-green">{site.sisterCompany}</span>
            </h2>
            <p className="rv mt-7 text-lg leading-relaxed text-muted" style={d(160)}>
              Elevation Inspections is not an engineering firm, but we&rsquo;re backed by one. Our
              sister company, {site.sisterCompany}, provides a team of engineers who:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "review your first inspection, and",
                "take a closer look at anything that needs attention in future inspections.",
              ].map((t, i) => (
                <li key={t} className="rv flex items-start gap-4 text-lg" style={d(240 + i * 100)}>
                  <span aria-hidden="true" className="mt-2.5 block size-2.5 shrink-0 rotate-45 bg-green" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="rv mt-9" style={d(440)}>
              {pending.engineeringUrl ? (
                <ArrowLink href={pending.engineeringUrl}>Visit {site.sisterCompany}</ArrowLink>
              ) : (
                // TODO: Elevation Engineering & Design website link (and logo) from Rebekah.
                <p className="font-display text-[0.8rem] font-bold tracking-[0.16em] text-muted uppercase">
                  Visit {site.sisterCompany} <span className="normal-case">[website link to come]</span>
                </p>
              )}
            </div>
          </InView>

          {/* Who's on your team */}
          <InView className="relative lg:col-span-6" threshold={0.3}>
            <div className="relative grid gap-4">
              <div className="rv rv-r chamfer-lg relative bg-ink-3 p-7">
                <ClipboardText className="absolute top-7 right-7 size-7 text-green" />
                <p className="label text-muted">Inspects</p>
                <Image src={logoWhite} alt="Elevation Inspections" sizes="220px" className="mt-4 h-12 w-auto" />
                <p className="mt-4 text-muted">Two inspections a year, every six months.</p>
              </div>
              <div aria-hidden="true" className="rv flex justify-center" style={d(200)}>
                <span className="flex h-10 w-1 bg-green" />
              </div>
              <div className="rv rv-r chamfer-lg relative bg-ink-3 p-7" style={d(300)}>
                <HardHat className="absolute top-7 right-7 size-7 text-green" />
                <p className="label text-muted">Reviews</p>
                {/* TODO: swap for the Elevation Engineering & Design logo when it arrives */}
                <p className="mt-4 font-display text-2xl font-extrabold uppercase">{site.sisterCompany}</p>
                <p className="mt-2 text-muted">Engineers on your first inspection and anything that needs a closer look.</p>
              </div>
              <div aria-hidden="true" className="rv flex justify-center" style={d(500)}>
                <span className="flex h-10 w-1 bg-green" />
              </div>
              <div className="rv rv-s relative flex items-center gap-5 bg-green p-7 text-ink" style={d(600)}>
                <CheckCircle className="size-10 shrink-0" />
                <div>
                  <p className="label text-ink/70">You get</p>
                  <p className="mt-1 font-display text-xl font-extrabold uppercase">Clear answers, not a referral</p>
                </div>
              </div>
            </div>
          </InView>

          <InView className="lg:col-span-12">
            <p className="rv max-w-4xl border-t border-line pt-10 font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.2] font-semibold">
              So you&rsquo;ll never get a report that just says &ldquo;you need to consult a
              professional.&rdquo;{" "}
              <span className="text-green">The professionals are already on your team.</span>
            </p>
          </InView>
        </Container>
      </section>

      {/* Who we serve */}
      <section className="grain relative overflow-hidden bg-bg-alt py-20 lg:py-28">
        <Ridges className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full" />
        <Container className="relative">
          <InView>
            <div className="rv">
              <Label>Who we serve</Label>
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: HouseLine,
                  title: "Short-term rental owners",
                  text: "in Sevier County, including Sevierville, Pigeon Forge and Gatlinburg, plus the surrounding areas.",
                  link: { href: "/register", label: "Register your property" },
                },
                {
                  icon: UsersThree,
                  title: "Property maintenance and management companies",
                  text: "who want the owners they work with to be protected.",
                  link: { href: "/contact", label: "Talk to us about referrals" },
                },
              ].map(({ icon: Icon, ...c }, i) => (
                <div
                  key={c.title}
                  className="rv chamfer-lg relative flex flex-col bg-surface p-8 sm:p-10"
                  style={d(120 + i * 140)}
                >
                  <span className="flex size-14 items-center justify-center bg-green text-ink">
                    <Icon className="size-7" />
                  </span>
                  <p className="mt-6 font-display text-[1.7rem] leading-tight font-extrabold uppercase">{c.title}</p>
                  <p className="mt-3 flex-1 text-lg leading-relaxed text-muted">{c.text}</p>
                  <div className="mt-8">
                    <ArrowLink href={c.link.href}>{c.link.label}</ArrowLink>
                  </div>
                </div>
              ))}
            </div>
          </InView>
        </Container>
      </section>

      <CtaBand lead={"Let’s catch it"} accent="early." secondary="contact" />
    </>
  );
}
