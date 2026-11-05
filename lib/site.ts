export const site = {
  name: "Elevation Inspections",
  tagline: "The Difference is Knowing.",
  summary:
    "Twice-a-year structural inspections for short-term rentals, backed by engineers.",
  phone: "(865) 801-3331",
  phoneHref: "tel:+18658013331",
  email: "connect@elevationtninspections.com",
  emailHref: "mailto:connect@elevationtninspections.com",
  address: "318 Cherry St., Sevierville, TN 37862",
  addressLines: ["318 Cherry St.", "Sevierville, TN 37862"],
  mapsHref: "https://www.google.com/maps/search/?api=1&query=318+Cherry+St+Sevierville+TN+37862",
  serviceArea:
    "Serving Sevierville, Pigeon Forge, Gatlinburg and surrounding Sevier County",
  sisterCompany: "Elevation Engineering & Design",
} as const;

/*
  Placeholders still to confirm with Rebekah (see "Items to confirm before launch"
  in the copy doc). Search the codebase for "[" to find where they render.
*/
export const pending = {
  // How fast the team follows up after a registration or message.
  followUp: "[1 business day]",
  // About page. Set to the URL when available; the link is hidden until then.
  engineeringUrl: null as string | null,
} as const;

export const cities = ["Sevierville", "Pigeon Forge", "Gatlinburg", "Other"] as const;
export const propertyTypes = ["Cabin", "House", "Condo", "Other"] as const;
export const billingOptions = ["Monthly", "Annual"] as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
] as const;
