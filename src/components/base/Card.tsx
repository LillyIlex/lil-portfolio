import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ApproachStep, ExperienceItem, Project, Snippet } from "@/data/types";
import { BulletList, Pill, TagList } from "@/components/base/Typography";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";
import { Gallery } from "@/components/portfolio/Gallery";
import { CodeBlock } from "@/components/portfolio/CodeBlock";

/** How many bullets stay visible on mobile before the "show more" toggle. */
const MOBILE_BULLET_LIMIT = 2;

const surface =
  "rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30";

export type CardProps =
  | { variant: "project"; data: Project; minHeight?: number }
  | { variant: "experience"; data: ExperienceItem }
  | { variant: "approach"; data: ApproachStep; index: number, minHeight?: number }
  | { variant: "code"; data: Snippet };

/** One card component, four variants — mapped over from data at parent level. */
export function Card(props: CardProps) {
  switch (props.variant) {
    case "project":
      return <ProjectCard project={props.data} minHeight={props.minHeight} />;
    case "experience":
      return <ExperienceCard job={props.data} />;
    case "approach":
      return <ApproachCard step={props.data} index={props.index} minHeight={props.minHeight} />;
    case "code":
      return <CodeCard snippet={props.data} />;
  }
}

function ProjectCard({ project, minHeight }: { project: Project; minHeight?: number }) {
  const [showAll, setShowAll] = useState(false);
  const hasHiddenBullets = project.highlights.length > MOBILE_BULLET_LIMIT;

  return (
    <article
      // Deliberately not using the shared `surface` style here — that
      // includes a hover:border colour shift, which read as a clickable
      // affordance on a card that doesn't navigate anywhere on click.
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
      style={minHeight ? { minHeight } : undefined}
    >
      <div className="aspect-[16/10] bg-forest p-3 sm:aspect-[4/3] sm:p-4">
          <img
            src={project.image}
            alt={`${project.title} interface`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] h-full w-full object-cover object-top sm:aspect-[4/3]"
          />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Pill>{project.category}</Pill>
          {project.status && <Pill tone="outline">{project.status}</Pill>}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-muted-foreground transition-colors hover:text-primary"
              aria-label={`Open ${project.title} live site`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        <Title as="h3" variant="sm" className="mt-4">
          {project.title}
        </Title>
        <Paragraph variant="sm" tone="primary" className="mt-1 font-semibold">
          {project.role}
        </Paragraph>
        <Paragraph variant="sm" className="mt-3">
          {project.description}
        </Paragraph>

        <BulletList
          items={project.highlights}
          className="mt-4"
          itemClassName={(index) =>
            index >= MOBILE_BULLET_LIMIT && !showAll ? "hidden sm:flex" : undefined
          }
        />

        {hasHiddenBullets && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="mt-3 inline-flex items-center gap-1 self-start text-xs font-semibold text-primary sm:hidden"
          >
            {showAll ? "Show less" : "Show more"}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform duration-300", showAll && "rotate-180")}
            />
          </button>
        )}

        {project.gallery && <Gallery shots={project.gallery} />}

        <TagList tags={project.tags} className="mt-5 border-t border-border pt-4" />
      </div>
    </article>
  );
}

function ExperienceCard({ job }: { job: ExperienceItem }) {
  return (
    <article className={cn(surface, "p-5 sm:p-8")}>
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <Title as="h3" variant="sm">
          {job.role}
        </Title>
        <Paragraph variant="sm" tone="primary" as="span" className="font-medium">
          {job.period}
        </Paragraph>
      </div>
      <Paragraph variant="sm" className="mt-1 font-medium">
        {job.company}
      </Paragraph>
      <Paragraph variant="sm" className="mt-4">
        {job.description}
      </Paragraph>
    </article>
  );
}

function ApproachCard({ step, index, minHeight }: { step: ApproachStep; index: number; minHeight?: number }) {
  return (
    <li className={cn(surface, "list-none p-5 sm:p-6")}  style={minHeight ? { minHeight } : undefined}>
      <span className="font-display text-sm font-bold text-primary">
        {String(index + 1).padStart(2, "0")}
      </span>
      <Title as="h3" variant="sm" className="mt-2">
        {step.title}
      </Title>
      <Paragraph variant="sm" className="mt-2">
        {step.body}
      </Paragraph>
    </li>
  );
}

function CodeCard({ snippet }: { snippet: Snippet }) {
  return (
    <div className="space-y-3">
      <CodeBlock code={snippet.code} language={snippet.language} />
      <Paragraph variant="sm" className="px-1">
        {snippet.description}
      </Paragraph>
    </div>
  );
}
