import { architecture } from "@/data/projects";
import { sections } from "@/data/content";
import { Card } from "@/components/base/Card";
import { Reveal } from "@/components/base/Reveal";
import { Section, SectionHeader } from "@/components/base/Section";
import { useEqualRowHeight } from "@/hooks/useEqualRowHeight";

export function Architecture() {
  const { setRef, heights } = useEqualRowHeight(architecture.steps.length);

  return (
    <Section width="lg">
      <SectionHeader {...sections.approach} />

      <ol className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {architecture.steps.map((step, index) => (
          <Reveal key={step.title} delay={(index % 2) * 120}>
            <div ref={setRef(index)}>
              <Card variant="approach" data={step} index={index} minHeight={heights[index]} />
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export default Architecture;