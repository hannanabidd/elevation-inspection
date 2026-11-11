import Image from "next/image";
import type { CSSProperties } from "react";
import { Check } from "@/components/icons";
import { Button, Container } from "@/components/ui";
import bannerPhoto from "@/public/images/home_banner.png";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/*
  Banner photo. `position` keeps the inspector in view: phones (top band) first, then desktop
  (right side, where the dark panel's diagonal covers the photo's top-left corner).
*/
const photo = {
  src: bannerPhoto,
  alt: "An Elevation Inspections inspector shining a flashlight on the beams under an elevated cabin deck, tablet in hand.",
  position: "object-[50%_25%] lg:object-[35%_50%]",
};

/*
  Opening banner, laid out like the back of the business card:
  a dark diagonal panel with a green stripe holds the tagline, and the inspector photo
  fills the other side.
  Phones: the photo is a band across the top, with the stripe cutting into the text below.
*/
export function Banner() {
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-ink text-fg">
      {/* Photo: right side on desktop, top band on phones */}
      <div className="relative h-60 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
          sizes="(min-width: 1024px) 52vw, 100vw"
          className={`object-cover ${photo.position}`}
        />

        {/* Phones: diagonal stripe into the dark text area */}
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-px h-12 lg:hidden">
          <div className="absolute inset-0 -translate-y-2 bg-green [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)]" />
          <div className="grain absolute inset-0 bg-ink [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)]" />
        </div>
      </div>

      {/* Desktop: dark diagonal panel + green stripe */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] lg:block">
        <div className="absolute inset-0 translate-x-4 bg-green [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]" />
        <div className="grain absolute inset-0 bg-ink [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]" />
      </div>

      <Container className="relative">
        <div className="flex flex-col justify-center pt-6 pb-12 sm:pt-8 sm:pb-16 lg:min-h-[min(42rem,calc(100svh-8rem))] lg:max-w-[46%] lg:py-24 xl:max-w-[44%]">
          <p className="label load-up text-muted" style={d(250)}>
            <span className="hidden xl:inline">
              Structural inspections <span className="mx-2 text-green">/</span>
            </span>
            Sevier County, TN
          </p>
          <h1
            className="load-up mt-5 text-[clamp(2.6rem,4.8vw,4.3rem)] leading-[1] font-medium tracking-[-0.025em] italic"
            style={d(350)}
          >
            The Difference is <span className="font-extrabold text-green">Knowing.</span>
          </h1>
          <p
            className="load-up mt-7 max-w-md text-lg leading-relaxed text-muted sm:text-xl"
            style={d(480)}
          >
            Twice-a-year structural inspections for short-term rentals in Sevier County, backed by
            a team of engineers.
          </p>
          <div className="load-up mt-9 grid grid-cols-2 gap-3 sm:flex" style={d(600)}>
            <Button href="/register" arrow className="max-sm:px-4">
              Register Now
            </Button>
            <Button href="/pricing" variant="outline" className="max-sm:px-4">
              See Pricing
            </Button>
          </div>
          <p className="load-up mt-4 flex items-center gap-2 text-sm text-muted" style={d(700)}>
            <Check className="size-4 text-green" />
            No payment is needed today.
          </p>
        </div>
      </Container>
    </section>
  );
}
