"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/lib/site";
import { PeakMark } from "./brand";
import { Close, Mail, Menu, Phone } from "./icons";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button, Container } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock scrolling and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Top bar: always charcoal, like the card front */}
      <div data-theme="dark" className="bg-ink text-[0.8rem] text-muted">
        <Container className="flex h-9 items-center justify-between gap-4 whitespace-nowrap">
          <p className="flex items-center gap-2 truncate">
            <PeakMark className="size-3 shrink-0 text-green" />
            Serving Sevier County, TN
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.emailHref}
              className="hidden items-center gap-2 hover:text-white md:inline-flex"
            >
              <Mail className="size-3.5 text-green" />
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-white hover:text-green"
            >
              <Phone className="size-3.5 text-green" />
              {site.phone}
            </a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
        <Container className="flex h-[4.25rem] items-center justify-between gap-3 lg:h-[5.25rem]">
          <Logo className="h-8 w-auto min-[380px]:h-9 lg:h-12" priority />

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-3.5 py-2 font-display text-[0.74rem] font-semibold tracking-[0.18em] uppercase transition-colors lg:px-4 ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left bg-green transition-transform duration-300 lg:inset-x-4 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <ThemeToggle className="ml-3" />
            <Button href="/register" size="sm" className="ml-3 lg:h-11 lg:px-5">
              Register Now
            </Button>
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <Button href="/register" size="sm" className="max-[359px]:hidden">
              Register Now
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="inline-flex size-10 items-center justify-center border border-line-strong text-fg"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>

        {/* Scroll progress, in browsers that support scroll-driven animation */}
        <span aria-hidden="true" className="progress absolute inset-x-0 -bottom-px h-[2px] bg-green" />
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-theme="dark"
          className="grain fixed inset-0 z-[60] flex flex-col bg-ink text-fg md:hidden"
        >
          <Container className="flex h-[4.25rem] items-center justify-between">
            <Logo variant="white" className="h-9 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-10 items-center justify-center border border-line-strong"
              autoFocus
            >
              <Close className="size-5" />
            </button>
          </Container>
          <nav aria-label="Main" className="flex-1 overflow-y-auto">
            <Container className="pt-8">
              <ul>
                {mainNav.map((item, i) => (
                  <li
                    key={item.href}
                    className="load-up border-b border-line"
                    style={{ ["--d" as string]: `${i * 70}ms` }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex items-center justify-between py-5 font-display text-3xl font-extrabold uppercase"
                    >
                      {item.label}
                      {pathname === item.href && <PeakMark className="size-6 text-green" />}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="load-up mt-8 flex flex-col gap-4" style={{ ["--d" as string]: "320ms" }}>
                <Button href="/register" arrow onClick={() => setOpen(false)}>
                  Register Now
                </Button>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 text-lg font-semibold">
                  <Phone className="size-5 text-green" />
                  {site.phone}
                </a>
                <div className="flex items-center gap-3 text-muted">
                  <ThemeToggle /> <span className="text-sm">Light / dark</span>
                </div>
              </div>
            </Container>
          </nav>
        </div>
      )}
    </>
  );
}
