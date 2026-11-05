import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { PeakMark, Ridges } from "./brand";
import { Phone } from "./icons";
import { InView } from "./motion";
import { Button, Container } from "./ui";

/*
  Closing call to action on every page, laid out like the back of the business card:
  a darker diagonal panel with a green stripe and a giant peak, and an italic heading
  whose last words are green (pass them as `accent`).
*/
export function CtaBand({
  lead,
  accent,
  text,
  secondary = "call",
}: {
  lead: ReactNode;
  accent: ReactNode;
  text?: ReactNode;
  secondary?: "call" | "contact";
}) {
  return (
    <section data-theme="dark" className="grain relative overflow-hidden bg-ink-3 py-28 text-fg lg:py-40">
      <Ridges className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full" />

      <InView className="pointer-events-none absolute inset-y-0 left-0 hidden w-[44%] lg:block" threshold={0.2}>
        <div
          aria-hidden="true"
          className="rv rv-l absolute inset-0 translate-x-5 bg-green [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)]"
        />
        <div
          aria-hidden="true"
          className="rv rv-l grain absolute inset-0 bg-ink [clip-path:polygon(0_0,100%_0,58%_100%,0_100%)]"
          style={{ ["--d" as string]: "100ms" }}
        />
        <PeakMark
          className="rv absolute bottom-[-3%] left-[14%] w-[46%] text-green"
          style={{ ["--d" as string]: "450ms" }}
        />
      </InView>

      <Container className="relative">
        <InView className="lg:ml-[46%]">
          <PeakMark className="pop mb-8 w-12 text-green lg:hidden" />
          <h2 className="rv text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[1] font-medium tracking-[-0.025em] italic">
            {lead} <span className="font-extrabold text-green">{accent}</span>
          </h2>
          {text && (
            <div className="rv mt-6 flex items-center gap-4" style={{ ["--d" as string]: "100ms" }}>
              <span aria-hidden="true" className="h-[3px] w-14 shrink-0 bg-green" />
              <p className="max-w-lg text-lg leading-relaxed text-muted">{text}</p>
            </div>
          )}
          <div className="rv mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "200ms" }}>
            <Button href="/register" arrow>
              Register Now
            </Button>
            {secondary === "call" ? (
              <Button href={site.phoneHref} variant="outline">
                <Phone className="size-4" />
                Call {site.phone}
              </Button>
            ) : (
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            )}
          </div>
        </InView>
      </Container>
    </section>
  );
}
