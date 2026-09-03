"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function RotatingText({
  phrases,
  interval = 3000,
  className,
}: {
  phrases: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % phrases.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [phrases.length, interval]);

  return (
    // Outgoing and incoming phrases overlap (absolute + sync mode) so the line
    // is never momentarily blank.
    <span
      className={cn("relative block overflow-hidden", className)}
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          className="absolute inset-0 block whitespace-nowrap"
          initial={{ opacity: 0, y: "70%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-70%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
      {/* Reserves intrinsic width and gives crawlers real text. */}
      <span className="invisible block whitespace-nowrap">{phrases[0]}</span>
    </span>
  );
}
