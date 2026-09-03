"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { registerLenis } from "@/lib/smooth-scroll";

/**
 * Momentum scrolling. Skipped entirely when the visitor asks for reduced
 * motion, which leaves the browser's native scrolling in place.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    registerLenis(lenis);

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      registerLenis(null);
    };
  }, []);

  return null;
}
