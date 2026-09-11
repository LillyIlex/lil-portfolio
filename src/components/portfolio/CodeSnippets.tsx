import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { snippets } from "@/data/codeSnippets";
import { sections } from "@/data/content";
import { cn } from "@/lib/utils";
import { Card } from "@/components/base/Card";
import { Reveal } from "@/components/base/Reveal";
import { Section, SectionHeader } from "@/components/base/Section";

export function CodeSnippets() {
  const [showAll, setShowAll] = useState(false);
  const [first, ...rest] = snippets;

  return (
    <Section id="snippets" className="relative">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative">
        <SectionHeader {...sections.snippets} />

        <div className="flex flex-col gap-8 sm:gap-10">
          {first && (
            <Reveal>
              <Card variant="code" data={first} />
            </Reveal>
          )}

          {/* The rest only mount once requested — react-syntax-highlighter is
              heavy, so there's no reason to pay for 3 more instances of it
              up front when most visitors will only ever look at the first. */}
          {showAll &&
            rest.map((snippet, index) => (
              <Reveal key={snippet.id} delay={index * 80}>
                <Card variant="code" data={snippet} />
              </Reveal>
            ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-10 flex justify-center sm:mt-14">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
            >
              {showAll ? "Show fewer examples" : "See more code examples"}
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", showAll && "rotate-180")} />
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}

export default CodeSnippets;
