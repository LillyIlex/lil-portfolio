import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { navItems } from "@/data/content";
import { forceShowUpTo } from "@/lib/lazy-mount-registry";

const NAV_OFFSET = 56;
const sectionOrder = navItems.map((item) => item.id);

/** Sticky section nav that highlights the section currently in view. */
export function NavBar() {
  const [active, setActive] = useState<string>(navItems[0]!.id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    navItems.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (event: React.MouseEvent, id: string) => {
    event.preventDefault();

    // Mount every section up to the target NOW, so its final height is
    // already known before we compute where to scroll — this is what the
    // old five-jump re-alignment was working around, badly.
    forceShowUpTo(id, sectionOrder);

    // Two rAFs: one for React to commit the forced-mount state updates,
    // one for the browser to complete layout off the back of them.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const node = document.getElementById(id);
        if (!node) return;
        const top = node.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });

        // Safety net only — silently corrects a few stray pixels if a
        // lazy chunk was still downloading when we measured. No visible
        // re-jump; this is a single tiny nudge, not the old repeated snap.
        const settle = () => {
          const current = document.getElementById(id);
          if (!current) return;
          const drift = current.getBoundingClientRect().top - NAV_OFFSET;
          if (Math.abs(drift) > 4) {
            window.scrollTo({ top: window.scrollY + drift });
          }
        };
        const supportsScrollEnd = "onscrollend" in window;
        if (supportsScrollEnd) {
          window.addEventListener("scrollend", settle, { once: true });
        } else {
          window.setTimeout(settle, 700);
        }
      });
    });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Sections"
        className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-3 py-2.5 sm:justify-center sm:gap-2 sm:px-6 sm:py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => scrollToSection(event, item.id)}
            aria-current={active === item.id ? "true" : undefined}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
              active === item.id
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
