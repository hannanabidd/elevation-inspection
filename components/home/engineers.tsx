import { InView } from "@/components/motion";
import { ArrowLink, Container } from "@/components/ui";
import { site } from "@/lib/site";

/* Copy doc section 4. Always dark: the usual report line gets crossed out. */
export function Engineers() {
  return (
    <section data-theme="dark" className="grain relative overflow-hidden bg-ink py-20 text-fg lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <InView className="lg:col-span-6">
          <h2 className="rv text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.02] font-extrabold tracking-[-0.02em] uppercase">
            Backed by <span className="text-green">engineers</span>, not just inspectors.
          </h2>
          <p className="rv mt-7 max-w-xl text-lg leading-relaxed text-muted" style={{ ["--d" as string]: "80ms" }}>
            Elevation Inspections is supported by the engineering team at our sister company,{" "}
            {site.sisterCompany}. They review your first inspection and anything that needs more
            attention after that, so you get real answers instead of a referral.
          </p>
          <div className="rv mt-8" style={{ ["--d" as string]: "160ms" }}>
            <ArrowLink href="/about">Learn why we started</ArrowLink>
          </div>
        </InView>

        <InView className="lg:col-span-6" threshold={0.4}>
          <p className="rv label text-muted">Most inspection reports end with</p>
          <p className="rv mt-4 border-l-2 border-green pl-5 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-snug font-semibold text-white/60">
            <span className="strike">&ldquo;we recommend you consult a structural engineer.&rdquo;</span>
          </p>
          <p
            className="rv mt-8 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none font-extrabold tracking-[-0.02em] uppercase"
            style={{ ["--d" as string]: "900ms" }}
          >
            Ours <span className="bg-green px-[0.1em] text-ink">don&rsquo;t.</span>
          </p>
        </InView>
      </Container>
    </section>
  );
}
