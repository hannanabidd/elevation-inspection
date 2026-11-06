import type { CSSProperties } from "react";
import {
  CalendarCheck,
  Camera,
  HardHat,
  Lightning,
  Report,
  Tag,
  type IconType,
} from "@/components/icons";
import { InView } from "@/components/motion";
import { Container } from "@/components/ui";

const features: { icon: IconType; title: string; text: string }[] = [
  { icon: CalendarCheck, title: "Two inspections a year", text: "Thorough structural checks every six months." },
  { icon: Report, title: "Detailed digital reports", text: "Easy-to-read reports for every property." },
  {
    // TODO: remove "stored in your online portal" if the portal isn't live at launch.
    icon: Camera,
    title: "Photo history",
    text: "A photo record of your property over time, stored in your online portal.",
  },
  { icon: HardHat, title: "Engineering review", text: "Your first inspection and any concerns reviewed by engineers." },
  { icon: Lightning, title: "Priority scheduling", text: "Members get first access to scheduling and support." },
  { icon: Tag, title: "Member pricing on repairs", text: "Save when something does need work." },
];

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/* Copy doc section 5. */
export function Included() {
  return (
    <section className="bg-bg py-20 lg:py-28">
      <Container>
        <InView className="max-w-3xl">
          <h2 className="rv text-[clamp(2rem,4vw,3.2rem)] leading-[1.04] font-extrabold tracking-[-0.02em] uppercase">
            Protect your investment. Protect your reviews.
          </h2>
          <p className="rv mt-4 text-lg text-muted" style={d(80)}>
            Every membership includes:
          </p>
        </InView>
        <InView as="ul" className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rv flex gap-4" style={d(i * 70)}>
              <span className="flex size-11 shrink-0 items-center justify-center bg-green text-ink">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold uppercase">{title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </InView>
        <p className="mt-12 text-muted">
          Also available: preventive maintenance with TrueDeck and volume discounts for multiple
          properties.
        </p>
      </Container>
    </section>
  );
}
