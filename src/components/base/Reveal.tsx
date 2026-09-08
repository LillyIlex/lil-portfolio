import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  /** Stagger in ms — used to cascade cards within a grid. */
  delay?: number;
  /** Motion direction: swipe up (default) or a plain fade. */
  motion?: "up" | "fade";
  className?: string;
}

/**
 * Reveals children on scroll with a swipe-up or fade, once only.
 * Uses IntersectionObserver so nothing animates off-screen, and falls back to
 * visible immediately when the API is unavailable or motion is reduced.
 */
export function Reveal({ children, delay = 0, motion = "up", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!node || reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-[opacity,transform] motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : cn("opacity-0", motion === "up" && "translate-y-6"),
        className,
      )}
    >
      {children}
    </div>
  );
}
