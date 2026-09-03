import { Card } from "@/components/ui/Card";
import { RichText } from "@/components/ui/RichText";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutParagraphs, currentlyFacts, metrics } from "@/content/metrics";
import { site } from "@/content/site";
import { LatencyCard } from "./LatencyCard";
import { MetricCard } from "./MetricCard";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Systems that hold up"
        titleAccent="under load"
        description="Three years of backend work, measured the only way that matters — in latency, uptime and hours other people stopped losing."
      />

      <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Card className="h-full p-6 sm:p-8" spotlight={false}>
            <div className="space-y-5 text-[0.95rem] leading-relaxed text-fg-muted sm:text-base">
              {aboutParagraphs.map((paragraph, index) => (
                <p key={index}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <Card className="h-full p-6 sm:p-8">
            <p className="font-mono text-[0.68rem] tracking-[0.2em] text-fg-subtle uppercase">
              Currently
            </p>

            <dl className="mt-6 divide-y divide-line">
              {currentlyFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0"
                >
                  <dt className="text-sm text-fg-subtle">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium text-fg">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center gap-2.5 rounded-2xl border border-brand-mint/20 bg-brand-mint/[0.06] px-4 py-3">
              <span
                aria-hidden
                className="animate-status size-2 shrink-0 rounded-full bg-brand-mint"
              />
              <p className="text-sm text-fg-muted">
                <span className="font-medium text-fg">{site.availability}</span>{" "}
                — backend & distributed systems roles
              </p>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.05} className="lg:col-span-5">
          <LatencyCard className="h-full" />
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7 xl:grid-cols-3">
          {metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <MetricCard metric={metric} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
