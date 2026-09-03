import type { CSSProperties } from "react";
import type { Accent } from "@/content/metrics";

const ACCENT_VARS: Record<Accent, string> = {
  iris: "var(--color-brand-iris)",
  cyan: "var(--color-brand-cyan)",
  violet: "var(--color-brand-violet)",
  mint: "var(--color-brand-mint)",
  gold: "var(--color-brand-gold)",
};

/**
 * Accent colours are applied through a CSS variable rather than generated class
 * names, so Tailwind's scanner never has to see a dynamic string.
 */
export function accentStyle(accent: Accent): CSSProperties {
  return { "--accent": ACCENT_VARS[accent] } as CSSProperties;
}
