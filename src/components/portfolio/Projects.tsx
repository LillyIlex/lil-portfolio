import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { projects } from "@/data/projects";
import { sections } from "@/data/content";
import { Card } from "@/components/base/Card";
import { Reveal } from "@/components/base/Reveal";
import { Section, SectionHeader } from "@/components/base/Section";

export interface ProjectsProps {
  /** Show only the first N projects (home page teaser). Omit for the full list. */
  limit?: number;
  /** Shown under the grid when `limit` is set, linking through to the full list. */
  ctaHref?: string;
}

export function Projects({ limit, ctaHref }: ProjectsProps = {}) {
  const visible = typeof limit === "number" ? projects.slice(0, limit) : projects;
  const showCta = typeof limit === "number" && ctaHref && projects.length > limit;

  return (
    <Section id={limit ? "projects" : undefined}>
      <SectionHeader {...sections.projects} />

      <div className="grid items-start gap-5 sm:grid-cols-2 sm:gap-8">
        {visible.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 120}>
            <Card variant="project" data={project} />
          </Reveal>
        ))}
      </div>

      {showCta && (
        <div className="mt-10 flex justify-center sm:mt-14">
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
          >
            See all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </Section>
  );
}
