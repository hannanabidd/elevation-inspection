import type { CSSProperties } from "react";
import { PeakMark } from "@/components/brand";
import { InView } from "@/components/motion";
import { Button, Container, Label } from "@/components/ui";

const steps = [
  {
    title: "Register.",
    text: "Fill out a short form about your property. It takes about two minutes.",
  },
  {
    title: "We set you up.",
    text: "Our team reaches out to confirm your details and start your membership.",
  },
  {
    title: "Two inspections a year.",
    text: "Our inspectors check your property’s structure every six months.",
  },
  {
    title: "Engineer-reviewed results.",
    text: "Our engineering team reviews your first inspection and anything that needs a closer look, so you get clear next steps.",
  },
];

/* Elevation profile: each step sits higher on the ridge (x in 0-1000, y in px). */
const ridge: [number, number][] = [
  [0, 278], [20, 262], [80, 274], [140, 236], [200, 248], [270, 198], [330, 210],
  [390, 168], [450, 180], [520, 134], [580, 146], [640, 102], [700, 114], [770, 64],
  [830, 44], [880, 58], [940, 18], [1000, 34],
];
const waypoints = [ridge[1], ridge[5], ridge[9], ridge[13]];
const line = `M${ridge.map(([x, y]) => `${x} ${y}`).join(" L")}`;
const area = `${line} L1000 330 L0 330 Z`;

const delay = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

export function HowItWorks() {
  return (
    <section className="grain relative overflow-hidden bg-bg py-24 lg:py-32">
      <Container>
        <InView className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="rv">
              <Label>Four steps</Label>
            </div>
            <h2
              className="rv text-[clamp(2.25rem,5vw,4rem)] leading-none font-extrabold tracking-[-0.02em] uppercase"
              style={delay(80)}
            >
              How it works
            </h2>
          </div>
          <div className="rv" style={delay(160)}>
            <Button href="/register" arrow>
              Register Now
            </Button>
          </div>
        </InView>

        {/* Desktop: the climb */}
        <InView className="relative mt-16 hidden h-[480px] lg:block" threshold={0.3}>
          <svg
            viewBox="0 0 1000 330"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[330px] w-full"
          >
            <defs>
              <linearGradient id="ridge-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--fg)" stopOpacity="0.09" />
                <stop offset="1" stopColor="var(--fg)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#ridge-fade)" />
            <path
              d={line}
              className="draw"
              pathLength={1}
              fill="none"
              stroke="var(--color-green)"
              strokeWidth={3}
              strokeLinejoin="round"
            />
          </svg>
          <PeakMark
            className="pop absolute top-[-6px] left-[94%] w-9 -translate-x-1/2 -translate-y-full text-green"
            style={delay(1500)}
          />

          {/* Waypoint markers, positioned on the full-width profile */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[330px]">
            {waypoints.map(([x, y], i) => (
              <span
                key={x}
                className="absolute"
                style={{ left: `${x / 10}%`, top: y }}
              >
                <span
                  className="pop flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-ink font-display text-sm font-extrabold text-green ring-4 ring-bg"
                  style={delay(300 + i * 320)}
                >
                  0{i + 1}
                </span>
              </span>
            ))}
          </div>

          <ol className="relative grid h-full grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <li key={step.title} style={{ paddingTop: waypoints[i][1] + 44 }}>
                <div className="rv" style={delay(450 + i * 320)}>
                  <span className="sr-only">Step {i + 1}: </span>
                  <h3 className="text-xl font-extrabold uppercase">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </InView>

        {/* Mobile / tablet: vertical climb */}
        <InView as="ol" className="relative mt-12 lg:hidden" threshold={0.1}>
          <svg aria-hidden="true" className="absolute top-2 bottom-2 left-[21px] w-[3px]" preserveAspectRatio="none" viewBox="0 0 3 100">
            <path d="M1.5 0 V100" className="draw" pathLength={1} stroke="var(--color-green)" strokeWidth={3} />
          </svg>
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
              <span
                className="pop relative z-10 flex size-11 shrink-0 items-center justify-center bg-ink font-display text-sm font-extrabold text-green"
                style={delay(200 + i * 220)}
              >
                0{i + 1}
              </span>
              <div className="rv pt-1.5" style={delay(260 + i * 220)}>
                <h3 className="text-lg font-extrabold uppercase">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </InView>
      </Container>
    </section>
  );
}
