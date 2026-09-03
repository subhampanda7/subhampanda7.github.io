import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsExplorer } from "./SkillsExplorer";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title="The toolkit, grouped by"
        titleAccent="what it solves"
        description="Pick a category to see what I actually reach for. Dotted entries are the ones I use most days."
      />

      <Reveal className="mt-14 lg:mt-16">
        <SkillsExplorer />
      </Reveal>
    </Section>
  );
}
