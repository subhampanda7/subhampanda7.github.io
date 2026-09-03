"use client";

import { useCallback, useRef } from "react";

/**
 * Writes pointer coordinates onto the element as CSS variables so the highlight
 * is painted by the compositor instead of triggering React renders.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}
