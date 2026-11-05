"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/*
  Marks itself data-inview="true" the first time it scrolls into view.
  Children animate with the .rv / .draw / .pop / .strike classes in globals.css.
*/
export function InView({
  as = "div",
  className,
  style,
  children,
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
  id,
}: {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.inview = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inview = "true";
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={style} id={id}>
      {children}
    </Tag>
  );
}

/* Counts up from 0 when visible. Renders the final value on the server. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1500,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const text = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;
    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {text(to)}
    </span>
  );
}
