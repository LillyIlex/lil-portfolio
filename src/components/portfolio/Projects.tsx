import { projects } from "@/data/projects";
import { sections } from "@/data/content";
import { Card } from "@/components/base/Card";
import { Reveal } from "@/components/base/Reveal";
import { Section, SectionHeader } from "@/components/base/Section";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeader {...sections.projects} />

      <div className="grid items-start gap-5 sm:grid-cols-2 sm:gap-8">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 120}>
            <Card variant="project" data={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
