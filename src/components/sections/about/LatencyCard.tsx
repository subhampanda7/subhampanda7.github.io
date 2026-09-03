"use client";

import { motion } from "motion/react";
import { TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { latencyMetric } from "@/content/metrics";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, margin: "0px 0px -60px 0px" } as const;

function Bar({
  label,
  value,
  width,
  tone,
  delay,
}: {
  label: string;
  value: number;
  width: string;
  tone: "muted" | "brand";
  delay: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[0.68rem] tracking-[0.16em] text-fg-subtle uppercase">
          {label}
        </span>
        <span
          className={cn(
            "numeric font-display text-sm font-medium",
            tone === "brand" ? "text-fg" : "text-fg-muted",
          )}
        >
          <Counter value={value} suffix={latencyMetric.unit} />
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          className={cn(
            "h-full rounded-full",
            tone === "brand"
              ? "bg-[image:var(--gradient-brand)] shadow-[0_0_18px_rgba(109,125,255,0.55)]"
              : "bg-white/15",
          )}
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function LatencyCard({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col justify-between p-6 sm:p-7", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] tracking-[0.2em] text-fg-subtle uppercase">
            Headline result
          </p>
          <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
            {latencyMetric.label}
          </h3>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-mint/25 bg-brand-mint/10 px-2.5 py-1 font-mono text-[0.7rem] text-brand-mint">
          <TrendingDown className="size-3.5" aria-hidden />−
          {latencyMetric.reduction}%
        </span>
      </div>

      <div className="mt-7 space-y-5">
        <Bar
          label="Before"
          value={latencyMetric.before}
          width="100%"
          tone="muted"
          delay={0.1}
        />
        <Bar
          label="After"
          value={latencyMetric.after}
          width="35%"
          tone="brand"
          delay={0.35}
        />
      </div>

      <p className="mt-7 text-sm leading-relaxed text-fg-muted">
        {latencyMetric.detail}
      </p>
    </Card>
  );
}
