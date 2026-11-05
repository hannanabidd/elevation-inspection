import type { CSSProperties } from "react";

/*
  The green peak from the logo's "A", traced from the supplied logo file:
  outer peak with a mountain-ridge base, and the snow-cap cut out of the middle.
*/
export function PeakMark({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 365 375" aria-hidden="true" className={className} style={style}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M180 0 365 375 217 273 103 355 68 333 0 375Z M177 65 243 200 190 165 148 195 135 187 112 200Z"
      />
    </svg>
  );
}

/*
  Debossed mountain ridges, like the ones pressed into the business card.
  Each line is drawn twice (highlight + shadow) offset by a pixel.
*/
const RIDGES = [
  "M0 250 L120 196 L170 214 L290 120 L360 168 L420 146 L540 52 L640 150 L700 126 L820 206 L900 184 L1020 236 L1200 214",
  "M60 300 L210 232 L270 250 L400 178 L470 210 L600 128 L720 220 L790 196 L930 268 L1060 246 L1200 270",
  "M300 300 L420 248 L480 262 L620 196 L700 230 L840 172 L960 256 L1200 238",
];

export function Ridges({
  className = "",
  emboss = true,
}: {
  className?: string;
  emboss?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1200 300"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
      className={className}
    >
      {RIDGES.map((d, i) => (
        <g key={i} strokeLinejoin="round" strokeWidth={i === 0 ? 2.2 : 1.6}>
          {emboss && <path d={d} stroke="var(--emb-lo)" transform="translate(1.4 1.6)" />}
          <path d={d} stroke={emboss ? "var(--emb-hi)" : "currentColor"} />
        </g>
      ))}
    </svg>
  );
}
