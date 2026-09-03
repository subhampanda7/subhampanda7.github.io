import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/content/experience";
import { ExperienceItem } from "./ExperienceItem";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Where I've"
        titleAccent="shipped"
        description="Two teams, one throughline — take something that works on a whiteboard and make it survive real traffic."
      />

      <ol className="mt-14 lg:mt-16">
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            isLast={index === experiences.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}
