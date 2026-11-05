import type { CSSProperties, ReactNode } from "react";
import { Ridges } from "./brand";
import { Container, Label } from "./ui";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/* Inner-page header: big title on the left, the business card's dark slash on the right. */
export function PageHero({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-line bg-bg">
      <Ridges className="pointer-events-none absolute right-0 bottom-0 h-[75%] w-[80%] opacity-80" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[24%] lg:block">
        <div
          className="slide-in-r absolute inset-0 -translate-x-4 bg-green [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]"
          style={d(150)}
        />
        <div
          className="slide-in-r grain absolute inset-0 bg-ink [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]"
          style={d(260)}
        />
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl lg:max-w-[64%]">
          <div className="load-up" style={d(0)}>
            <Label>{label}</Label>
          </div>
          <h1
            className="load-up text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.025em] uppercase"
            style={d(80)}
          >
            {title}
          </h1>
          {intro && (
            <div
              className="load-up mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
              style={d(180)}
            >
              {intro}
            </div>
          )}
          {children && (
            <div className="load-up mt-9" style={d(260)}>
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
