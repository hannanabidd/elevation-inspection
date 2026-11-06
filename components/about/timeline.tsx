import { Drop, EyeSlash, PhoneCall, WarningDiamond } from "@/components/icons";
import { InView } from "@/components/motion";

const stops = [
  { icon: Drop, title: "It starts small", text: "A clogged gutter, poor drainage, a few missing bolts." },
  { icon: EyeSlash, title: "Nobody catches it", text: "It costs very little to fix, but no one is looking." },
  { icon: WarningDiamond, title: "Something fails", text: "A cracked foundation, sagging framing or a failing deck." },
  { icon: PhoneCall, title: "The call after", text: "By the time engineers get the call, it’s expensive and extensive." },
];

/*
  Where Elevation used to arrive (after) vs. where it arrives now (before).
  Desktop: the green "Now" pin slides back along the track when it scrolls into view.
*/
export function Timeline() {
  return (
    <InView className="relative" threshold={0.35}>
      {/* Desktop */}
      <div className="relative hidden pt-28 lg:block">
        {/* Track with cost scale */}
        <div className="relative h-1.5 bg-linear-to-r from-green via-line-strong to-danger" />
        <div className="mt-3 flex justify-between label text-muted">
          <span>Costs very little</span>
          <span>Expensive and extensive</span>
        </div>

        {/* "After": where engineers used to get the call */}
        <div className="absolute top-0 left-[87.5%] -translate-x-1/2 text-center">
          <span className="inline-block bg-fg px-3 py-1.5 font-display text-[0.68rem] font-bold tracking-[0.16em] whitespace-nowrap text-bg uppercase">
            After: the old call
          </span>
          <span aria-hidden="true" className="mx-auto mt-2 block h-12 w-0.5 bg-fg" />
          <span aria-hidden="true" className="mx-auto block size-4 rotate-45 border-2 border-fg bg-bg" />
        </div>

        {/* "Now": twice a year, before the damage */}
        <div className="tl-pin absolute top-0 z-10 -translate-x-1/2 text-center">
          <span className="inline-flex items-center gap-2 bg-green px-3 py-1.5 font-display text-[0.68rem] font-bold tracking-[0.16em] whitespace-nowrap text-ink uppercase">
            Now: before the damage
          </span>
          <span aria-hidden="true" className="mx-auto mt-2 block h-12 w-0.5 bg-green" />
          <span aria-hidden="true" className="mx-auto block size-4 rotate-45 bg-green ring-4 ring-bg" />
        </div>

        {/* Arrow showing the move */}
        <div aria-hidden="true" className="tl-arrow absolute top-[2.6rem] right-[12.5%] left-[14.5%] flex items-center">
          <span className="block size-0 border-y-[6px] border-r-[10px] border-y-transparent border-r-green" />
          <span className="block h-0.5 flex-1 border-t-2 border-dashed border-green" />
        </div>

        <ol className="mt-12 grid grid-cols-4 gap-8">
          {stops.map((s, i) => (
            <li key={s.title} className="rv" style={{ ["--d" as string]: `${200 + i * 120}ms` }}>
              <p className="flex items-center gap-3">
                <s.icon className={`size-7 ${i === 0 ? "text-fg" : "text-muted"}`} />
                <span className="font-display text-sm font-extrabold text-muted">0{i + 1}</span>
              </p>
              <p className="mt-2 font-display text-lg font-extrabold uppercase">{s.title}</p>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile / tablet: vertical */}
      <ol className="relative lg:hidden">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-1 bg-linear-to-b from-green via-line-strong to-danger" />
        {stops.map((s, i) => (
          <li key={s.title} className="rv relative pb-9 pl-10 last:pb-0" style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span
              aria-hidden="true"
              className={`absolute top-1 left-0 block size-[18px] rotate-45 ${i === 0 ? "bg-green" : i === 3 ? "border-2 border-fg bg-bg" : "border-2 border-line-strong bg-bg"}`}
            />
            {i === 0 && (
              <span className="mb-2 inline-flex items-center gap-2 bg-green px-2.5 py-1 font-display text-[0.62rem] font-bold tracking-[0.16em] text-ink uppercase">
                Now: before the damage
              </span>
            )}
            {i === 3 && (
              <span className="mb-2 inline-block bg-fg px-2.5 py-1 font-display text-[0.62rem] font-bold tracking-[0.16em] text-bg uppercase">
                After: the old call
              </span>
            )}
            <p className="flex items-center gap-2.5 font-display text-lg font-extrabold uppercase">
              <s.icon className="size-5 shrink-0" />
              {s.title}
            </p>
            <p className="mt-1.5 leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </InView>
  );
}
