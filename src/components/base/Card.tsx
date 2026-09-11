import { lazy, Suspense, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ApproachStep, ExperienceItem, Project, Snippet } from "@/data/types";
import { BulletList, Pill, TagList } from "@/components/base/Typography";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";
import { Carousel } from "@/components/portfolio/Carousel";

// Lazy: keeps react-syntax-highlighter (~9MB of source, Prism + language
// grammars) out of the home page's bundle. Only the /code page's snippet
// cards ever hit this import.
const CodeCard = lazy(() => import("@/components/base/CodeCard"));

const BULLET_LIMIT = 2;

const surface =
  "rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30";

export type CardProps =
  | { variant: "project"; data: Project }
  | { variant: "experience"; data: ExperienceItem }
  | { variant: "approach"; data: ApproachStep; index: number }
  | { variant: "code"; data: Snippet };

/** One card component, four variants — mapped over from data at parent level. */
export function Card(props: CardProps) {
  switch (props.variant) {
    case "project":
      return <ProjectCard project={props.data} />;
    case "experience":
      return <ExperienceCard job={props.data} />;
    case "approach":
      return <ApproachCard step={props.data} index={props.index} />;
    case "code":
      return (
        <Suspense fallback={<div className="h-48 animate-pulse rounded-2xl bg-card" />}>
          <CodeCard snippet={props.data} />
        </Suspense>
      );
  }
}

function ProjectCard({ project }: { project: Project }) {
  const [showAll, setShowAll] = useState(false);
  const hasMoreBullets = project.highlights.length > BULLET_LIMIT;

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[16/10] w-full min-w-0 bg-forest p-3 sm:aspect-[4/3] sm:p-4">
        <Carousel
          shots={project.images ?? []}
          alt={`${project.title} interface`}
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

        <Paragraph
          variant="sm"
          tone="primary"
          className="mt-1 font-semibold"
        >
          {project.role}
        </Paragraph>

        <Paragraph variant="sm" className="mt-3">
          {project.description}
        </Paragraph>

        <BulletList
          items={project.highlights}
          className="mt-4"
          itemClassName={(index) =>
            index >= BULLET_LIMIT && !showAll ? "hidden" : undefined
          }
        />

        {hasMoreBullets ? (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="mt-3 inline-flex items-center gap-1 self-start text-xs font-semibold text-primary"
          >
            {showAll ? "Show less" : "Show more"}

            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300",
                showAll && "rotate-180"
              )}
            />
          </button>
        ) : 
        (
         <div className="h-9.5"></div>
         )
        }

        <TagList
          tags={project.tags}
          className="mt-5 border-t border-border pt-4"
        />
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

        <Paragraph
          variant="sm"
          tone="primary"
          as="span"
          className="font-medium"
        >
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

function ApproachCard({
  step,
  index,
}: {
  step: ApproachStep;
  index: number;
}) {
  return (
    <li className={cn(surface, "list-none p-5 sm:p-6 min-h-50")}>
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


