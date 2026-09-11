/** Shared shapes for everything rendered from the data folder. */

export interface Screenshot {
    url: string;
    caption: string;
  }
  
  export type ProjectCategory = "React Web App" | "React Native Mobile App";
  export type ProjectStatus = "Live" | "In development" | "Internal";
  
  export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    role: string;
    status?: ProjectStatus;
    description: string;
    highlights: string[];
    tags: string[];
    liveUrl?: string;
    images?: Screenshot[];
  }
  
  export interface WorkGroup {
    title: string;
    blurb: string;
    items: { name: string; url?: string; note?: string }[];
  }
  
  export interface ApproachStep {
    title: string;
    body: string;
  }
  
  export interface Snippet {
    id: string;
    title: string;
    language: string;
    description: string;
    code: string;
  }
  
  export interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    description: string;
  }
  
  export interface EducationItem {
    title: string;
    institution: string;
    period: string;
  }
  
  /**
   * - "route": a dedicated page, always navigates there directly.
   * - "anchor": a section that only lives on the home page. Scrolls directly
   *   when already home, otherwise navigates home first and then scrolls.
   * - "contact": same as "anchor" when on the home page (scrolls to the
   *   footer), but opens the Contact modal instead of navigating away when
   *   triggered from any other route.
   */
  export type NavAction =
    | { kind: "route"; path: string }
    | { kind: "anchor"; anchorId: string }
    | { kind: "contact"; anchorId: string };

  export interface NavItem {
    id: string;
    label: string;
    action: NavAction;
  }
  
  export interface SectionCopy {
    eyebrow: string;
    title: string;
    description?: string;
  }
  