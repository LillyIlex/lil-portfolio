import type { ApproachStep } from "./types";

export const architecture: { title: string; intro: string; steps: ApproachStep[] } = {
  title: "How I approach a front-end build",
  intro:
    "Once wireframes are handed over, I break the design down into a component architecture before development starts.",
  steps: [
    { title: "Break down the design", body: "Following Brad Frost's atomic design approach, I map the base components, groups, blocks, and pages in a build spreadsheet to identify what can be reused across the project.  In a recent project I had Claude Code assist this step to cut dev time in half." },
    { title: "Build dynamic-first", body: "Components are built to take data from the start, with API data plumbed in at parent level so child components stay presentational and reusable. Unit testing as I go eliminates bugs early." },
    { title: "Own the structure and styling", body: "I lead the structural breakdown, initial build and styling myself, keeping the UI consistent with given design and brand guidelines. Often using StoryBook as a tool for integration test as I build blocks & pages." },
    { title: "Bring in support to ship", body: "As deadlines approach I work alongside one or two developers for larger components and API integration using version control, reviewing the work back into the architecture. The end-to-end testing then begins." },
  ],
};