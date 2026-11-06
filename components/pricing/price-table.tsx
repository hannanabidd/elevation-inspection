import Link from "next/link";
import { priceBands } from "@/lib/pricing";

/* Copy doc Pricing section 2: one table by square footage. */
export function PriceTable() {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Membership price by home size</caption>
      <thead>
        <tr className="border-b-2 border-fg">
          <th scope="col" className="label py-4 pr-2 text-muted">
            Home size<span className="max-sm:hidden"> (sq ft)</span>
          </th>
          <th scope="col" className="label px-2 py-4 text-muted sm:px-4">
            Monthly
          </th>
          <th scope="col" className="label py-4 pl-2 text-muted sm:pl-4">
            Annual
          </th>
        </tr>
      </thead>
      <tbody>
        {priceBands.map((b) => (
          <tr key={b.label} className="border-b border-line">
            <th scope="row" className="py-5 pr-2 font-display text-[0.95rem] font-extrabold sm:py-6 sm:text-lg">
              {b.label}
            </th>
            {b.monthly && b.annual ? (
              <>
                <td className="px-2 py-5 font-display font-extrabold whitespace-nowrap sm:px-4 sm:py-6">
                  <span className="text-base sm:text-xl">{b.monthly}</span>
                  <span className="text-sm font-bold text-muted"> / mo</span>
                </td>
                <td className="py-5 pl-2 font-display font-extrabold whitespace-nowrap sm:py-6 sm:pl-4">
                  <span className="text-base sm:text-xl">{b.annual}</span>
                  <span className="text-sm font-bold text-muted"> / yr</span>
                </td>
              </>
            ) : (
              <td colSpan={2} className="px-2 py-5 sm:px-4 sm:py-6">
                <Link
                  href="/contact"
                  className="font-display text-base font-extrabold underline decoration-green decoration-2 underline-offset-4 sm:text-lg"
                >
                  Contact us
                </Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
