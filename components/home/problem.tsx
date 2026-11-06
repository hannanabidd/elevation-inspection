import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CountUp, InView } from "@/components/motion";
import { Container } from "@/components/ui";
import deckAfter from "@/public/images/deck-after.jpg";
import deckBefore from "@/public/images/deck-before.jpg";
import fourBolts from "@/public/images/four-bolts.jpg";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

const figure = "font-display text-[clamp(1.9rem,2.8vw,2.6rem)] leading-none font-extrabold";
const operator = "pb-8 font-display text-xl font-light text-muted";
const tag =
  "bg-ink px-2.5 py-1.5 font-display text-[0.72rem] leading-none font-extrabold tracking-wide text-white uppercase sm:text-sm lg:px-3.5 lg:py-2.5 lg:text-base";

/* Dark label sitting on a photo: "DON'T LET THIS" / "TURN INTO THIS" */
function Tag({ children, className, delay }: { children: ReactNode; className: string; delay: number }) {
  return (
    <span aria-hidden="true" className={`rv absolute ${tag} ${className}`} style={d(delay)}>
      {children}
    </span>
  );
}

/*
  "Don't let this turn into this because of this."
  The same deck before and after, split by the brand's green slash, with the four bolts sitting
  right on that slash: four bolts are all that stood between the two photos.

  Geometry: each photo box is W wide and 4/3 W tall (the photos' own 3:4 shape, so nothing is
  cropped). The boxes overlap by 0.2 W and are cut on a matching diagonal, so the stage is
  1.8 W x 1.333 W (27:20). Each photo only loses a thin triangle along the slash.
*/
export function Problem() {
  return (
    <section className="bg-bg py-20 lg:py-28">
      <Container>
        <h2 className="sr-only">Don&rsquo;t let this turn into this because of this.</h2>

        <div className="grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-14">
          <InView className="relative pb-24 lg:col-span-7 lg:pb-28" threshold={0.25}>
            <div className="relative aspect-[27/20]">
              {/* Green slash between the photos (a little wider than the gap; the photos sit on top) */}
              <div
                aria-hidden="true"
                className="rv absolute inset-0 bg-green [clip-path:polygon(53.6%_0,57.5%_0,46.4%_100%,42.5%_100%)]"
                style={d(350)}
              />

              {/* Before */}
              <div className="rv rv-l absolute inset-y-0 left-0 w-[55.56%] [clip-path:polygon(0_0,98%_0,78%_100%,0_100%)]">
                <Image
                  src={deckBefore}
                  alt="A cabin deck with a hot tub, surrounded by trees."
                  fill
                  sizes="(min-width: 1024px) 400px, 56vw"
                  className="object-cover"
                />
              </div>

              {/* After */}
              <div
                className="rv rv-r absolute inset-y-0 right-0 w-[55.56%] [clip-path:polygon(22%_0,100%_0,100%_100%,2%_100%)]"
                style={d(150)}
              >
                <Image
                  src={deckAfter}
                  alt="The same hot tub tipped over on the ground after the deck under it collapsed."
                  fill
                  sizes="(min-width: 1024px) 400px, 56vw"
                  className="object-cover"
                />
              </div>

              <Tag className="top-3 left-3 lg:top-4 lg:left-4" delay={350}>
                Don&rsquo;t let <span className="text-green">this</span>
              </Tag>
              <Tag className="top-3 right-3 lg:top-4 lg:right-4" delay={550}>
                turn into <span className="text-green">this</span>
              </Tag>

              {/* The four bolts, right on the slash */}
              <div className="absolute top-full left-[44.44%] z-10 w-[34%] -translate-x-1/2 -translate-y-[60%]">
                <div
                  className="pop rounded-full bg-green p-[4%] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)]"
                  style={d(800)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-full">
                    <Image
                      src={fourBolts}
                      alt="Four galvanized bolts with nuts held in an open hand."
                      fill
                      sizes="(min-width: 1024px) 240px, 34vw"
                      className="object-cover object-[41%_50%]"
                    />
                  </div>
                </div>
              </div>

              {/* "because of this." beside the bolts, under the photos */}
              <div className="absolute top-full right-0 left-[calc(61.44%+0.75rem)] mt-3 lg:left-[calc(61.44%+1.25rem)] lg:mt-5">
                <span aria-hidden="true" className={`rv inline-block ${tag}`} style={d(1000)}>
                  because of <span className="text-green">this.</span>
                </span>
                <span className="rv mt-2 block text-sm leading-snug text-muted lg:text-base" style={d(1100)}>
                  Four bolts, about $1.50 each.
                </span>
              </div>
            </div>
          </InView>

          {/* The real story behind the photos */}
          <InView className="lg:col-span-5">
            <p className="rv label text-muted">A real property</p>
            <h3
              className="rv mt-4 text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.08] font-extrabold tracking-[-0.02em] uppercase"
              style={d(80)}
            >
              This deck could have been saved for about <span className="hl-v">$100.</span>
            </h3>
            <div className="rv mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted" style={d(160)}>
              <p>
                When the hot tub deck failed, our engineering team was called in to find out why.
                The fix that would have prevented it: four bolts at about $1.50 each. Even with
                $100 to have them installed, that was all it would have taken.
              </p>
              <p>
                Most structural damage starts this small: a clogged gutter, a downspout dumping
                water at the foundation, poor drainage or a loose deck connection. Caught early,
                it&rsquo;s a quick fix. Missed for a few years, it becomes foundation repairs, a
                failed deck and cancelled bookings.
              </p>
            </div>

            {/* The fix, as numbers */}
            <dl className="rv mt-8 flex items-end gap-4 border-t border-line pt-6 sm:gap-6" style={d(240)}>
              <div>
                <dd className={figure}>
                  <CountUp to={4} duration={900} />
                </dd>
                <dt className="label mt-3 text-muted">Bolts</dt>
              </div>
              <span aria-hidden="true" className={operator}>
                &times;
              </span>
              <div>
                <dd className={figure}>
                  <CountUp to={1.5} decimals={2} prefix="$" duration={1100} />
                </dd>
                <dt className="label mt-3 text-muted">Each</dt>
              </div>
              <span aria-hidden="true" className={operator}>
                &rarr;
              </span>
              <div>
                <dd className={figure}>
                  <span className="bg-green px-[0.12em] text-ink">
                    <CountUp to={100} prefix="$" duration={1500} />
                  </span>
                </dd>
                <dt className="label mt-3 text-muted">Installed</dt>
              </div>
            </dl>
          </InView>
        </div>
      </Container>
    </section>
  );
}
