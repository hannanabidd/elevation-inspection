import { PeakMark, Ridges } from "@/components/brand";
import { Phone } from "@/components/icons";
import { InView } from "@/components/motion";
import { Button, Container } from "@/components/ui";
import { site } from "@/lib/site";

/*
  The back of the business card, at full width: a darker diagonal panel with a green
  stripe and a giant peak breaking out, and the tagline in italic with "Knowing." in green.
*/
export function FinalCta() {
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
            The Difference is{" "}
            <span className="font-extrabold text-green">Knowing.</span>
          </h2>
          <div className="rv mt-6 flex items-center gap-4" style={{ ["--d" as string]: "100ms" }}>
            <span aria-hidden="true" className="h-[3px] w-14 bg-green" />
            <p className="max-w-lg text-lg leading-relaxed text-muted">
              Catch it early, fix it small. Register today and our team will reach out to get you
              set up.
            </p>
          </div>
          <div
            className="rv mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ ["--d" as string]: "200ms" }}
          >
            <Button href="/register" arrow>
              Register Now
            </Button>
            <Button href={site.phoneHref} variant="outline">
              <Phone className="size-4" />
              Call {site.phone}
            </Button>
          </div>
        </InView>
      </Container>
    </section>
  );
}
