import { Phone } from "@/components/icons";
import { PLAN_ADMIN_FEE, money, planMonthly, priceBands } from "@/lib/pricing";
import { site } from "@/lib/site";

/* Yearly price by home size, with the payment plan worked out from it. */
export function PriceTable() {
  return (
    <>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Yearly membership price by home size, with the monthly payment plan</caption>
        <thead>
          <tr className="border-b-2 border-fg">
            <th scope="col" className="label py-3.5 pr-2 text-muted">
              Home size<span className="max-sm:hidden"> (sq ft)</span>
            </th>
            <th scope="col" className="label px-2 py-3.5 text-muted sm:px-4">
              Yearly
            </th>
            <th scope="col" className="label py-3.5 pl-2 text-muted sm:pl-4">
              Payment plan<span aria-hidden="true">*</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {priceBands.map((b) => (
            <tr key={b.label} className="border-b border-line">
              <th scope="row" className="py-3.5 pr-2 font-display text-sm font-bold sm:py-4 sm:text-base">
                {b.label}
              </th>
              {b.annual !== null ? (
                <>
                  <td className="px-2 py-3.5 font-display font-extrabold whitespace-nowrap sm:px-4 sm:py-4">
                    <span className="text-base sm:text-lg">{money(b.annual)}</span>
                    <span className="text-xs font-bold text-muted sm:text-sm"> / yr</span>
                  </td>
                  <td className="py-3.5 pl-2 font-display font-bold whitespace-nowrap text-muted sm:py-4 sm:pl-4">
                    <span className="text-sm text-fg sm:text-base">{money(planMonthly(b.annual))}</span>
                    <span className="text-xs sm:text-sm"> / mo</span>
                  </td>
                </>
              ) : (
                <td colSpan={2} className="px-2 py-3.5 sm:px-4 sm:py-4">
                  <a
                    href={site.phoneHref}
                    className="group inline-flex items-center gap-2.5 font-display text-sm font-bold whitespace-nowrap sm:text-base"
                  >
                    {/* Hover: the icon square fills green, like the number squares across the site */}
                    <span className="flex size-7 items-center justify-center border border-line-strong transition-colors duration-200 group-hover:border-green group-hover:bg-green group-hover:text-ink group-focus-visible:border-green group-focus-visible:bg-green group-focus-visible:text-ink">
                      <Phone className="size-3.5" />
                    </span>
                    Call for pricing
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        *From your second year: the yearly amount over 12 months, plus a ${PLAN_ADMIN_FEE} monthly
        administration fee.
      </p>
    </>
  );
}
