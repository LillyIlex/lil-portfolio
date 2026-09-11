import { lazy } from "react";

import { NavBar } from "@/components/layout/NavBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { LazyMount } from "@/components/base/LazyMount";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { Footer } from "@/components/portfolio/Footer";

/** Below-the-fold sections are code-split and mounted as they approach the viewport. */
const MoreWork = lazy(() => import("@/components/portfolio/MoreWork"));
const Architecture = lazy(() => import("@/components/portfolio/Architecture"));
const CodeSnippets = lazy(() => import("@/components/portfolio/CodeSnippets"));
const Experience = lazy(() => import("@/components/portfolio/Experience"));
const About = lazy(() => import("@/components/portfolio/About"));
const Contact = lazy(() => import("@/components/portfolio/Contact"));

const deferredSections = [
  { id: "more-work", Component: MoreWork, minHeight: 620 },
  { id: "approach", Component: Architecture, minHeight: 560 },
  { id: "snippets", Component: CodeSnippets, minHeight: 640 },
  { id: "experience", Component: Experience, minHeight: 620 },
  { id: "about", Component: About, minHeight: 720 },
  { id: "contact", Component: Contact, minHeight: 420 },
];

/**
 * This is a single-page portfolio. NavBar links and
 * scroll-spy work off in-page anchor ids, not routes.
 */
export function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background font-sans">
      <NavBar />
      <Hero />
      <Projects />

      {deferredSections.map(({ id, Component, minHeight }) => (
        <LazyMount key={id} id={id} minHeight={minHeight}>
          <Component />
        </LazyMount>
      ))}

      <Footer />
      <BackToTop />
    </main>
  );
}
