"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { bandFor, priceBands } from "@/lib/pricing";

type Billing = "monthly" | "annual";

const MIN = 500;
const MAX = 7000;

export function PriceExplorer() {
  const [sqft, setSqft] = useState(2200);
  const [billing, setBilling] = useState<Billing>("monthly");
  const active = bandFor(sqft);
  const pct = ((sqft - MIN) / (MAX - MIN)) * 100;

  return (
    <div>
      {/* Controls */}
      <div className="grid gap-8 border-y border-line py-8 md:grid-cols-[1fr_auto] md:items-end md:gap-14">
        <div>
          <label htmlFor="sqft-slider" className="label text-muted">
            How big is your home?
          </label>
          <p className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-none font-extrabold tabular-nums" aria-hidden="true">
            {sqft >= MAX ? `${MAX.toLocaleString("en-US")}+` : sqft.toLocaleString("en-US")}
            <span className="ml-2 text-lg font-bold text-muted">sq ft</span>
          </p>
          <input
            id="sqft-slider"
            type="range"
            min={MIN}
            max={MAX}
            step={50}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            aria-valuetext={`${sqft.toLocaleString("en-US")} square feet, ${priceBands[active].label} band`}
            className="range mt-3 max-w-xl"
            style={{ ["--p" as string]: `${pct}%` } as CSSProperties}
          />
        </div>

        <div role="radiogroup" aria-label="Billing" className="inline-flex self-start border-[1.5px] border-line-strong p-1 md:self-end">
          {(["monthly", "annual"] as const).map((b) => (
            <button
              key={b}
              type="button"
              role="radio"
              aria-checked={billing === b}
              onClick={() => setBilling(b)}
              className={`h-11 px-6 font-display text-[0.75rem] font-bold tracking-[0.16em] uppercase transition-colors ${
                billing === b ? "bg-fg text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Bands, rising like an elevation profile */}
      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:items-end">
        {priceBands.map((band, i) => {
          const on = i === active;
          const price = billing === "monthly" ? band.monthly : band.annual;
          const other = billing === "monthly" ? band.annual : band.monthly;
          return (
            <li
              key={band.label}
              aria-current={on ? "true" : undefined}
              className={`relative flex flex-col justify-end border-[1.5px] p-6 transition-[background-color,border-color,color,translate] duration-500 lg:min-h-[var(--h)] ${
                on
                  ? "border-green bg-green text-ink lg:-translate-y-3"
                  : "border-line bg-surface text-fg"
              }`}
              style={{ ["--h" as string]: `${210 + i * 46}px` } as CSSProperties}
            >
              {on && (
                <span className="absolute -top-3.5 left-5 bg-ink px-2.5 py-1 font-display text-[0.62rem] font-bold tracking-[0.18em] text-green uppercase">
                  Your home
                </span>
              )}
              <p className={`label ${on ? "text-ink/70" : "text-muted"}`}>Home size</p>
              <p className="mt-2 font-display text-lg leading-tight font-extrabold">
                {band.label} <span className="font-semibold">sq ft</span>
              </p>
              <div className={`mt-5 border-t pt-5 ${on ? "border-ink/20" : "border-line"}`}>
                {price ? (
                  <>
                    <p className="font-display text-3xl font-extrabold tracking-tight">
                      {price}
                      <span className="ml-1 text-sm font-bold">/ {billing === "monthly" ? "month" : "year"}</span>
                    </p>
                    <p className={`mt-1 text-sm ${on ? "text-ink/70" : "text-muted"}`}>
                      or {other} / {billing === "monthly" ? "year" : "month"}
                    </p>
                  </>
                ) : (
                  <Link
                    href="/contact"
                    className="font-display text-2xl font-extrabold underline decoration-2 underline-offset-4"
                  >
                    Contact us
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
