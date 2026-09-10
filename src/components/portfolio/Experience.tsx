
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { sections } from "@/data/content";
import { Card } from "@/components/base/Card";
import { Reveal } from "@/components/base/Reveal";
import { Section, SectionHeader } from "@/components/base/Section";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";

export function Experience() {
  return (
    <Section width="lg">
      <SectionHeader {...sections.experience} />

      <div className="space-y-5 sm:space-y-8">
        {experience.map((job, index) => (
          <Reveal key={job.role} delay={index * 100}>
            <Card variant="experience" data={job} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6">
        {education.map((item, index) => (
          <Reveal key={item.title} delay={(index % 2) * 120}>
            <div className="h-full rounded-2xl border border-border bg-card/30 p-5 transition-colors duration-300 hover:border-primary/30 sm:p-6">
              <Paragraph variant="sm" tone="primary" as="span" className="font-medium">
                {item.period}
              </Paragraph>
              <Title as="h3" variant="sm" className="mt-2">
                {item.title}
              </Title>
              <Paragraph variant="sm" className="mt-1">
                {item.institution}
              </Paragraph>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Experience;
