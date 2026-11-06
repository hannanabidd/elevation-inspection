import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import windowsPhoto from "@/public/images/inspection01.png";
import kitchenPhoto from "@/public/images/inspeaction02.png";
import windowCloseupPhoto from "@/public/images/inspection03.png";
import waterHeaterPhoto from "@/public/images/inspection04.png";
import { Phone } from "./icons";
import { InView } from "./motion";
import { Button, Container } from "./ui";

/*
  Inspector photos for the closing band, one per page so no photo repeats on the site
  (the kitchen shot is the home banner). Positions keep the head, flashlight and shirt logo
  in frame at each crop: a short band on phones, a wide diagonal panel on desktop.
*/
const photos = {
  windows: {
    src: windowsPhoto,
    alt: "An Elevation Inspections inspector checking a window with a flashlight and tablet.",
    position: "object-[55%_25%] lg:object-[52%_30%]",
  },
  windowCloseup: {
    src: windowCloseupPhoto,
    alt: "An Elevation Inspections inspector checking a window frame with a flashlight, tablet in hand.",
    position: "object-[50%_8%]",
  },
  waterHeater: {
    src: waterHeaterPhoto,
    alt: "An Elevation Inspections inspector checking the pipes above a water heater with a flashlight.",
    position: "object-[50%_4%]",
  },
  kitchen: {
    src: kitchenPhoto,
    alt: "An Elevation Inspections inspector checking the plumbing under a kitchen sink with a flashlight.",
    position: "object-[50%_6%] lg:object-[56%_8%]",
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
  photo = "windows",
}: {
  lead: ReactNode;
  accent: ReactNode;
  text?: ReactNode;
  secondary?: "call" | "contact";
  photo?: keyof typeof photos;
}) {
  const img = photos[photo];
  return (
    <section data-theme="dark" className="grain relative overflow-hidden bg-ink-3 text-fg lg:flex lg:min-h-96 lg:items-center">
      <div className="relative h-44 sm:h-56 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[50%]">
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
            sizes="(min-width: 1024px) 50vw, 100vw"
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
