/*
  PLACEHOLDER price list. The size bands and prices are waiting on Rebekah's price list.
  Replace the bracketed values; `upTo` drives the "your home" highlight on the Pricing page.
*/
export type PriceBand = {
  label: string;
  upTo: number | null; // null = top band
  monthly: string | null; // null = "Contact us"
  annual: string | null;
};

export const priceBands: PriceBand[] = [
  { label: "Up to [1,500]", upTo: 1500, monthly: "$[XX]", annual: "$[XXX]" },
  { label: "[1,501 to 2,500]", upTo: 2500, monthly: "$[XX]", annual: "$[XXX]" },
  { label: "[2,501 to 3,500]", upTo: 3500, monthly: "$[XX]", annual: "$[XXX]" },
  { label: "[3,501 to 5,000]", upTo: 5000, monthly: "$[XX]", annual: "$[XXX]" },
  { label: "Over [5,000]", upTo: null, monthly: null, annual: null },
];

export function bandFor(sqft: number) {
  const i = priceBands.findIndex((b) => b.upTo === null || sqft <= b.upTo);
  return i === -1 ? priceBands.length - 1 : i;
}
