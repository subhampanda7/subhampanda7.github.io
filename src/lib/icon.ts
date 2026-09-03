import type { ComponentType, SVGProps } from "react";

/** Shared shape for Lucide icons and the hand-rolled brand marks. */
export type SvgIcon = ComponentType<
  SVGProps<SVGSVGElement> & { strokeWidth?: number }
>;
