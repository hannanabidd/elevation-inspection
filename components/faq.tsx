import type { ReactNode } from "react";

/* Accordion built on <details>: works without JavaScript; one open at a time. */
export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="border-b border-line">
      {items.map((item, i) => (
        <details key={item.q} name="faq" className="faq group border-t border-line" open={i === 0}>
          <summary className="flex items-center justify-between gap-6 py-6 font-display text-lg font-bold transition-colors hover:text-muted sm:text-xl">
            {item.q}
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center border-[1.5px] border-line-strong text-2xl leading-none font-light transition-colors group-open:border-green group-open:bg-green group-open:text-ink"
            >
              <span className="faq-icon -mt-0.5 inline-block">+</span>
            </span>
          </summary>
          <div className="max-w-3xl pr-16 pb-7 text-lg leading-relaxed text-muted">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
