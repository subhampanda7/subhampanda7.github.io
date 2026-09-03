import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Consistent vertical rhythm and gutters for every top-level section. */
export function Section({
  id,
  children,
  className,
  contentClassName,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-24 sm:py-28 lg:py-36", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-12",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** Thin gradient seam used between sections. */
export function SectionDivider() {
  return (
    <div aria-hidden className="mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
      <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]" />
    </div>
  );
}
