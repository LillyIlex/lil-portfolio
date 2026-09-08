import { snippets } from "@/data/projects";
import { sections } from "@/data/content";
import { Card } from "@/components/base/Card";
import { Reveal } from "@/components/base/Reveal";
import { Section, SectionHeader } from "@/components/base/Section";

export function CodeSnippets() {
  return (
    <Section className="relative">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative">
        <SectionHeader {...sections.snippets} />

        <div className="flex flex-col gap-8 sm:gap-10">
          {snippets.map((snippet, index) => (
            <Reveal key={snippet.id} delay={index * 80}>
              <Card variant="code" data={snippet} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default CodeSnippets;
