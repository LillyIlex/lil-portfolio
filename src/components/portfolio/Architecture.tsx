import { architecture } from "@/data/architecture";
import { sections } from "@/data/content";
import { Card } from "@/components/base/Card";
import { Reveal } from "@/components/base/Reveal";
import { Section, SectionHeader } from "@/components/base/Section";

export function Architecture() {
  return (
    <Section width="lg">
      <SectionHeader {...sections.approach} />

      <ol className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {architecture.steps.map((step, index) => (
          <Reveal key={step.title} delay={(index % 2) * 120}>
            <Card variant="approach" data={step} index={index} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export default Architecture;