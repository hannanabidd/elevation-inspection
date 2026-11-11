import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import deckRailingPhoto from "@/public/images/about_CTA.png";
import crawlspacePhoto from "@/public/images/home_CTA.png";
import drainagePhoto from "@/public/images/pricing_CTA.png";
import { Phone } from "./icons";
import { InView } from "./motion";
import { Button, Container } from "./ui";

/*
  Inspector photos for the closing band, one per page (all outdoors, where the inspections
  happen). Positions keep the head, shirt logo and flashlight in frame at each crop: a short
  band on phones, a wide diagonal panel on desktop.
  The photo area is kept at the photos' own 3:2 shape (phones: aspect ratio; desktop: 42% of
  the width by at least 28% of the width tall), so each photo shows top to bottom.
*/
const photos = {
  crawlspace: {
    src: crawlspacePhoto,
    alt: "An Elevation Inspections inspector kneeling at a cabin's crawlspace door, shining a flashlight inside.",
    position: "object-[50%_10%] lg:object-[60%_50%]",
  },
  drainage: {
    src: drainagePhoto,
    alt: "An Elevation Inspections inspector checking where a downspout drains beside a cabin's stone foundation.",
    position: "object-[50%_30%] lg:object-[60%_50%]",
  },
  deckRailing: {
    src: deckRailingPhoto,
    alt: "An Elevation Inspections inspector checking the bolted bracket at the base of a deck railing post, with mountains behind.",
    position: "object-[50%_10%] lg:object-[60%_50%]",
  },
};

/*
  Closing call to action: an inspector photo on the right behind a diagonal
  cut and green stripe, mirroring the home banner. On phones the photo is a band above the text.
  The heading is italic with its last words in green (pass them as `accent`).
*/
export function CtaBand({
  lead,
  accent,
  text,
  secondary = "call",
  photo = "crawlspace",
}: {
  lead: ReactNode;
  accent: ReactNode;
  text?: ReactNode;
  secondary?: "call" | "contact";
  photo?: keyof typeof photos;
}) {
  const img = photos[photo];
  return (
    <section data-theme="dark" className="grain relative overflow-hidden bg-ink-3 text-fg lg:flex lg:min-h-[max(24rem,28vw)] lg:items-center">
      <div className="relative aspect-[3/2] sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[42%]">
        {/* Green stripe peeking out along the diagonal (desktop) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden -translate-x-4 bg-green [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)] lg:block"
        />
        <div className="absolute inset-0 overflow-hidden lg:[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className={`object-cover ${img.position}`}
          />
        </div>
        {/* Phones: diagonal stripe into the dark text area */}
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-px h-10 lg:hidden">
          <div className="absolute inset-0 -translate-y-2 bg-green [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)]" />
          <div className="grain absolute inset-0 bg-ink-3 [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)]" />
        </div>
      </div>

      <Container className="relative w-full">
        <InView className="pt-8 pb-14 sm:pt-10 sm:pb-16 lg:max-w-[46%] lg:py-24">
          <h2 className="rv max-w-3xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.04] font-medium tracking-[-0.02em] italic">
            {lead} <span className="font-extrabold text-green">{accent}</span>
          </h2>
          {text && (
            <p
              className="rv mt-4 max-w-xl text-lg leading-relaxed text-muted"
              style={{ ["--d" as string]: "80ms" }}
            >
              {text}
            </p>
          )}
          <div className="rv mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "160ms" }}>
            <Button href="/register" arrow>
              Register Now
            </Button>
            {secondary === "call" ? (
              <Button href={site.phoneHref} variant="outline">
                <Phone className="size-4" />
                Call {site.phone}
              </Button>
            ) : (
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            )}
          </div>
        </InView>
      </Container>
    </section>
  );
}
