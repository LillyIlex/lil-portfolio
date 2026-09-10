import { Download, Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { LinkedinIcon } from "@/assets/icons/LinkedinIcon";
import { GithubIcon } from "@/assets/icons/GitHubIcon"
import type { NavItem, SectionCopy } from "./types";

/** Matches lucide-react's icon signature closely enough for our own SVG icons to fit too. */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const navItems: NavItem[] = [
  { id: "projects", label: "Work" },
  { id: "more-work", label: "More" },
  { id: "approach", label: "Approach" },
  { id: "snippets", label: "Code" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Front End Developer",
  nameStart: "Elizabeth ",
  nameHighlight: "(Lil)",
  nameEnd: " Lloyd-Jones",
  intro:
    "Three years building production React and React Native applications — leading component architecture from wireframes through build, styling and API integration.",
  actions: [
    { label: "View Projects", href: "#projects", variant: "primary" as const },
    { label: "Get in Touch", href: "#contact", variant: "secondary" as const },
  ],
};

export const sections: Record<
  "projects" | "moreWork" | "approach" | "snippets" | "experience" | "about" | "contact",
  SectionCopy
> = {
  projects: {
    eyebrow: "Portfolio",
    title: "Selected Work",
    description:
      "Websites, mobile apps and internal platforms I've led or contributed to — with the detail on what I actually owned.",
  },
  moreWork: {
    eyebrow: "More Work",
    title: "18 live or launching projects",
    description:
      "4 apps and 14 websites — 2 led as the initial front-end developer, the majority delivered in a team of 2–3, plus legacy and CMS ticket work on 5.",
  },
  approach: {
    eyebrow: "Approach",
    title: "How I approach a front-end build",
    description:
      "Once wireframes are handed over, I break the design down into a component architecture before development starts.",
  },
  snippets: {
    eyebrow: "Code",
    title: "Detail in the craft",
    description: "Snippets that show how I think about components, hooks, and clean UI.",
  },
  experience: {
    eyebrow: "Background",
    title: "Experience & Education",
    description:
      "My path so far: from apprenticeship to junior engineer, building products for real clients.",
  },
  about: {
    eyebrow: "About",
    title: "Front End Developer, ready for the next step",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something together",
    description:
      "Open to opportunities, collaborations, and interesting conversations about code.",
  },
};

export const aboutParagraphs = [
  "I'm a Front End Developer based in Lymm, Cheshire, with 3 years' commercial experience building responsive, production-grade web and mobile applications in React and React Native — now ready to step up into a mid-weight role.",
  "I've contributed front-end work across 18 live or launching client projects — 4 apps and 14 websites — leading 2 of them as the initial front-end developer, from component architecture through to build and API integration, working in a small team of 2–3 on most of the rest, and picking up legacy codebase and CMS ticket work on 5.",
  "I apply clean code standards, considered state management and performance optimisation as standard, with growing exposure to TypeScript. I use AI-augmented tooling like Claude Code day to day to speed up delivery — recently cutting a component-architecture planning phase from 2–3 days to under a day — and I'm keen to build broader exposure to Node.js services.",
];

export interface ContactAction {
  label: string;
  href: string;
  icon: IconComponent;
  variant: "primary" | "secondary";
  external?: boolean;
  download?: boolean;
}

export const contactPhone = { label: "07907 287275", href: "tel:07907287275" };

export function getContactActions(cvUrl: string): ContactAction[] {
  return [
    { label: "Email me", href: "mailto:eil-j@hotmail.co.uk", icon: Mail, variant: "primary" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/lil-corris",
      icon: LinkedinIcon,
      variant: "secondary",
      external: true,
    },
    { label: "Download CV", href: cvUrl, icon: Download, variant: "secondary", download: true },
    { label: "GitHub", href: 'https://github.com/lillyilex', icon: GithubIcon, variant: "secondary" },
  ];
}

export const footer = {
  note: "Built with attention to detail.",
  role: "Front End Developer",
  owner: "Lil Lloyd-Jones",
};
