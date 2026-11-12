/*
  Membership pricing and terms, from Rebekah's price list and notes, and the Inspection Agreement.

  - Yearly price by the home's square footage (below). 8,001+ sq ft: call for pricing.
  - To join: a one-time startup deposit equal to the yearly fee, plus the first year,
    due when the agreement is signed (Agreement 4.a.i).
  - Renewal years: pay yearly, or monthly on the payment plan: yearly fee / 12, plus a
    monthly administration fee (Agreement 4.a.ii; fee amount from Rebekah).
  - Administrative charge (refunds and transfers): the greater of $100 or one-twelfth of the
    yearly fee (Agreement 3.d.iii and 14).
*/
export const PLAN_ADMIN_FEE = 25; // per month, on the payment plan
export const ADMIN_CHARGE_MIN = 100; // or one-twelfth of the yearly fee, whichever is greater

export type PriceBand = {
  label: string; // square feet
  upTo: number | null; // null = top band
  annual: number | null; // null = call for pricing
};

export const priceBands: PriceBand[] = [
  { label: "Up to 1,500", upTo: 1500, annual: 650 },
  { label: "1,501 to 2,000", upTo: 2000, annual: 750 },
  { label: "2,001 to 2,500", upTo: 2500, annual: 850 },
  { label: "2,501 to 3,000", upTo: 3000, annual: 950 },
  { label: "3,001 to 3,500", upTo: 3500, annual: 1050 },
  { label: "3,501 to 4,000", upTo: 4000, annual: 1150 },
  { label: "4,001 to 5,000", upTo: 5000, annual: 1250 },
  { label: "5,001 to 6,000", upTo: 6000, annual: 1350 },
  { label: "6,001 to 7,000", upTo: 7000, annual: 1450 },
  { label: "7,001 to 8,000", upTo: 8000, annual: 1550 },
  { label: "8,001 and up", upTo: null, annual: null },
];

/* Lowest yearly price, for "starting at" copy */
export const startingPrice = Math.min(...priceBands.flatMap((b) => (b.annual === null ? [] : [b.annual])));

/* "$650", "$1,050", "$79.17" */
export function money(n: number) {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

/* Payment plan per month: yearly / 12 + the admin fee, to the cent */
export function planMonthly(annual: number) {
  return Math.round((annual / 12 + PLAN_ADMIN_FEE) * 100) / 100;
}
