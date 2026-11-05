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
  priority = false,
}: {
  className?: string;
  variant?: "auto" | "white";
  priority?: boolean;
}) {
  const sizes = "(min-width: 1024px) 200px, 150px";
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Elevation Inspections, home">
      {variant === "auto" && (
        <Image
          src={logoDark}
          alt="Elevation Inspections"
          className={`${className} dark:hidden`}
          priority={priority}
          sizes={sizes}
        />
      )}
      <Image
        src={logoWhite}
        alt={variant === "auto" ? "" : "Elevation Inspections"}
        aria-hidden={variant === "auto" ? true : undefined}
        className={`${className} ${variant === "auto" ? "hidden dark:block" : ""}`}
        priority={priority}
        sizes={sizes}
      />
    </Link>
  );
}
