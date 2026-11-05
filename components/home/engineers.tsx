import { InView } from "@/components/motion";
import { ArrowLink, Container, Label } from "@/components/ui";
import { site } from "@/lib/site";

/* Always dark: engineering grid, with the usual report line struck out. */
export function Engineers() {
  return (
    <section data-theme="dark" className="grain relative overflow-hidden bg-ink py-24 text-fg lg:py-32">
      <div
        aria-hidden="true"
        className="blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_75%)]"
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <InView className="lg:col-span-6">
          <div className="rv">
            <Label>{site.sisterCompany}</Label>
          </div>
          <h2
            className="rv text-[clamp(2.3rem,5.4vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.025em] uppercase"
            style={{ ["--d" as string]: "80ms" }}
          >
            Backed by <span className="text-green">engineers</span>, not just inspectors.
          </h2>
          <p
            className="rv mt-8 max-w-xl text-lg leading-relaxed text-muted"
            style={{ ["--d" as string]: "160ms" }}
          >
            Elevation Inspections is supported by the engineering team at our sister company,{" "}
            {site.sisterCompany}. They review your first inspection and anything that needs more
            attention after that, so you get real answers instead of a referral.
          </p>
          <div className="rv mt-9" style={{ ["--d" as string]: "240ms" }}>
            <ArrowLink href="/about">Learn why we started</ArrowLink>
          </div>
        </InView>

        <InView className="relative lg:col-span-6" threshold={0.35}>
          <p className="rv label text-muted">Most inspection reports end with</p>

          {/* A generic report page */}
          <div
            className="rv rv-s chamfer-lg relative mt-5 rotate-[1.5deg] bg-white p-7 text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] sm:p-9"
            style={{ ["--d" as string]: "120ms" }}
          >
            <div className="flex items-center justify-between border-b border-ink/15 pb-4">
              <span className="label text-ink/60">Inspection report</span>
              <span className="label text-ink/40">Summary</span>
            </div>
            <div aria-hidden="true" className="mt-6 space-y-3">
              <span className="block h-2.5 w-[92%] bg-ink/10" />
              <span className="block h-2.5 w-[78%] bg-ink/10" />
              <span className="block h-2.5 w-[85%] bg-ink/10" />
              <span className="block h-2.5 w-[60%] bg-ink/10" />
            </div>
            <p className="mt-7 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug font-bold">
              <span className="strike">&ldquo;&hellip;we recommend you consult a structural engineer.&rdquo;</span>
            </p>
          </div>

          <p
            className="rv mt-10 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-extrabold tracking-[-0.02em] uppercase"
            style={{ ["--d" as string]: "1300ms" }}
          >
            Ours <span className="bg-green px-[0.1em] text-ink">don&rsquo;t.</span>
          </p>
        </InView>
      </Container>
    </section>
  );
}
