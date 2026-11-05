import { PeakMark } from "@/components/brand";
import { InView } from "@/components/motion";
import { ArrowLink, Button, Label } from "@/components/ui";

/* Split band: property managers on the left, a green pricing panel cut on the diagonal. */
export function ManagersAndPricing() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <InView className="grain relative bg-bg-alt px-4 py-20 sm:px-6 lg:py-28 lg:pr-24 lg:pl-10">
          <div className="max-w-[34rem] lg:ml-auto">
            <div className="rv">
              <Label>For property managers</Label>
            </div>
            <h2
              className="rv text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.04] font-extrabold tracking-[-0.02em] uppercase"
              style={{ ["--d" as string]: "80ms" }}
            >
              Manage rentals for owners?
            </h2>
            <p
              className="rv mt-6 text-lg leading-relaxed text-muted"
              style={{ ["--d" as string]: "160ms" }}
            >
              Recommend Elevation Inspections to the owners you work with. Regular structural
              inspections protect the owner, the guests and your company.
            </p>
            <div className="rv mt-9" style={{ ["--d" as string]: "240ms" }}>
              <ArrowLink href="/contact">Talk to us about referrals</ArrowLink>
            </div>
          </div>
        </InView>

        <InView className="relative bg-green px-4 py-20 text-ink max-lg:[clip-path:polygon(0_6%,100%_0,100%_100%,0_100%)] max-lg:-mt-8 max-lg:pt-28 sm:px-6 lg:-ml-[9%] lg:py-28 lg:pr-10 lg:pl-[17%] lg:[clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]">
          <PeakMark
            className="pointer-events-none absolute -right-[6%] -bottom-[14%] w-[52%] text-ink/[0.07]"
          />
          <div className="relative max-w-[34rem]">
            <div className="rv">
              <div className="mb-6">
                <p className="label text-ink/70">Pricing</p>
                <span aria-hidden="true" className="mt-3 block h-[3px] w-16 bg-ink" />
              </div>
            </div>
            <h2
              className="rv text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.04] font-extrabold tracking-[-0.02em] uppercase"
              style={{ ["--d" as string]: "80ms" }}
            >
              Simple pricing based on your home&rsquo;s size.
            </h2>
            <p
              className="rv mt-6 text-lg leading-relaxed text-ink/80"
              style={{ ["--d" as string]: "160ms" }}
            >
              One membership, two inspections a year. Your price depends on your home&rsquo;s
              square footage.
            </p>
            <div className="rv mt-9" style={{ ["--d" as string]: "240ms" }}>
              <Button href="/pricing" variant="ink" arrow>
                See Pricing
              </Button>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
