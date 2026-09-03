import type Lenis from "lenis";

/** Offset that keeps a section title clear of the floating header. */
export const HEADER_OFFSET = 88;

let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { offset: -HEADER_OFFSET, duration: 1.15 });
    return;
  }

  // Fallback for reduced-motion visitors, where Lenis is never started.
  target.scrollIntoView({ block: "start" });
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.2 });
    return;
  }
  window.scrollTo({ top: 0 });
}
