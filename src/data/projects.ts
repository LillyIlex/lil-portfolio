import leoDesktop from "@/assets/leo/leo-desktop.png";
import leoDesktop2 from "@/assets/leo/leo-desktop2.png";
import leoMobile from "@/assets/leo/leo.png";
import leoMobile2 from "@/assets/leo/leo2.png";
import leoMobile3 from "@/assets/leo/leo3.png";

import portal from "@/assets/leo-portal/portal.png";
import portalMfa from "@/assets/leo-portal/portal-mfa.png";
import portal2 from "@/assets/leo-portal/portal2.png";

import edgeElecJob from "@/assets/edge-elec/edge-elec-job.png";
import edgeElec from "@/assets/edge-elec/edge-elec.png";

import edgex from "@/assets/edgex/edgex-login.png";
import edgexTabs from "@/assets/edgex/edgex-tabs.png";

import risksmart from "@/assets/risksmart/risksmart-main.png"
import risksmart2 from "@/assets/risksmart/risksmart2.png"
import risksmart3 from "@/assets/risksmart/risksmart3.png"
import risksmart4 from "@/assets/risksmart/risksmart4.png"

import staxLanding from "@/assets/stax/stax-landing.png"
import stax2 from "@/assets/stax/stax2.png"
import stax3 from "@/assets/stax/stax3.png"
import staxLogin from "@/assets/stax/stax-login.png"
import staxBlur from "@/assets/stax/stax-blur.png"
import staxLaptop from "@/assets/stax/stax-laptop.png"
import staxLaptop2 from "@/assets/stax/stax-laptop2.png"
import staxLaptop3 from "@/assets/stax/stax-laptop3.png"

import type { Project, Screenshot,} from "./types";

export type { Project, Screenshot } from "./types";

export const leoImages: Screenshot[] = [
  { url: leoDesktop, caption: "Leo website - landing page" },
  { url: leoDesktop2, caption: "Leo website - modal & products" },
  { url: leoMobile, caption: "Leo" },
  { url: leoMobile2, caption: "Leo" },
  { url: leoMobile3, caption: "Leo" },
]

export const leoPortalImages: Screenshot[] = [
  { url: portal, caption: "Leo pharmacists portal" },
  { url: portalMfa, caption: "Leo pharmacists portal" },
  { url: portal2, caption: "Leo pharmacists portal" },
]

export const staxImages: Screenshot[] = [
  { url: staxLanding, caption: "Stax Trade Centres" },
  { url: staxLogin, caption: "Stax Trade Centres - members only" },
  { url: staxBlur, caption: "Stax Trade Centres - logged out view" },
  { url: staxLaptop, caption: "Stax Trade Centres - unauthenticated vs authenticated view" },
  { url: staxLaptop2, caption: "Stax Trade Centres - navigation built in heirarchyies" },
  { url: staxLaptop3, caption: "Stax Trade Centres - reusable drawer component" },
]

export const risksmartImages: Screenshot[] = [
  { url: risksmart, caption: "RiskSmart" },
  { url: risksmart2, caption: "RiskSmart" },
  { url: risksmart3, caption: "RiskSmart" },
  { url: risksmart4, caption: "RiskSmart" },
]

export const edgexImages: Screenshot[] = [
  { url: edgex, caption: "Edeg X app" },
  { url: edgexTabs, caption: "Edeg X app" },
]

export const edgeElecImages: Screenshot[] = [
  { url: edgeElec, caption: "Edeg Electrical app" },
  { url: edgeElecJob, caption: "Edeg Electrical app" },
]

export const projects: Project[] = [
  {
    id: "leo",
    title: "LEO — Hair Loss Treatment Platform",
    category: "React Web App",
    role: "Lead Front-End Developer",
    status: "Live",
    description:
      "Subscription-based hair-loss treatment website. I took the designs post-wireframe, produced the full component breakdown, then owned the structural build, styling and API integration end-to-end.",
    highlights: [
      "Mapped base components, grouped components, blocks and screens in a build spreadsheet to maximise reusability.",
      "Built components dynamic-first, with API data plumbed in at parent level so children stayed presentational.",
      "Brought in a team of 2–3 for REST API integration on the larger, data-heavy components as deadline approached.",
      "Mobile-first responsive design matched to Figma and brand guidelines across mobile, tablet and desktop.",
      "Built a 13 step questionnaire and wired in validation logic"
    ],
    tags: ["React", "JavaScript (ES6+)", "SCSS", "REST APIs", "Axios", "Docker", "BitBucket"],
    images: leoImages,
    liveUrl: "https://www.leo.hair/",

  },
  {
    id: "leo-portal",
    title: "LEO Prescriptions Portal",
    category: "React Web App",
    role: "Lead Front-End Developer · AI-augmented build",
    status: "Internal",
    description:
      "Internal portal supporting LEO, used to manage and fulfil patient prescriptions, connecting the pharmacists to the perscriptions. Built from designs using an AI-augmented workflow with Agentic AI.",
    highlights: [
      "Used Claude Code to support the architecture breakdown, cutting a 2–3 day planning phase to under a day.",
      "Directed component and screen builds through my own prompts, reviews and refactors, checking every screen against the designs.",
      "Integrated the full set of REST API endpoints for prescription, patient and fulfilment data.",
      "Internal only — screenshots and code snippets available on request.",
    ],
    tags: ["React", "JavaScript", "REST APIs", "Claude Code", "Tailwind", "Docker"],
    images: leoPortalImages,
  },
  {
    id: "risksmart",
    title: "RiskSmart — FE Site",
    category: "React Web App",
    role: "Front-End Developer · team of 2, paired with senior dev",
    status: "Live",
    description:
      "Full front-end rebuild of the RiskSmart platform. I worked alongside a senior developer who led the API integration, focusing my own time on component build and styling from the XD designs.",
    highlights: [
      "Built and styled components across the full site rebuild, matched to XD and brand guidelines.",
      "Paired closely with a senior developer, learning state management on a live production codebase.",
      "Delivered responsive layouts and handled cross-browser testing across a large multi-page site.",
      "Supported bug fixing through to release.",
    ],
    tags: ["React", "JavaScript", "SCSS", "Tailwind", "BitBucket"],
    images: risksmartImages,
    liveUrl: "https://www.risksmart.com/",
  },
  {
    id: "stax-trade-centres",
    title: "Stax Trade Centres",
    category: "React Web App",
    role: "Front-End Developer · team collaboration, bi-weekly sprints",
    status: "Live",
    description:
      "Year-long front-end build for a large trade e-commerce site, delivered in an Agile team on bi-weekly sprints. I focused on component build and styling, and owned a number of API endpoints along with some of the site's more complex interactive logic.",
    highlights: [
      "Built and styled components across a large, multi-section site to design and brand guidelines, working in a small front-end team.",
      "Integrated a number of REST API endpoints alongside back-end developers, parsing the data into a structured format.",
      "Built complex conditional UI logic, including state handling across nested filters.",
      "Worked in bi-weekly sprints across a year-long delivery, with regular planning, review and refinement.",
    ],
    tags: ["React", "JavaScript", "SCSS", "Tailwind",  "REST APIs", "Agile", "BitBucket"],
    images: staxImages,
    liveUrl: "https://www.staxtradecentres.co.uk/",
  },
  {
    id: "edgex",
    title: "EdgeX — Dental Training App",
    category: "React Native Mobile App",
    role: "Front-End Developer · team of 3",
    status: "In development",
    description:
      "Cross-platform dental training app taken from design towards release, with the component breakdown, forms and validation handled individually.",
    highlights: [
      "Built out forms and validation individually, then supported REST API integration into a Python Django backend via Axios.",
      "Contributed to the secure authentication/login flow.",
      "Developed dynamic course material and interactive UI components to streamline contractor workflows.",
    ],
    tags: ["React Native", "Expo Go", "Xcode", "REST APIs", "Axios", "BitBucket"],
    images: edgexImages,
  },
  {
    id: "edge-electrical",
    title: "Edge Electrical",
    category: "React Native Mobile App",
    role: "Front-End Developer · team of 3",
    status: "In development",
    description:
      "Mobile app taken from design through component breakdown, with form validation and API endpoint integration.",
    highlights: [
      "Built extensive forms and validation myself, from design & exisiting live logic, through to working screens.",
      "Wired in the validation logic for the authentication screens",
      "Integrated  REST API endpoints as part of a wider development team.",
    ],
    tags: ["React Native", "JavaScript", "REST APIs", "Axios", "BitBucket"],
    images: edgeElecImages,
  }
];