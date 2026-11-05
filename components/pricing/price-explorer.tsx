"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { Button } from "@/components/ui";
import { bandFor, priceBands } from "@/lib/pricing";

type Billing = "monthly" | "annual";

const MIN = 500;
const MAX = 7000;
const fmt = (n: number) => n.toLocaleString("en-US");

// A representative size inside each band, used when a table row is tapped.
function sizeFor(i: number) {
  const lo = i === 0 ? MIN : (priceBands[i - 1].upTo ?? MAX) + 1;
  const hi = priceBands[i].upTo ?? MAX;
  return Math.round((lo + hi) / 2 / 50) * 50;
}

export function PriceExplorer() {
  const [sqft, setSqft] = useState(2200);
  const [billing, setBilling] = useState<Billing>("monthly");
  const active = bandFor(sqft);
  const band = priceBands[active];
  const price = billing === "monthly" ? band.monthly : band.annual;
  const per = billing === "monthly" ? "month" : "year";
  const pct = ((sqft - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Calculator */}
      <div data-theme="dark" className="grain relative overflow-hidden bg-ink p-7 text-fg sm:p-9 lg:col-span-5">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-green" />

        <label htmlFor="sqft-slider" className="label text-muted">
          How big is your home?
        </label>
        <p className="mt-3 font-display text-[clamp(2.4rem,5vw,3.25rem)] leading-none font-extrabold tabular-nums" aria-hidden="true">
          {sqft >= MAX ? `${fmt(MAX)}+` : fmt(sqft)}
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
          aria-valuetext={`${fmt(sqft)} square feet`}
          className="range mt-3"
          style={{ ["--p" as string]: `${pct}%` } as CSSProperties}
        />

        <div role="radiogroup" aria-label="Billing" className="mt-6 grid grid-cols-2 border-[1.5px] border-line-strong p-1">
          {(["monthly", "annual"] as const).map((b) => (
            <button
              key={b}
              type="button"
              role="radio"
              aria-checked={billing === b}
              onClick={() => setBilling(b)}
              className={`h-11 font-display text-[0.75rem] font-bold tracking-[0.16em] uppercase transition-colors ${
                billing === b ? "bg-green text-ink" : "text-muted hover:text-fg"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-7" aria-live="polite">
          <p className="label text-muted">Your membership</p>
          {price ? (
            <>
              <p className="mt-3 font-display text-5xl font-extrabold tracking-tight">
                {price}
                <span className="ml-1.5 text-lg font-bold text-muted">/ {per}</span>
              </p>
              <p className="mt-2 text-muted">
                Homes {band.label} sq ft. Two inspections a year.
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 font-display text-4xl font-extrabold tracking-tight">Contact us</p>
              <p className="mt-2 text-muted">Homes {band.label} sq ft.</p>
            </>
          )}
          <div className="mt-7">
            <Button href={price ? "/register" : "/contact"} arrow className="w-full">
              {price ? "Register Now" : "Contact Us"}
            </Button>
          </div>
        </div>
      </div>

      {/* Price table */}
      <div className="lg:col-span-7">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Membership price by home size</caption>
          <thead>
            <tr className="border-b-2 border-fg">
              <th scope="col" className="label py-4 pr-2 pl-3 text-muted sm:pl-5">
                Home size<span className="max-sm:hidden"> (sq ft)</span>
              </th>
              {(["monthly", "annual"] as const).map((b) => (
                <th
                  key={b}
                  scope="col"
                  className={`label px-2 py-4 transition-colors sm:px-4 ${billing === b ? "text-fg" : "text-muted"}`}
                >
                  {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {priceBands.map((b, i) => {
              const on = i === active;
              return (
                <tr
                  key={b.label}
                  className={`border-b border-line transition-colors duration-300 ${on ? "bg-green text-ink" : "hover:bg-bg-alt"}`}
                >
                  <th scope="row" className="py-5 pr-2 pl-3 align-middle sm:py-6 sm:pl-5">
                    <button
                      type="button"
                      onClick={() => setSqft(sizeFor(i))}
                      aria-pressed={on}
                      className="text-left font-display text-[0.95rem] leading-tight font-extrabold sm:text-lg"
                    >
                      {b.label}
                      {on && (
                        <span className="mt-1.5 block w-fit bg-ink px-2 py-0.5 font-display text-[0.58rem] tracking-[0.18em] text-green uppercase sm:mt-0 sm:ml-3 sm:inline-block sm:align-middle">
                          Your home
                        </span>
                      )}
                    </button>
                  </th>
                  {b.monthly && b.annual ? (
                    (["monthly", "annual"] as const).map((col) => (
                      <td
                        key={col}
                        className={`px-2 py-5 align-middle font-display font-extrabold whitespace-nowrap transition-opacity sm:px-4 sm:py-6 ${
                          billing === col ? "" : "opacity-55"
                        }`}
                      >
                        <span className="text-base sm:text-xl">{col === "monthly" ? b.monthly : b.annual}</span>
                        <span className="text-xs font-bold sm:hidden">/{col === "monthly" ? "mo" : "yr"}</span>
                        <span className="text-sm font-bold max-sm:hidden"> / {col === "monthly" ? "month" : "year"}</span>
                      </td>
                    ))
                  ) : (
                    <td colSpan={2} className="px-2 py-5 align-middle sm:px-4 sm:py-6">
                      <Link
                        href="/contact"
                        className={`font-display text-base font-extrabold underline decoration-2 underline-offset-4 sm:text-lg ${
                          on ? "decoration-ink" : "decoration-green"
                        }`}
                      >
                        Contact us
                      </Link>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-5 text-muted">
          Tap a size to select it. Not sure of your square footage? Give us your best estimate and
          we&rsquo;ll confirm it with you.
        </p>
      </div>
    </div>
  );
}
