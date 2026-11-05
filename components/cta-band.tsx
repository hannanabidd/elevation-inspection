import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { PeakMark, Ridges } from "./brand";
import { Phone } from "./icons";
import { InView } from "./motion";
import { Button, Container } from "./ui";

/*
  Closing call to action on every page: a compact take on the back of the business card.
  Narrow dark diagonal panel with a green stripe and the peak on the left, then an italic
  heading whose last words are green (pass them as `accent`).
*/
export function CtaBand({
  lead,
  accent,
  text,
  secondary = "call",
  panel = true,
}: {
  lead: ReactNode;
  accent: ReactNode;
  text?: ReactNode;
  secondary?: "call" | "contact";
  /* false = no diagonal panel or peak (the home page already opens with them) */
  panel?: boolean;
}) {
  return (
    <section data-theme="dark" className="grain relative overflow-hidden bg-ink-3 text-fg">
      <Ridges className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-80 lg:h-28" />

      {panel && (
        <InView className="pointer-events-none absolute inset-y-0 left-0 hidden w-[30%] lg:block" threshold={0.2}>
          <div
            aria-hidden="true"
            className="rv rv-l absolute inset-0 translate-x-4 bg-green [clip-path:polygon(0_0,100%_0,64%_100%,0_100%)]"
          />
          <div
            aria-hidden="true"
            className="rv rv-l grain absolute inset-0 bg-ink [clip-path:polygon(0_0,100%_0,64%_100%,0_100%)]"
            style={{ ["--d" as string]: "100ms" }}
          />
          <PeakMark
            className="rv absolute bottom-[-4%] left-[16%] h-[78%] w-auto text-green"
            style={{ ["--d" as string]: "400ms" }}
          />
        </InView>
      )}

      <Container className="relative">
        <InView className={`py-14 sm:py-16 lg:py-20 ${panel ? "lg:ml-[30%]" : ""}`}>
          <h2 className="rv max-w-3xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.04] font-medium tracking-[-0.02em] italic">
            {lead} <span className="font-extrabold text-green">{accent}</span>
          </h2>
          {text && (
            <p
              className="rv mt-4 max-w-xl text-lg leading-relaxed text-muted"
              style={{ ["--d" as string]: "80ms" }}
            >
              {text}
            </p>
          )}
          <div className="rv mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "160ms" }}>
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
