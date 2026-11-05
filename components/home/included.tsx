import Image from "next/image";
import { PeakMark, Ridges } from "@/components/brand";
import { InView, Tilt } from "@/components/motion";
import { Container, Label } from "@/components/ui";
import logoWhite from "@/public/brand/logo-white.png";

const features = [
  { title: "Two inspections a year", text: "Thorough structural checks every six months." },
  { title: "Detailed digital reports", text: "Easy-to-read reports for every property." },
  {
    // TODO: remove "stored in your online portal" if the portal isn't live at launch.
    title: "Photo history",
    text: "A photo record of your property over time, stored in your online portal.",
  },
  {
    title: "Engineering review",
    text: "Your first inspection and any concerns reviewed by engineers.",
  },
  { title: "Priority scheduling", text: "Members get first access to scheduling and support." },
  { title: "Member pricing on repairs", text: "Save when something does need work." },
];

/* The membership as a physical card, styled after the business card front. */
function MemberCard() {
  return (
    <div className="float mx-auto w-full max-w-[30rem] lg:mx-0">
      <Tilt className="group">
        <div
          data-theme="dark"
          aria-hidden="true"
          className="grain relative aspect-[1.75] overflow-hidden bg-ink-2 shadow-[10px_10px_0_0_var(--color-green),0_40px_70px_-25px_rgb(0_0_0/0.55)]"
        >
          <Ridges className="absolute inset-x-0 bottom-0 h-[55%] w-full" />
          <Image
            src={logoWhite}
            alt=""
            sizes="320px"
            className="absolute top-[16%] left-[9%] w-[64%]"
          />
          <div className="absolute bottom-[12%] left-[9%]">
            <p className="label text-[0.62rem] text-white/80">Structural membership</p>
            <p className="mt-1.5 font-display text-sm font-bold text-white">
              2 inspections / year <span className="text-green">&middot;</span> Engineer-reviewed
            </p>
          </div>
          <PeakMark className="absolute right-[7%] bottom-[11%] w-[11%] text-green" />
          {/* Glare that follows the pointer */}
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--gx,30%)_var(--gy,20%),rgb(255_255_255/0.16),transparent_55%)] opacity-60 transition-opacity group-hover:opacity-100" />
        </div>
      </Tilt>
    </div>
  );
}

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
          <div className="rv rv-s mt-12" style={{ ["--d" as string]: "200ms" }}>
            <MemberCard />
          </div>
        </InView>

        <InView className="lg:col-span-7 lg:pt-4" threshold={0.1}>
          <p className="rv label text-muted">Every membership includes:</p>
          <ul className="mt-6">
            {features.map((f, i) => (
              <li
                key={f.title}
                className="rv group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-t border-line py-7 last:border-b sm:gap-7"
                style={{ ["--d" as string]: `${120 + i * 110}ms` }}
              >
                <span className="relative flex size-11 items-center justify-center bg-green text-ink transition-transform duration-500 group-hover:-rotate-6">
                  <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                      className="draw"
                      style={{ ["--d" as string]: `${400 + i * 110}ms` }}
                    />
                  </svg>
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
