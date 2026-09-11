import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { navItems, homeAnchorOrder } from "@/data/content";
import type { NavItem } from "@/data/types";
import { forceShowUpTo } from "@/lib/lazy-mount-registry";
import { ContactModal } from "@/components/portfolio/ContactModal";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const NAV_OFFSET = 56;

/** Scrolls to an anchor already known to be on the current page, force-mounting
 *  any still-lazy sections above it first so the final position is correct. */
function scrollToAnchor(id: string) {
  forceShowUpTo(id, homeAnchorOrder);

  // Two rAFs: one for React to commit the forced-mount state updates, one
  // for the browser to complete layout off the back of them.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const node = document.getElementById(id);
      if (!node) return;
      const top = node.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });

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
}

/** Sticky top nav. Route items go straight to their page; anchor items scroll
 *  on Home (or navigate home first, then scroll, from anywhere else); Contact
 *  scrolls on Home but opens as a modal from anywhere else. */
export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === ROUTES.home;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === "undefined") {
      setActiveAnchor(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveAnchor(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    const nodes = homeAnchorOrder.map((id) => document.getElementById(id)).filter(Boolean);
    nodes.forEach((node) => observer.observe(node!));

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (isHome && target) {
      scrollToAnchor(target);
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome, location.state]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleAnchorClick = (event: React.MouseEvent, anchorId: string) => {
    event.preventDefault();
    setMobileOpen(false);
    if (isHome) {
      scrollToAnchor(anchorId);
    } else {
      navigate(ROUTES.home, { state: { scrollTo: anchorId } });

    }
  };

  const handleContactClick = (event: React.MouseEvent, anchorId: string) => {
    event.preventDefault();
    setMobileOpen(false);
    if (isHome) {
      scrollToAnchor(anchorId);
    } else {
      setContactOpen(true);
    }
  };

  const renderNavItem = (item: NavItem, mobile: boolean) => {
    const action = item.action;

    const isActive =
      action.kind === "route"
        ? location.pathname === action.path
        : isHome && activeAnchor === action.anchorId;

    const classes = cn(
      mobile
        ? "block w-full rounded-xl px-4 py-3 text-base font-semibold transition-colors"
        : "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
      isActive
        ? "bg-primary/15 text-primary"
        : mobile
          ? "text-foreground hover:bg-card"
          : "text-muted-foreground hover:text-foreground",
    );

    if (action.kind === "route") {
      const path = action.path;
      return (
        <Link key={item.id} to={path} className={classes} onClick={() => setMobileOpen(false)}>
          {item.label}
        </Link>
      );
    }

    if (action.kind === "contact") {
      const anchorId = action.anchorId;
      return (
        <a
          key={item.id}
          href={isHome ? `#${anchorId}` : "#"}
          onClick={(event) => handleContactClick(event, anchorId)}
          className={classes}
        >
          {item.label}
        </a>
      );
    }

    if (action.kind === "anchor") {
      const anchorId = action.anchorId;
      return (
        <a
          key={item.id}
          href={isHome ? `#${anchorId}` : ROUTES.home}
          onClick={(event) => handleAnchorClick(event, anchorId)}
          className={classes}
        >
          {item.label}
        </a>
      );
    }

    return null;
  };

  const visibleNavItems = navItems.filter(
    (item) => !(isHome && item.action.kind === "route" && item.action.path === ROUTES.home),
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:justify-center sm:px-6 sm:py-3">
        {/* Desktop / tablet: horizontal pill row */}
        <nav aria-label="Main" className="hidden items-center gap-2 sm:flex">
          {visibleNavItems.map((item) => renderNavItem(item, false))}
        </nav>

        {/* Mobile only: hamburger trigger for the slide-in drawer */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="ml-auto flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:text-primary sm:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-4/5 border-border bg-background/95 backdrop-blur-md sm:hidden">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <nav aria-label="Main" className="mt-10 flex flex-col gap-1">
            {visibleNavItems.map((item) => renderNavItem(item, true))}
          </nav>
        </SheetContent>
      </Sheet>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </header>
  );
}