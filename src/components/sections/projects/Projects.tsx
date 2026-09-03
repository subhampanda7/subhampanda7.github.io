import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { compactProjects, showcaseProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectShowcase } from "./ProjectShowcase";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        eyebrow="Projects"
        title="What I've"
        titleAccent="built"
        description="The problem, the architecture, and the number that changed — with the data flow drawn out, because that is where the design actually lives."
      />

      <div className="mt-14 space-y-6 lg:mt-16">
        {showcaseProjects.map((project) => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>

      <Stagger className="mt-6 grid gap-6 lg:grid-cols-2">
        {compactProjects.map((project) => (
          <StaggerItem key={project.id} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10">
        <p className="text-center text-sm text-fg-subtle">
          More experiments and older work live on{" "}
          <a
            href="https://github.com/subhampanda7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-brand-iris"
          >
            GitHub
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}
