import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./icons";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[76rem] px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

/* "LEAD INSPECTOR"-style label with the short green rule from the business card. */
export function Label({
  children,
  className = "",
  bar = "bg-green",
}: {
  children: ReactNode;
  className?: string;
  bar?: string;
}) {
  return (
    <div className={`mb-6 ${className}`}>
      <p className="label text-muted">{children}</p>
      <span aria-hidden="true" className={`mt-3 block h-[3px] w-16 ${bar}`} />
    </div>
  );
}

type Variant = "primary" | "outline" | "ink";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden font-display text-[0.78rem] font-bold tracking-[0.16em] uppercase whitespace-nowrap transition-colors duration-300";

const sizes = {
  md: "h-[3.25rem] px-7",
  sm: "h-10 px-4 text-[0.7rem] tracking-[0.14em]",
};

const variants: Record<Variant, string> = {
  // Green fill always takes charcoal text.
  primary: "chamfer bg-green text-ink hover:bg-green-bright",
  // Outline that fills with the text color on hover.
  outline:
    "border-[1.5px] border-line-strong text-fg hover:border-fg hover:text-bg before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-fg before:transition-transform before:duration-500 before:ease-[var(--ease)] hover:before:scale-x-100",
  ink: "chamfer bg-ink text-white hover:bg-ink-3",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className">) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
    </>
  );
  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

/* Uppercase text link with an underline that wipes in. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/link inline-flex items-center gap-2 font-display text-[0.8rem] font-bold tracking-[0.16em] text-fg uppercase ${className}`}
    >
      <span className="relative pb-1">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-green transition-transform duration-500 ease-[var(--ease)] group-hover/link:scale-x-0"
        />
      </span>
      <ArrowRight className="size-4 text-green transition-transform duration-300 group-hover/link:translate-x-1" />
    </Link>
  );
}
