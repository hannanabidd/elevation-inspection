import { CtaBand } from "@/components/cta-band";
import { Engineers } from "@/components/home/engineers";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Included } from "@/components/home/included";
import { ManagersAndPricing } from "@/components/home/managers-pricing";
import { RealStory } from "@/components/home/real-story";
import { SmallProblems } from "@/components/home/small-problems";
import { Ticker } from "@/components/home/ticker";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <RealStory />
      <SmallProblems />
      <HowItWorks />
      <Engineers />
      <Included />
      <ManagersAndPricing />
      <CtaBand
        lead="The Difference is"
        accent="Knowing."
        text="Catch it early, fix it small. Register today and our team will reach out to get you set up."
      />
    </>
  );
}
