import { Fragment } from "react";
import { PeakMark } from "@/components/brand";

const items = [
  "Sevierville",
  "Pigeon Forge",
  "Gatlinburg",
  "Sevier County",
  "Two inspections a year",
  "Backed by engineers",
];

/* Tilted green band, like the diagonal stripe on the back of the business card. */
export function Ticker() {
  return (
    <div className="relative z-10 -my-5 overflow-hidden py-5">
      <div className="-mx-[5%] -rotate-[1.6deg] bg-green py-3.5 text-ink shadow-[0_10px_30px_-10px_rgb(0_0_0/0.35)] md:py-4">
        <p className="sr-only">Serving {items.slice(0, 4).join(", ")}.</p>
        <div className="marquee" aria-hidden="true">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {items.map((t) => (
                <Fragment key={t}>
                  <span className="px-6 font-display text-base font-extrabold tracking-[0.08em] whitespace-nowrap uppercase md:px-9 md:text-xl">
                    {t}
                  </span>
                  <PeakMark className="size-5 shrink-0 md:size-6" />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
