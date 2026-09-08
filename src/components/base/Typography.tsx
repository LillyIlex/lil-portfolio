import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase kicker used above every section heading. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.2em] uppercase text-primary sm:text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
}

export interface BulletListProps {
  items: string[];
  className?: string;
  itemClassName?: (index: number) => string | undefined;
}

/** Mint-dot bullet list shared by project, experience and approach cards. */
export function BulletList({ items, className, itemClassName }: BulletListProps) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <li
          key={item}
          className={cn(
            "flex gap-2 text-sm leading-relaxed text-muted-foreground",
            itemClassName?.(index),
          )}
        >
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export interface TagListProps {
  tags: string[];
  prefix?: string;
  className?: string;
}

export function TagList({ tags, prefix = "#", className }: TagListProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-3 gap-y-2", className)}>
      {tags.map((tag) => (
        <span key={tag} className="text-xs font-medium text-muted-foreground">
          {prefix}
          {tag}
        </span>
      ))}
    </div>
  );
}

export interface PillProps {
  children: ReactNode;
  tone?: "primary" | "outline";
  className?: string;
}

export function Pill({ children, tone = "primary", className }: PillProps) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        tone === "primary"
          ? "bg-primary/10 text-primary"
          : "border border-border font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
