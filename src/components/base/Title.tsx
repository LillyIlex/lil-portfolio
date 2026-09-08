import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TitleVariant = "sm" | "md" | "lg" | "xl";

/** One entry per variant — this is the only place heading sizes are defined. */
const variantStyles: Record<TitleVariant, string> = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl",
  lg: "text-3xl sm:text-4xl md:text-5xl",
  xl: "text-4xl sm:text-6xl md:text-7xl lg:text-8xl",
};

export interface TitleProps {
  children: ReactNode;
  /** Semantic heading level — independent of visual size. */
  as?: Extract<ElementType, "h1" | "h2" | "h3" | "h4">;
  /** Visual size variant. Defaults to "lg" (standard section heading). */
  variant?: TitleVariant;
  className?: string;
}

/**
 * The single source of truth for heading styling.
 * Conditionally applies size styling based on `variant`, then merges any
 * caller-supplied `className` on top (later Tailwind classes win via `cn`).
 */
export function Title({ children, as: Tag = "h2", variant = "lg", className }: TitleProps) {
  return (
    <Tag
      className={cn(
        "font-display font-bold tracking-tight text-foreground",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
