export const site = {
  name: "Elevation Inspections",
  tagline: "The Difference is Knowing.",
  summary:
    "Twice-a-year structural inspections for short-term rentals, backed by engineers.",
  phone: "(865) 801-3331",
  phoneHref: "tel:+18658013331",
  email: "connect@ElevationTNInspections.com",
  emailHref: "mailto:connect@ElevationTNInspections.com",
  address: "318 Cherry St., Sevierville, TN 37862",
  serviceArea:
    "Serving Sevierville, Pigeon Forge, Gatlinburg and surrounding Sevier County",
  sisterCompany: "Elevation Engineering & Design",
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
] as const;
