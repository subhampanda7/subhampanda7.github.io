"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up once the number scrolls into view. The final value is rendered on
 * the server so crawlers and no-JS visitors still see the real figure.
 */
export function Counter({
  value,
  decimals = 0,
  prefix,
  suffix,
  duration = 1.5,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  const format = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const [display, setDisplay] = useState(() => format(value));

  // Reset to zero before first paint so the count-up has somewhere to travel.
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    setDisplay(format(0));
  }, []);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(format(latest)),
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, decimals]);

  return (
    <span ref={ref} className={cn("numeric", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
