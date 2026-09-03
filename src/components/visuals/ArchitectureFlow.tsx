import {
  Database,
  Layers,
  Send,
  Server,
  Smartphone,
  Waypoints,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Fragment } from "react";
import type { Accent } from "@/content/metrics";
import type { FlowNode, NodeKind } from "@/content/projects";
import { accentStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

const KIND_META: Record<NodeKind, { icon: LucideIcon; accent: Accent }> = {
  client: { icon: Smartphone, accent: "cyan" },
  gateway: { icon: Waypoints, accent: "iris" },
  service: { icon: Server, accent: "iris" },
  queue: { icon: Layers, accent: "violet" },
  cache: { icon: Zap, accent: "gold" },
  store: { icon: Database, accent: "mint" },
  channel: { icon: Send, accent: "violet" },
};

function Node({ node, compact }: { node: FlowNode; compact: boolean }) {
  const { icon: Icon, accent } = KIND_META[node.kind];

  return (
    <div
      style={accentStyle(accent)}
      className={cn(
        "flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-line bg-white/[0.025] px-3.5 py-3",
        "transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.05]",
        !compact &&
          "lg:flex-col lg:items-center lg:gap-2 lg:px-2.5 lg:py-4 lg:text-center",
      )}
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-xl border text-[var(--accent)]"
        style={{
          borderColor: "color-mix(in oklab, var(--accent) 32%, transparent)",
          backgroundColor: "color-mix(in oklab, var(--accent) 12%, transparent)",
        }}
      >
        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.8rem] leading-tight font-medium text-fg">
          {node.label}
        </span>
        {node.sub && (
          <span className="mt-1 block font-mono text-[0.62rem] leading-tight text-fg-subtle">
            {node.sub}
          </span>
        )}
      </span>
    </div>
  );
}

function Connector({ index, compact }: { index: number; compact: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center pl-[1.4rem]",
        !compact && "lg:w-8 lg:justify-center lg:pl-0",
      )}
      style={{ "--flow-delay": `${index * 0.3}s` } as React.CSSProperties}
    >
      <span
        className={cn(
          "relative block h-6 w-px bg-line",
          !compact && "lg:h-px lg:w-8",
        )}
      >
        <span
          className={cn(
            "flow-dot absolute size-1.5 rounded-full bg-brand-iris shadow-[0_0_10px_2px_rgba(109,125,255,0.55)]",
            compact && "flow-dot-vertical",
          )}
        />
      </span>
    </div>
  );
}

export function ArchitectureFlow({
  nodes,
  label = "Request path",
  compact = false,
  className,
}: {
  nodes: FlowNode[];
  label?: string;
  /** Keeps the chain vertical at every breakpoint, for narrow cards. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-3xl border border-line bg-ink-raised/60 p-5 sm:p-6",
        className,
      )}
    >
      <div aria-hidden className="grid-lines absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_30%,var(--color-ink)_100%)]"
      />

      <div className="relative">
        <figcaption className="mb-5 flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-fg-subtle uppercase">
          <span className="size-1.5 rounded-full bg-brand-cyan" aria-hidden />
          {label}
        </figcaption>

        <div
          className={cn(
            "flex flex-col",
            !compact && "lg:flex-row lg:items-stretch",
          )}
        >
          {nodes.map((node, index) => (
            <Fragment key={node.label}>
              <Node node={node} compact={compact} />
              {index < nodes.length - 1 && (
                <Connector index={index} compact={compact} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </figure>
  );
}
