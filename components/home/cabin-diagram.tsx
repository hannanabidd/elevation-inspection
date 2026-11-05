"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/*
  Line drawing of a hillside cabin with a hot tub deck.
  --t (0 to 1) drives the damage: 0 = caught early, 1 = missed for a few years.
*/

const groundY = (x: number) => 372 + x * 0.0732;
const ticks = Array.from({ length: 35 }, (_, i) => i * 24 + 6);
const logs = [219, 238, 257, 276, 295, 314, 333];
const balusters = Array.from({ length: 13 }, (_, i) => 474 + i * 16);

function Marker({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="none">
      <circle r="15" fill="var(--color-green)" className="pulse" />
      <circle r="15" fill="var(--color-green)" />
      <text
        textAnchor="middle"
        dy="5.5"
        fontSize="15"
        fontWeight="800"
        fill="var(--color-ink)"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {n}
      </text>
    </g>
  );
}

export function CabinDiagram() {
  const [t, setT] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  // Play the timeline once when it first comes into view.
  useEffect(() => {
    const el = wrap.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now() + 700;
        const dur = 3600;
        const tick = (now: number) => {
          if (touched.current) return;
          const p = Math.max(0, Math.min(1, (now - start) / dur));
          const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          setT(Math.round(eased * 100));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const k = t / 100;
  const missed = k >= 0.5;
  const after = (from: number) => Math.max(0, Math.min(1, (k - from) / (1 - from)));

  return (
    <div ref={wrap}>
      {/* Double frame, like the logo */}
      <div className="border-[1.5px] border-line-strong p-1.5">
        <div className="blueprint relative overflow-hidden border-2 border-green bg-surface">
          <svg
            viewBox="0 0 820 470"
            role="img"
            aria-label="Line drawing of a hillside cabin with a hot tub deck. As time passes, a clogged gutter overflows, the downspout pools water at the foundation, the foundation cracks and the deck pulls away from the house."
            className="block h-auto w-full text-fg"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ ["--t" as string]: k } as CSSProperties}
          >
            {/* Mountains behind */}
            <path
              d="M0 170 L90 112 L140 136 L250 54 L330 118 L380 96 L500 24 L600 110 L660 86 L760 150 L820 132"
              strokeWidth={1.5}
              opacity={0.18}
            />

            {/* Ground with hatching */}
            <path d="M0 372 L820 432" />
            <g strokeWidth={1} opacity={0.35}>
              {ticks.map((x) => (
                <path key={x} d={`M${x} ${groundY(x) + 2} l-10 12`} />
              ))}
            </g>

            {/* Foundation + walls */}
            <path d={`M150 352 H450 V${groundY(450)} L150 ${groundY(150)} Z`} />
            <rect x="150" y="200" width="300" height="152" />
            <g strokeWidth={1.2} opacity={0.35}>
              {logs.map((y) => (
                <path key={y} d={`M150 ${y} H450`} />
              ))}
            </g>
            <rect x="190" y="236" width="62" height="58" fill="var(--surface)" />
            <path d="M221 236 V294 M190 265 H252" strokeWidth={1.5} />
            <rect x="322" y="270" width="54" height="82" fill="var(--surface)" />

            {/* Roof */}
            <path d="M150 200 L300 112 L450 200" strokeWidth={1.2} opacity={0.5} />
            <path d="M118 218 L300 98 L482 218" strokeWidth={3.5} />

            {/* 1. Gutter (left eave), clogging */}
            <path d="M106 216 h24 v11 h-24 z" />
            <g fill="currentColor" stroke="none" style={{ opacity: after(0.05) }}>
              <circle cx="111" cy="214" r="4" />
              <circle cx="119" cy="212" r="5" />
              <circle cx="127" cy="214" r="3.5" />
            </g>
            <path
              d={`M108 229 V${groundY(108) - 2}`}
              className="drip"
              strokeWidth={2}
              style={{ opacity: after(0.15) }}
            />

            {/* 2. Downspout dumping at the foundation */}
            <path d="M124 227 V378 L144 384" strokeWidth={5} />
            <ellipse
              cx="150"
              cy={groundY(150) + 3}
              rx="46"
              ry="7"
              fill="currentColor"
              stroke="none"
              opacity={0.22}
              style={{
                transform: `scale(${0.05 + k * 0.95})`,
                transformOrigin: `150px ${groundY(150) + 3}px`,
                transformBox: "view-box",
              }}
            />

            {/* 3. Poor drainage: water running downhill toward the house */}
            <g strokeDasharray="10 8" strokeWidth={2} style={{ opacity: after(0.1) }}>
              <path d="M8 362 L98 369" />
              <path d="M90 364 L99 369 L89 374" strokeDasharray="none" />
            </g>

            {/* Foundation crack */}
            <path
              d="M196 352 L204 362 L194 371 L203 381"
              strokeWidth={2.5}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - after(0.35)}
            />

            {/* Deck posts stay put */}
            <path d={`M560 272 V${groundY(560)} M680 272 V${groundY(680)}`} strokeWidth={3} />
            <path d="M560 304 L590 272 M680 304 L650 272" strokeWidth={1.5} opacity={0.6} />

            {/* 4. Ledger on the house, with bolts that go missing */}
            <rect x="444" y="255" width="10" height="24" fill="var(--surface)" />
            <g fill="currentColor" stroke="none" style={{ opacity: 1 - after(0.3) }}>
              <circle cx="449" cy="261" r="2.6" />
              <circle cx="449" cy="273" r="2.6" />
            </g>

            {/* Deck, railing and hot tub: tip away from the house as the connection fails */}
            <g
              style={{
                transform: `rotate(${-8 * after(0.45)}deg)`,
                transformOrigin: "690px 266px",
                transformBox: "view-box",
              }}
            >
              <path d="M456 262 H690 V272 H456 Z" fill="var(--surface)" />
              <path d="M460 222 H690 V262" />
              <g strokeWidth={1.2} opacity={0.7}>
                {balusters.map((x) => (
                  <path key={x} d={`M${x} 222 V262`} />
                ))}
              </g>
              <rect x="560" y="228" width="92" height="34" fill="var(--surface)" />
              <path d="M555 228 H657" strokeWidth={3} />
            </g>

            <Marker n={1} x={92} y={198} />
            <Marker n={2} x={172} y={412} />
            <Marker n={3} x={40} y={342} />
            <Marker n={4} x={482} y={300} />
          </svg>

          {/* Stamp lands at the end */}
          <span
            aria-hidden="true"
            className="absolute top-[7%] right-[5%] border-[3px] border-fg px-3 py-1.5 font-display text-[0.7rem] font-extrabold tracking-[0.2em] text-fg uppercase sm:text-sm"
            style={{
              opacity: after(0.82),
              transform: `rotate(-9deg) scale(${1.6 - after(0.82) * 0.6})`,
            }}
          >
            Booking cancelled
          </span>
        </div>
      </div>

      {/* Time control */}
      <div className="mt-6">
        <div className="flex justify-between gap-4">
          <span className={`label transition-colors max-sm:text-[0.62rem] max-sm:tracking-[0.12em] ${missed ? "text-muted" : "text-fg"}`}>
            Caught early
          </span>
          <span className={`label text-right transition-colors max-sm:text-[0.62rem] max-sm:tracking-[0.12em] ${missed ? "text-fg" : "text-muted"}`}>
            Missed for a few years
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={t}
          onPointerDown={() => (touched.current = true)}
          onKeyDown={() => (touched.current = true)}
          onChange={(e) => {
            touched.current = true;
            setT(Number(e.target.value));
          }}
          className="range mt-1"
          style={{ ["--p" as string]: `${t}%` } as CSSProperties}
          aria-label="Time since the problem started"
          aria-valuetext={missed ? "Missed for a few years" : "Caught early"}
        />
        <p
          aria-live="polite"
          className="mt-3 min-h-[3.4em] font-display text-lg leading-snug font-bold sm:text-xl"
        >
          {missed ? (
            <>
              Missed for a few years, it becomes{" "}
              <span className="bg-green px-1 text-ink">
                foundation repairs, a failed deck and cancelled bookings.
              </span>
            </>
          ) : (
            <>Caught early, it&rsquo;s a quick fix.</>
          )}
        </p>
      </div>
    </div>
  );
}
