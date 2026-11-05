import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Ridges } from "./brand";
import { Mail, MapPin, Phone } from "./icons";
import { Logo } from "./logo";
import { Container } from "./ui";

/* Always charcoal, with the card's painted green edge along the top. */
export function SiteFooter() {
  return (
    <footer data-theme="dark" className="grain relative overflow-hidden bg-ink text-muted">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-green" />
      <Ridges className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full" />

      <Container className="relative grid gap-12 pt-20 pb-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Logo variant="white" className="h-16 w-auto" />
          <p className="mt-6 font-display text-xl text-white italic">
            The Difference is <span className="font-extrabold text-green">Knowing.</span>
          </p>
          <p className="mt-4 max-w-sm leading-relaxed">{site.summary}</p>
        </div>

        <div className="md:col-span-4">
          <h2 className="label text-white">Contact</h2>
          <ul className="mt-6 space-y-4">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-3 hover:text-white">
                <Phone className="size-4 text-green" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="inline-flex items-center gap-3 break-all hover:text-white">
                <Mail className="size-4 shrink-0 text-green" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-green" />
              <span>
                {site.address}
                <br />
                <span className="text-sm">{site.serviceArea}</span>
              </span>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="label text-white">Pages</h2>
          <ul className="mt-6 space-y-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-sm font-semibold tracking-[0.12em] uppercase transition-colors hover:text-green"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="relative border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-[0.8rem] md:flex-row md:items-center md:justify-between">
          <p>Engineering reviews are provided by our sister company, {site.sisterCompany}.</p>
          <p>© 2026 Elevation Inspections. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
