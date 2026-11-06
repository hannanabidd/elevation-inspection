import type { CSSProperties } from "react";
import { InView } from "@/components/motion";
import { Container } from "@/components/ui";

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

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/* Copy doc section 3: numbered steps joined by a green line. */
export function HowItWorks() {
  return (
    <section className="bg-bg-alt py-20 lg:py-28">
      <Container>
        <InView>
          <h2 className="rv text-[clamp(2rem,4vw,3.2rem)] leading-none font-extrabold tracking-[-0.02em] uppercase">
            How it works
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} className="rv" style={d(i * 110)}>
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center bg-ink font-display text-sm font-extrabold text-green dark:bg-ink-3">
                    0{i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="hidden h-[3px] flex-1 bg-green lg:block" />
                  )}
                </div>
                <h3 className="mt-6 text-xl font-extrabold uppercase">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </InView>
      </Container>
    </section>
  );
}
