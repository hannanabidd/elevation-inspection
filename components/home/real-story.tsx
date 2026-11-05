import Image from "next/image";
import { CountUp, InView } from "@/components/motion";
import { Container, Label } from "@/components/ui";
import deckAfter from "@/public/images/deck-after.jpg";

/*
  Laid out like the back of the business card: a dark diagonal panel (here, the photo)
  with a green stripe along its edge and the peak breaking out of it.
*/
export function RealStory() {
  return (
    <section className="relative overflow-hidden bg-bg pt-16 pb-20 sm:pt-24 lg:pt-36 lg:pb-32">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
        <InView className="relative lg:col-span-6" threshold={0.25}>
          <div className="relative mx-auto aspect-[4/5] max-w-[34rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="rv rv-l absolute inset-0 translate-x-4 bg-green [clip-path:polygon(0_0,96%_0,76%_100%,0_100%)]"
            />
            <div
              className="rv rv-l absolute inset-0 overflow-hidden bg-ink [clip-path:polygon(0_0,96%_0,76%_100%,0_100%)]"
              style={{ ["--d" as string]: "120ms" }}
            >
              <Image
                src={deckAfter}
                alt="The collapsed hot tub deck, with the hot tub on its side below the deck frame."
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
                style={{ objectPosition: "45% 40%" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </div>

            {/* Rubber stamp */}
            <span
              className="pop absolute top-[7%] left-[6%] -rotate-[8deg] border-[3px] border-green bg-ink/70 px-3 py-1.5 font-display text-sm font-extrabold tracking-[0.2em] text-green uppercase backdrop-blur-sm md:text-base"
              style={{ ["--d" as string]: "700ms" }}
            >
              Real property
            </span>

          </div>
        </InView>

        <InView className="lg:col-span-6">
          <div className="rv">
            <Label>The real story</Label>
          </div>
          <h2
            className="rv text-[clamp(2rem,4.3vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.02em] uppercase"
            style={{ ["--d" as string]: "80ms" }}
          >
            This deck could have been saved for about <span className="hl-v">$100.</span>
          </h2>
          <p
            className="rv mt-7 max-w-xl text-lg leading-relaxed text-muted"
            style={{ ["--d" as string]: "160ms" }}
          >
            This is a real property. When the hot tub deck failed, our engineering team was called
            in to find out why. The fix that would have prevented it: four bolts at about $1.50
            each. Even with $100 to have them installed, that was all it would have taken.
          </p>

          {/* The fix, as a line of numbers */}
          <dl
            className="rv mt-10 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-end gap-x-3 border-y border-line py-6 sm:gap-x-5"
            style={{ ["--d" as string]: "240ms" }}
          >
            <div>
              <dd className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none font-extrabold">
                <CountUp to={4} duration={900} />
              </dd>
              <dt className="label mt-3 text-muted">Bolts</dt>
            </div>
            <span aria-hidden="true" className="pb-7 font-display text-2xl font-light text-muted">
              &times;
            </span>
            <div>
              <dd className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none font-extrabold">
                <CountUp to={1.5} decimals={2} prefix="$" duration={1100} />
              </dd>
              <dt className="label mt-3 text-muted">Each</dt>
            </div>
            <span aria-hidden="true" className="pb-7 font-display text-2xl font-light text-muted">
              &rarr;
            </span>
            <div>
              <dd className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none font-extrabold">
                <span className="bg-green px-[0.12em] text-ink">
                  <CountUp to={100} prefix="$" duration={1600} />
                </span>
              </dd>
              <dt className="label mt-3 text-muted">Installed</dt>
            </div>
          </dl>
        </InView>
      </Container>
    </section>
  );
}
