import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { NavBar } from "@/components/layout/NavBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/portfolio/Footer";
import { SectionSkeleton } from "@/components/base/LazyMount";
import { Home } from "@/pages/Home";
import { ROUTES } from "@/lib/routes";

/** Each secondary page is its own chunk — visiting "/" never downloads the
 *  Development or Code page's JS at all, which is most of what was making
 *  the old single-page build slow to load, especially on mobile. */
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const DevelopmentPage = lazy(() => import("@/pages/DevelopmentPage"));
const CodePage = lazy(() => import("@/pages/CodePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

/** Resets scroll on every route change, except when NavBar has just navigated
 *  home specifically to scroll to an anchor (that scroll wins instead). */
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const scrollingToAnchor = Boolean((location.state as { scrollTo?: string } | null)?.scrollTo);
    if (!scrollingToAnchor) {
      window.scrollTo({ top: 0 });
    }
  }, [location.pathname, location.state]);

  return null;
}

export function App() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <ScrollToTop />
      <NavBar />

      <Suspense fallback={<SectionSkeleton />}>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.projects} element={<ProjectsPage />} />
          <Route path={ROUTES.development} element={<DevelopmentPage />} />
          <Route path={ROUTES.code} element={<CodePage />} />
          {/* Any unmatched path — typo'd link, dead bookmark, etc — gets a
              real 404 instead of silently bouncing to Home. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
      <BackToTop />
    </main>
  );
}