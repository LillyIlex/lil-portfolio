import { lazy } from "react";

import { LazyMount } from "@/components/base/LazyMount";
import { Hero } from "@/components/portfolio/Hero";
import { Projects } from "@/components/portfolio/Projects";
import { ROUTES } from "@/lib/routes";

/** Below-the-fold sections are still code-split and mounted as they approach
 *  the viewport — Home is the one route where that still matters, since
 *  everything else now only loads when its own page is visited. */
const Experience = lazy(() => import("@/components/portfolio/Experience"));
const About = lazy(() => import("@/components/portfolio/About"));

const deferredSections = [
  { id: "experience", Component: Experience, minHeight: 620 },
  { id: "about", Component: About, minHeight: 720 },
];

export function Home() {
  return (
    <>
      <Hero />
      <Projects limit={2} ctaHref={ROUTES.projects} />

      {deferredSections.map(({ id, Component, minHeight }) => (
        <LazyMount key={id} id={id} minHeight={minHeight}>
          <Component />
        </LazyMount>
      ))}
    </>
  );
}

export default Home;