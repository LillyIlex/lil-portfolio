import type { ComponentType, ReactNode, SVGProps } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type IconPosition = "iconLeft" | "iconRight";
/** Matches lucide-react's icon signature, but also fits any custom SVG icon. */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:py-3";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:scale-105 glow-primary",
  secondary:
    "border border-border bg-card/50 text-foreground backdrop-blur-sm hover:border-primary/50 hover:bg-card",
  ghost: "text-muted-foreground hover:text-primary",
};

export interface ActionButtonProps {
  children: ReactNode;
  /** Renders an anchor when set, otherwise a button. */
  href?: string | undefined;
  onClick?: () => void | undefined;
  variant?: ButtonVariant | undefined;
  icon?: IconComponent | undefined;
  iconPosition?: IconPosition | undefined;
  external?: boolean | undefined;
  download?: boolean | undefined;
  ariaLabel?: string | undefined;
  ariaExpanded?: boolean | undefined;
  className?: string | undefined;
}

/** The one button in the design system: primary / secondary / ghost, with an optional icon on either side. */
export function ActionButton({
  children,
  href,
  onClick,
  variant = "primary",
  icon: Icon,
  iconPosition = "iconRight",
  external = false,
  download = false,
  ariaLabel,
  ariaExpanded,
  className,
}: ActionButtonProps) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {Icon && iconPosition === "iconLeft" && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
      {children}
      {Icon && iconPosition === "iconRight" && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      {content}
    </button>
  );
}