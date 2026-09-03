import { Card } from "@/components/ui/Card";
import { TechPill } from "@/components/ui/TechPill";
import { ArchitectureFlow } from "@/components/visuals/ArchitectureFlow";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-7">
      <span className="font-mono text-[0.66rem] tracking-[0.18em] text-fg-subtle uppercase">
        {project.context}
      </span>
      <h3 className="mt-3 text-xl font-semibold sm:text-[1.4rem]">
        {project.title}
      </h3>
      <p className="mt-2 text-[0.92rem] text-fg-muted">{project.tagline}</p>

      <p className="mt-5 text-[0.88rem] leading-relaxed text-fg-subtle">
        {project.problem}
      </p>

      <ul className="mt-5 space-y-2.5">
        {project.approach.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-[0.88rem] leading-relaxed text-fg-muted"
          >
            <span
              aria-hidden
              className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-brand-cyan/70"
            />
            {item}
          </li>
        ))}
      </ul>

      <ArchitectureFlow
        nodes={project.flow}
        label="Data flow"
        compact
        className="mt-6"
      />

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-2">
          {project.impact.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-baseline gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5"
            >
              <span className="numeric font-mono text-[0.72rem] font-medium text-gradient">
                {chip.value}
              </span>
              <span className="text-[0.7rem] text-fg-subtle">{chip.label}</span>
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </div>
      </div>
    </Card>
  );
}
