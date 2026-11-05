import { CtaBand } from "@/components/cta-band";
import { Banner } from "@/components/home/banner";
import { DeckStory } from "@/components/home/deck-story";
import { Engineers } from "@/components/home/engineers";
import { HowItWorks } from "@/components/home/how-it-works";
import { Included } from "@/components/home/included";
import { ManagersAndPricing } from "@/components/home/managers-pricing";
import { RealStory } from "@/components/home/real-story";
import { SmallProblems } from "@/components/home/small-problems";
import { Ticker } from "@/components/home/ticker";

export default function Home() {
  return (
    <>
      <Banner />
      <Ticker />
      <DeckStory />
      <RealStory />
      <SmallProblems />
      <HowItWorks />
      <Engineers />
      <Included />
      <ManagersAndPricing />
      {/* The tagline now opens the page, so the close uses the copy doc's "Catch it early, fix it small." */}
      <CtaBand
        lead="Catch it early,"
        accent="fix it small."
        text="Register today and our team will reach out to get you set up."
        panel={false}
      />
    </>
  );
}
