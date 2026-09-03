import { Card } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import type { Metric } from "@/content/metrics";
import { accentStyle } from "@/lib/accents";

export function MetricCard({ metric }: { metric: Metric }) {
  const { icon: Icon } = metric;

  return (
    <Card
      style={accentStyle(metric.accent)}
      className="h-full p-5 hover:-translate-y-1 sm:p-6"
    >
      <span
        className="grid size-9 place-items-center rounded-xl border text-[var(--accent)]"
        style={{
          borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)",
          backgroundColor: "color-mix(in oklab, var(--accent) 12%, transparent)",
        }}
      >
        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
      </span>

      <p className="font-display mt-5 text-3xl leading-none font-semibold text-fg sm:text-[2.1rem]">
        <Counter
          value={metric.value}
          decimals={metric.decimals}
          prefix={metric.prefix}
          suffix={metric.suffix}
        />
      </p>

      <p className="mt-2.5 text-sm font-medium text-fg">{metric.label}</p>
      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-fg-subtle">
        {metric.detail}
      </p>
    </Card>
  );
}
