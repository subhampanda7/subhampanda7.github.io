import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Education } from "@/components/sections/education/Education";
import { ExperienceSection } from "@/components/sections/experience/Experience";
import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";
import { Skills } from "@/components/sections/skills/Skills";
import { SectionDivider } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Contact />
    </>
  );
}
