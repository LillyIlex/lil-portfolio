import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/base/Reveal";
import { Eyebrow } from "@/components/base/Typography";
import { Title } from "@/components/base/Title";
import { Paragraph } from "@/components/base/Paragraph";

export interface SectionProps {
  /** Omit when a parent wrapper (e.g. LazyMount) owns the anchor id. */
  id?: string | undefined;
  children: ReactNode;
  /** Max content width. */
  width?: "md" | "lg" | "xl";
  className?: string;
}

const widths = {
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
} as const;

/** Consistent section shell: vertical rhythm, gutters and content width. */
export function Section({ id, children, width = "xl", className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-4 py-14 sm:px-6 sm:py-24 lg:px-8", className)}>
      <div className={cn("mx-auto", widths[width])}>{children}</div>
    </section>
  );
}

export interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "mb-10 sm:mb-16",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title className="mt-2">{title}</Title>
      {description && (
        <Paragraph
          className={cn("mt-4 max-w-2xl", align === "center" && "mx-auto")}
        >
          {description}
        </Paragraph>
      )}
    </Reveal>
  );
}
