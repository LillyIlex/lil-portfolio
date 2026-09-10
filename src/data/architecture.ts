import type { ApproachStep } from "./types";

export const architecture: { title: string; intro: string; steps: ApproachStep[] } = {
  title: "How I approach a front-end build",
  intro:
    "Once wireframes are handed over, I break the design down into a component architecture before development starts.",
  steps: [
    { title: "Break down the design", body: "Following Brad Frost's atomic design approach, I map atoms, molecules, organisms, templates and pages in a build spreadsheet to identify what can be reused across the project." },
    { title: "Build dynamic-first", body: "Components are built to take data from the start, with API data plumbed in at parent level so child components stay presentational and reusable." },
    { title: "Own the structure and styling", body: "I lead the structural breakdown, initial build and styling myself, keeping the UI consistent with Figma and brand guidelines." },
    { title: "Bring in support to ship", body: "As deadlines approach I bring in one or two developers for larger components and API integration, reviewing the work back into the architecture." },
  ],
};