import { ArrowUpRight, Award } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, recognition } from "@/content/education";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        index="05"
        eyebrow="Education & Recognition"
        title="Where the foundation"
        titleAccent="came from"
      />

      <Stagger className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
        {education.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.id} className="h-full">
              <Card className="flex h-full flex-col p-6 hover:-translate-y-1 sm:p-7">
                <span className="grid size-11 place-items-center rounded-2xl border border-line bg-white/[0.04] text-brand-iris">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>

                <h3 className="mt-6 text-lg font-semibold sm:text-xl">
                  {item.qualification}
                </h3>
                <p className="mt-2 text-sm text-fg-muted">{item.institution}</p>
                <p className="mt-1 text-sm text-fg-subtle">{item.location}</p>

                <p className="mt-auto pt-6 font-mono text-[0.72rem] text-fg-subtle">
                  {item.period}
                </p>
              </Card>
            </StaggerItem>
          );
        })}

        <StaggerItem className="h-full">
          <Card className="flex h-full flex-col border-brand-gold/20 bg-brand-gold/[0.04] p-6 hover:-translate-y-1 sm:p-7">
            <span className="grid size-11 place-items-center rounded-2xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
              <Award className="size-5" strokeWidth={1.75} aria-hidden />
            </span>

            <h3 className="mt-6 text-lg font-semibold sm:text-xl">
              {recognition.title}
            </h3>
            <p className="mt-2 text-sm text-fg-muted">
              {recognition.issuer} · {recognition.date}
            </p>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-fg-subtle">
              {recognition.description}
            </p>

            <a
              href={recognition.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[0.72rem] text-brand-gold transition-colors hover:text-fg"
            >
              View certificate
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </Card>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
