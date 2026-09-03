import type { CSSProperties } from "react";
import { site } from "@/content/site";

/** Opaque enough to stay legible where the cards overlap the portrait. */
const PANEL =
  "rounded-2xl border border-line-strong bg-ink-raised/85 backdrop-blur-xl shadow-[0_18px_50px_-18px_rgba(0,0,0,0.95)]";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * Server component on purpose: the portrait is the LCP element, so its
 * entrance and float loops are CSS rather than JS-gated animations.
 */
export function HeroPortrait() {
  return (
    <div className="hero-portrait relative mx-auto w-full max-w-[17rem] sm:max-w-[21rem] lg:max-w-[27rem]">
      {/* Halo behind the cutout */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,125,255,0.32),rgba(168,85,247,0.14)_45%,transparent_70%)] blur-2xl"
      />

      {/* Concentric guide rings */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 aspect-square w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
      />

      <picture>
        <source
          type="image/avif"
          srcSet="/img/profile-480.avif 480w, /img/profile-720.avif 720w"
          sizes="(min-width: 1024px) 27rem, (min-width: 640px) 21rem, 17rem"
        />
        <source
          type="image/webp"
          srcSet="/img/profile-480.webp 480w, /img/profile-720.webp 720w"
          sizes="(min-width: 1024px) 27rem, (min-width: 640px) 21rem, 17rem"
        />
        <img
          src="/img/profile-720.png"
          alt={`${site.name} — ${site.role}`}
          width={720}
          height={720}
          fetchPriority="high"
          decoding="async"
          className="relative w-full [mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)] drop-shadow-[0_28px_60px_rgba(0,0,0,0.55)]"
        />
      </picture>

      {/* Floating readouts — the portrait doubles as a status panel. */}
      <div
        style={delay(0)}
        className={`animate-float absolute top-[20%] -left-3 hidden px-3.5 py-2.5 sm:block lg:-left-10 ${PANEL}`}
      >
        <p className="font-mono text-[0.6rem] tracking-[0.16em] text-fg-subtle uppercase">
          API p50
        </p>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="numeric font-display text-lg font-semibold text-fg">
            280
          </span>
          <span className="text-[0.7rem] text-fg-muted">ms</span>
          <span className="ml-0.5 rounded-full bg-brand-mint/15 px-1.5 py-0.5 font-mono text-[0.6rem] text-brand-mint">
            −65%
          </span>
        </p>
      </div>

      <div
        style={delay(1.6)}
        className={`animate-float absolute -right-2 bottom-[24%] hidden px-3.5 py-2.5 sm:block lg:-right-9 ${PANEL}`}
      >
        <p className="font-mono text-[0.6rem] tracking-[0.16em] text-fg-subtle uppercase">
          Uptime
        </p>
        <p className="numeric font-display mt-1 text-lg font-semibold text-fg">
          99.9%
        </p>
      </div>

      <div
        style={delay(0.8)}
        className={`animate-float absolute bottom-[3%] -left-1 hidden items-center gap-2 !rounded-full py-2 pr-4 pl-2.5 lg:flex ${PANEL}`}
      >
        <span
          aria-hidden
          className="animate-status size-2 rounded-full bg-brand-mint"
        />
        <span className="text-xs text-fg-muted">
          Currently at <span className="font-medium text-fg">Paytm</span>
        </span>
      </div>
    </div>
  );
}
