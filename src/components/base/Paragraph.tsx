import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ParagraphVariant = "sm" | "md" | "lg";
export type ParagraphTone = "muted" | "foreground" | "primary";

const variantStyles: Record<ParagraphVariant, string> = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-relaxed",
  lg: "text-base leading-relaxed sm:text-lg",
};

const toneStyles: Record<ParagraphTone, string> = {
  muted: "text-muted-foreground",
  foreground: "text-foreground",
  primary: "text-primary",
};

export interface ParagraphProps {
  children: ReactNode;
  /** Visual size variant. Defaults to "md". */
  variant?: ParagraphVariant;
  /** Colour tone. Defaults to "muted" (standard body copy). */
  tone?: ParagraphTone;
  /** Rendered element — defaults to <p>, use "span" for inline copy. */
  as?: Extract<ElementType, "p" | "span" | "div">;
  className?: string;
}

/** Body copy. Use this instead of styling raw <p> tags directly. */
export function Paragraph({
  children,
  variant = "md",
  tone = "muted",
  as: Tag = "p",
  className,
}: ParagraphProps) {
  return (
    <Tag className={cn(variantStyles[variant], toneStyles[tone], className)}>{children}</Tag>
  );
}
