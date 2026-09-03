"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Cursor-tracked radial highlight. */
  spotlight?: boolean;
  /** Gradient hairline that fades in on hover. */
  ring?: boolean;
};

export function Card({
  children,
  className,
  style,
  spotlight = true,
  ring = true,
}: CardProps) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={spotlight ? onPointerMove : undefined}
      style={style}
      className={cn(
        "relative overflow-hidden rounded-3xl glass",
        "transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        spotlight && "spotlight",
        ring && "gradient-ring",
        className,
      )}
    >
      {children}
    </div>
  );
}
