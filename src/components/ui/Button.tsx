"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useRef } from "react";
import { scrollToId } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "text-white bg-[image:var(--gradient-brand)] shadow-[0_10px_36px_-12px_rgba(109,125,255,0.75)] hover:shadow-[0_16px_46px_-12px_rgba(109,125,255,0.9)] hover:brightness-110",
  secondary:
    "glass text-fg hover:border-line-strong hover:bg-white/[0.07] hover:text-white",
  ghost: "text-fg-muted hover:text-fg",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** Section id to smooth-scroll to. Renders a real anchor, so it still works without JS. */
  scrollTo?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  onClick,
  scrollTo,
  variant = "primary",
  size = "md",
  className,
  magnetic = false,
  external = false,
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 240, damping: 20, mass: 0.35 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const handleMove = useCallback(
    (event: React.PointerEvent) => {
      if (!magnetic || event.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * 0.25);
      y.set((event.clientY - (rect.top + rect.height / 2)) * 0.3);
    },
    [magnetic, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap",
    "transition-[color,background-color,border-color,box-shadow,filter] duration-300",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const inner = (
    <span className="inline-flex items-center gap-2">{children}</span>
  );

  return (
    <motion.div
      ref={ref}
      className="inline-flex"
      style={magnetic ? { x: springX, y: springY } : undefined}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {scrollTo ? (
        <a
          href={`#${scrollTo}`}
          className={classes}
          aria-label={ariaLabel}
          onClick={(event) => {
            event.preventDefault();
            scrollToId(scrollTo);
          }}
        >
          {inner}
        </a>
      ) : href ? (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
