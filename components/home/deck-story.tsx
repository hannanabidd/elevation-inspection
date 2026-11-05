import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { Ridges } from "@/components/brand";
import { InView } from "@/components/motion";
import { Container, Label } from "@/components/ui";
import deckAfter from "@/public/images/deck-after.jpg";
import deckBefore from "@/public/images/deck-before.jpg";
import fourBolts from "@/public/images/four-bolts.jpg";

const photos: { src: StaticImageData; alt: string; caption: string; position: string }[] = [
  {
    src: deckBefore,
    alt: "A cabin deck with a hot tub, surrounded by trees.",
    caption: "A cabin’s hot tub deck.",
    position: "50% 62%",
  },
  {
    src: deckAfter,
    alt: "The same hot tub tipped over on the ground after the deck under it collapsed.",
    caption: "The same deck after it failed.",
    position: "50% 32%",
  },
  {
    // TODO: confirm this photo is licensed, or swap in Rebekah's own.
    src: fourBolts,
    alt: "Four galvanized bolts with nuts held in an open hand.",
    caption: "Four bolts, about $1.50 each.",
    position: "42% 50%",
  },
];

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/* One highlighted "this", linked to its photo by number (hover widens the photo). */
function This({ n, delay }: { n: number; delay: number }) {
  return (
    <span data-w={n} className="relative inline-block cursor-default whitespace-nowrap">
      <span className="hl" style={d(delay)}>
        this
      </span>
      {/* font-size is relative to the headline; the box is relative to that */}
      <span
        aria-hidden="true"
        className="ml-[0.18em] inline-flex size-[1.75em] items-center justify-center bg-fg align-top text-[max(0.19em,10px)] leading-none font-extrabold tracking-normal text-bg"
      >
        {n}
      </span>
    </span>
  );
}

/*
  The deck story, right under the banner: headline + three photos split by green diagonals.
  Its animations wait until it scrolls into view (play-on-view).
*/
export function DeckStory() {
  return (
    <InView as="section" className="hero play-on-view grain relative overflow-hidden bg-bg" threshold={0.2}>
      <Ridges className="pointer-events-none absolute top-0 right-0 h-[60%] w-[75%] opacity-80" />

      <Container className="relative pt-20 pb-9 sm:pt-24 lg:pt-28 lg:pb-14">
        <div className="load-up" style={d(0)}>
          <Label>The problem, in one look</Label>
        </div>
        <h2
          className="load-up max-w-[68rem] text-[clamp(1.85rem,5.6vw,4.6rem)] leading-[1.18] font-extrabold tracking-[-0.025em] uppercase"
          style={d(80)}
        >
          Don&rsquo;t let <This n={1} delay={500} /> turn into <This n={2} delay={750} />{" "}
          because of <This n={3} delay={1000} />.
        </h2>
      </Container>

      {/* Three photos, split by green diagonals */}
      <div className="tri h-[230px] sm:h-[clamp(260px,42vh,440px)] lg:h-[clamp(300px,50vh,520px)]">
        {photos.map((p, i) => (
          <figure
            key={p.caption}
            data-p={i + 1}
            className="tri-panel"
            style={{ ["--i" as string]: i } as CSSProperties}
          >
            <div className="tri-media">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 42vw, 40vw"
                className="object-cover"
                style={{ objectPosition: p.position }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/10" />
            </div>

            <span
              aria-hidden="true"
              className={`absolute top-3 flex size-7 items-center justify-center bg-green font-display text-xs font-extrabold text-ink md:top-5 md:size-9 md:text-sm ${
                i === 0 ? "left-3 md:left-6" : "left-[calc(var(--slant)+0.5rem)]"
              }`}
            >
              {i + 1}
            </span>

            <figcaption
              className={`absolute bottom-2.5 left-3 text-white md:bottom-6 md:left-6 ${
                i === 2 ? "right-3" : "right-[calc(var(--slant)+0.5rem)]"
              }`}
            >
              <span className="label hidden text-green md:block">Photo 0{i + 1}</span>
              <span className="mt-1 block font-display text-[0.68rem] leading-tight font-bold md:mt-2 md:text-xl">
                {p.caption}
              </span>
            </figcaption>

            {i === 2 && <BoltsNote />}
          </figure>
        ))}
      </div>
    </InView>
  );
}

/* Inspector's circle around the bolts, drawn after the photo appears. */
function BoltsNote() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path
          className="annot"
          style={d(1700)}
          d="M24 30 C 28 9, 70 6, 79 25 C 88 45, 82 80, 53 85 C 27 90, 13 70, 15 48 C 16 35, 24 24, 37 20"
          fill="none"
          stroke="var(--color-green)"
          strokeWidth={3.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="load-up absolute top-[7%] right-[5%] -rotate-6 font-hand text-[1.7rem] leading-none font-bold text-green"
        style={d(2400)}
      >
        the fix
      </span>
    </div>
  );
}
