import { ArrowUpRight } from "lucide-react";

import { workGroups } from "@/data/projects";
import { sections } from "@/data/content";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";
import { Reveal } from "@/components/base/Reveal";
import { Section, SectionHeader } from "@/components/base/Section";

export function MoreWork() {
  return (
    <Section width="lg">
      <SectionHeader {...sections.moreWork} />

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {workGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 120}>
            <div className="h-full rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 sm:p-8">
              <Title as="h3" variant="sm">
                {group.title}
              </Title>
              <Paragraph variant="sm" className="mt-2">
                {group.blurb}
              </Paragraph>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.name} className="flex flex-wrap items-baseline gap-2 text-sm">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="-mx-1.5 -my-0.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary hover:glow-primary"
                      >
                        {item.name}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="font-medium text-foreground">{item.name}</span>
                    )}
                    {item.note && (
                      <span className="text-xs text-muted-foreground">{item.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default MoreWork;