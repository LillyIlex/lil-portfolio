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
    image: string;
    liveUrl?: string;
    gallery?: Screenshot[];
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
  
  export interface NavItem {
    id: string;
    label: string;
  }
  
  export interface SectionCopy {
    eyebrow: string;
    title: string;
    description?: string;
  }
  