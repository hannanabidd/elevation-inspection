import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { Ridges } from "@/components/brand";
import { Check } from "@/components/icons";
import { Button, Container } from "@/components/ui";
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

function Intro() {
  return (
    <>
      <p className="max-w-md text-lg leading-relaxed text-muted lg:text-[1.15rem]">
        Twice-a-year structural inspections for short-term rentals in Sevier County, backed by a
        team of engineers.
      </p>
      <div className="mt-7 grid grid-cols-2 gap-3 sm:flex">
        <Button href="/register" arrow className="max-sm:px-4">
          Register Now
        </Button>
        <Button href="/pricing" variant="outline" className="max-sm:px-4">
          See Pricing
        </Button>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
        <Check className="size-4 text-fg" />
        No payment is needed today.
      </p>
    </>
  );
}

export function Hero() {
  return (
    <section className="hero grain relative overflow-hidden bg-bg">
      <Ridges className="pointer-events-none absolute top-0 right-0 h-[60%] w-[75%] opacity-80" />

      <Container className="relative pt-8 pb-7 sm:pt-12 lg:pt-14 lg:pb-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label load-up text-muted" style={d(0)}>
              Sevier County, TN
              <span className="hidden sm:inline">
                <span className="mx-2 text-green">/</span> Short-term rentals
              </span>
            </p>
            <h1
              className="load-up mt-5 text-[clamp(1.85rem,6.3vw,5rem)] leading-[1.02] font-extrabold tracking-[-0.025em] uppercase"
              style={d(80)}
            >
              Don&rsquo;t let <This n={1} delay={700} /> turn into <This n={2} delay={950} />{" "}
              because of <This n={3} delay={1200} />.
            </h1>
          </div>
          <div className="load-up hidden lg:col-span-4 lg:block lg:pb-3" style={d(300)}>
            <Intro />
          </div>
        </div>
      </Container>

      {/* Three photos, split by green diagonals */}
      {/* Short on phones so the buttons below still land in the first screen */}
      <div className="tri h-[220px] sm:h-[clamp(240px,40vh,420px)] lg:h-[clamp(260px,44vh,500px)]">
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
                priority
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

      <Container className="relative py-8 lg:hidden">
        <Intro />
      </Container>
    </section>
  );
}

/* Inspector's circle around the bolts, drawn after the photo appears. */
function BoltsNote() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path
          className="annot"
          style={d(1900)}
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
        style={d(2600)}
      >
        the fix
      </span>
    </div>
  );
}
