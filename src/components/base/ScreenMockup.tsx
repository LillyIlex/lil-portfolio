import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ScreenMockupProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a screenshot in a tilted, glassy "on a screen" frame using a CSS
 * 3D perspective transform — rather than a flat image. Drop any
 * screenshot in as `children` (typically an <img> or ImageWithSkeleton).
 */
export function ScreenMockup({ children, className }: ScreenMockupProps) {
  return (
    <div className={cn("[perspective:1400px]", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-primary/25 bg-forest shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]",
          "[transform-style:preserve-3d] transition-transform duration-500 ease-out",
          "[transform:rotateX(8deg)_rotateY(-14deg)_scale(0.94)] group-hover:[transform:rotateX(4deg)_rotateY(-7deg)_scale(0.97)]",
        )}
      >
        {children}

        {/* Glassy light sweep across the "screen" */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
          aria-hidden="true"
        />
        {/* Bezel edge highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
