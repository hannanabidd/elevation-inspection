import {
  Camera,
  CalendarCheck,
  HardHat,
  Lightning,
  Report,
  Tag,
  type IconType,
} from "@/components/icons";
import { InView } from "@/components/motion";
import { Container, Label } from "@/components/ui";

const features: { icon: IconType; title: string; text: string }[] = [
  { icon: CalendarCheck, title: "Two inspections a year", text: "Thorough structural checks every six months." },
  { icon: Report, title: "Detailed digital reports", text: "Easy-to-read reports for every property." },
  {
    // TODO: remove "stored in your online portal" if the portal isn't live at launch.
    icon: Camera,
    title: "Photo history",
    text: "A photo record of your property over time, stored in your online portal.",
  },
  {
    icon: HardHat,
    title: "Engineering review",
    text: "Your first inspection and any concerns reviewed by engineers.",
  },
  { icon: Lightning, title: "Priority scheduling", text: "Members get first access to scheduling and support." },
  { icon: Tag, title: "Member pricing on repairs", text: "Save when something does need work." },
];

export function Included() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 lg:py-32">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-14">
        <InView className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <div className="rv">
            <Label>Membership</Label>
          </div>
          <h2
            className="rv text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.02] font-extrabold tracking-[-0.02em] uppercase"
            style={{ ["--d" as string]: "80ms" }}
          >
            Protect your investment. Protect your <span className="hl-v">reviews.</span>
          </h2>
        </InView>

        <InView className="lg:col-span-7 lg:pt-4" threshold={0.1}>
          <p className="rv label text-muted">Every membership includes:</p>
          <ul className="mt-6">
            {features.map(({ icon: Icon, ...f }, i) => (
              <li
                key={f.title}
                className="rv group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-t border-line py-7 last:border-b sm:gap-7"
                style={{ ["--d" as string]: `${120 + i * 110}ms` }}
              >
                <span className="relative flex size-12 items-center justify-center bg-green text-ink transition-transform duration-500 group-hover:-rotate-6">
                  <span className="pop" style={{ ["--d" as string]: `${380 + i * 110}ms` }}>
                    <Icon className="size-6" />
                  </span>
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-[0.01em] uppercase sm:text-xl">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-lg leading-relaxed text-muted">{f.text}</p>
                </div>
                <span className="hidden pt-1 font-display text-sm font-bold text-muted tabular-nums sm:block">
                  0{i + 1}
                </span>
              </li>
            ))}
          </ul>
          <p className="rv mt-8 text-muted" style={{ ["--d" as string]: "800ms" }}>
            Also available: preventive maintenance with TrueDeck and volume discounts for multiple
            properties.
          </p>
        </InView>
      </Container>
    </section>
  );
}
