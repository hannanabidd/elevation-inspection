import Image from "next/image";
import Link from "next/link";
import logoDark from "@/public/brand/logo-dark.png";
import logoWhite from "@/public/brand/logo-white.png";

/*
  "auto": charcoal logo in the light theme, white logo in the dark theme.
  "white": always the white version (for sections that are always dark).
*/
export function Logo({
  className = "h-11 w-auto",
  variant = "auto",
  eager = false,
}: {
  className?: string;
  variant?: "auto" | "white";
  /* Load right away (header logo); replaces the `priority` prop deprecated in Next 16 */
  eager?: boolean;
}) {
  const sizes = "(min-width: 1024px) 200px, 150px";
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Elevation Inspections, home">
      {variant === "auto" && (
        <Image
          src={logoDark}
          alt="Elevation Inspections"
          className={`${className} dark:hidden`}
          loading={eager ? "eager" : undefined}
          sizes={sizes}
        />
      )}
      <Image
        src={logoWhite}
        alt={variant === "auto" ? "" : "Elevation Inspections"}
        aria-hidden={variant === "auto" ? true : undefined}
        className={`${className} ${variant === "auto" ? "hidden dark:block" : ""}`}
        loading={eager ? "eager" : undefined}
        sizes={sizes}
      />
    </Link>
  );
}
