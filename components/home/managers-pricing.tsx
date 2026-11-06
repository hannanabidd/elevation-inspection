import { InView } from "@/components/motion";
import { ArrowLink, Button } from "@/components/ui";

const heading = "rv text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-extrabold tracking-[-0.02em] uppercase";

/* Copy doc sections 6 + 7: property managers, then a green pricing panel cut on the diagonal. */
export function ManagersAndPricing() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <InView className="bg-bg-alt px-4 py-20 sm:px-6 lg:py-24 lg:pr-24 lg:pl-10">
          <div className="max-w-[34rem] lg:ml-auto">
            <h2 className={heading}>Manage rentals for owners?</h2>
            <p className="rv mt-5 text-lg leading-relaxed text-muted">
              Recommend Elevation Inspections to the owners you work with. Regular structural
              inspections protect the owner, the guests and your company.
            </p>
            <div className="rv mt-8">
              <ArrowLink href="/contact">Talk to us about referrals</ArrowLink>
            </div>
          </div>
        </InView>

        <InView className="relative bg-green px-4 py-20 text-ink max-lg:-mt-8 max-lg:pt-28 max-lg:[clip-path:polygon(0_6%,100%_0,100%_100%,0_100%)] sm:px-6 lg:-ml-[9%] lg:py-24 lg:pr-10 lg:pl-[17%] lg:[clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]">
          <div className="max-w-[34rem]">
            <h2 className={heading}>Simple pricing based on your home&rsquo;s size.</h2>
            <p className="rv mt-5 text-lg leading-relaxed text-ink/80">
              One membership, two inspections a year. Your price depends on your home&rsquo;s
              square footage.
            </p>
            <div className="rv mt-8">
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
