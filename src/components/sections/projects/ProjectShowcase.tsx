import { Sparkles, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { TechPill } from "@/components/ui/TechPill";
import { ArchitectureFlow } from "@/components/visuals/ArchitectureFlow";
import type { Project } from "@/content/projects";

export function ProjectShowcase({ project }: { project: Project }) {
  return (
    <Reveal>
      <Card className="p-6 sm:p-8 lg:p-10">
        <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[0.68rem] tracking-[0.18em] text-fg-subtle uppercase">
                {project.context}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.06] px-2.5 py-0.5 font-mono text-[0.62rem] tracking-wide text-fg-muted uppercase">
                  <Sparkles className="size-3 text-brand-cyan" aria-hidden />
                  Featured
                </span>
              )}
            </div>
            <h3 className="mt-3 text-2xl font-semibold sm:text-3xl lg:text-[2.1rem]">
              {project.title}
            </h3>
            <p className="mt-2 text-base text-fg-muted sm:text-lg">
              {project.tagline}
            </p>
          </div>

          <dl className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-white/[0.04] sm:w-auto sm:shrink-0 sm:grid-cols-3">
            {project.impact.map((chip) => (
              <div key={chip.label} className="bg-ink-raised px-4 py-3.5">
                <dt className="sr-only">{chip.label}</dt>
                <dd>
                  <span className="numeric font-display block text-sm font-semibold text-gradient sm:text-base">
                    {chip.value}
                  </span>
                  <span className="mt-1 block text-[0.7rem] text-fg-subtle">
                    {chip.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-9 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h4 className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.2em] text-fg-subtle uppercase">
              <Target className="size-3.5 text-brand-violet" aria-hidden />
              The problem
            </h4>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">
              {project.problem}
            </p>

            <p className="mt-6 rounded-2xl border border-line bg-white/[0.02] px-4 py-3 text-[0.85rem] text-fg-subtle">
              <span className="font-mono text-[0.68rem] tracking-[0.16em] text-fg-subtle uppercase">
                Scale
              </span>
              <span className="mt-1.5 block text-fg-muted">{project.scale}</span>
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[0.68rem] tracking-[0.2em] text-fg-subtle uppercase">
              Approach
            </h4>
            <ul className="mt-4 space-y-3">
              {project.approach.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.92rem] leading-relaxed text-fg-muted"
                >
                  <span
                    aria-hidden
                    className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-brand-cyan/70"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ArchitectureFlow
          nodes={project.flow}
          label={`${project.title} — data flow`}
          className="mt-9"
        />

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </div>
      </Card>
    </Reveal>
  );
}
