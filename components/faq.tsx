import type { ReactNode } from "react";
import { CaretDown } from "./icons";

/* Accordion built on <details>: works without JavaScript; one open at a time. */
export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="border-b border-line">
      {items.map((item, i) => (
        <details key={item.q} name="faq" className="faq group border-t border-line" open={i === 0}>
          <summary className="flex items-center justify-between gap-6 py-6 font-display text-lg font-bold transition-colors hover:text-muted sm:text-xl">
            {item.q}
            {/* Down arrow; flips up when the answer is open */}
            <CaretDown className="faq-icon size-6 shrink-0 text-muted transition-colors group-hover:text-fg group-open:text-fg" />
          </summary>
          <div className="max-w-3xl pb-7 text-lg leading-relaxed text-muted sm:pr-16">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
