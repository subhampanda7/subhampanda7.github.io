import { cn } from "@/lib/utils";

export function TechPill({
  label,
  core = false,
  size = "sm",
  className,
}: {
  label: string;
  core?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-mono tracking-tight",
        "transition-colors duration-300",
        size === "md"
          ? "px-4 py-2 text-[0.78rem]"
          : "px-3 py-1.5 text-[0.7rem]",
        core
          ? "border-white/15 bg-white/[0.06] text-fg hover:border-white/25 hover:bg-white/10"
          : "border-line bg-white/[0.02] text-fg-muted hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {core && (
        <span
          aria-hidden
          className="mr-2 size-1.5 rounded-full bg-[image:var(--gradient-brand)]"
        />
      )}
      {label}
    </span>
  );
}
