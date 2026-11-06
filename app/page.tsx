import { CtaBand } from "@/components/cta-band";
import { Banner } from "@/components/home/banner";
import { Engineers } from "@/components/home/engineers";
import { HowItWorks } from "@/components/home/how-it-works";
import { Included } from "@/components/home/included";
import { ManagersAndPricing } from "@/components/home/managers-pricing";
import { Problem } from "@/components/home/problem";

/* Follows the copy doc's section order, pared down to the essentials. */
export default function Home() {
  return (
    <>
      <Banner />
      <Problem />
      <HowItWorks />
      <Engineers />
      <Included />
      <ManagersAndPricing />
      {/* The tagline opens the page, so the close uses the copy doc's "Catch it early, fix it small." */}
      <CtaBand
        lead="Catch it early,"
        accent="fix it small."
        text="Register today and our team will reach out to get you set up."
      />
    </>
  );
}
