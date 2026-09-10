import leoDesktop from "@/assets/leo/leo-desktop.png";
import leoDesktop2 from "@/assets/leo/leo-desktop2.png";
import leoMobile from "@/assets/leo/leo.png";
import leoMobile2 from "@/assets/leo/leo2.png";
import leoMobile3 from "@/assets/leo/leo3.png";

import edgeElecJob from "@/assets/edge-elec/edge-elec-job.png";
import edgeElec from "@/assets/edge-elec/edge-elec.png";

import edgex from "@/assets/edgex/edgex-login.png";
import edgexTabs from "@/assets/edgex/edgex-tabs.png";

import risksmart from "@/assets/risksmart/risksmart-main.png"
import risksmart2 from "@/assets/risksmart/risksmart2.png"
import risksmart3 from "@/assets/risksmart/risksmart3.png"
import risksmart4 from "@/assets/risksmart/risksmart4.png"

import stax from "@/assets/stax/stax.png"
import stax2 from "@/assets/stax/stax2.png"
import stax3 from "@/assets/stax/stax3.png"

import type { Project, Screenshot,} from "./types";

export type { Project, Screenshot } from "./types";

export const leoImages: Screenshot[] = [
  { url: leoDesktop, caption: "Leo website - landing page" },
  { url: leoDesktop2, caption: "Leo website screens - modal & products" },
  { url: leoMobile, caption: "Leo" },
  { url: leoMobile2, caption: "Leo" },
  { url: leoMobile3, caption: "Leo" },
]

export const leoPortalImages: Screenshot[] = [
  { url: leoDesktop2, caption: "Leo" },
]

export const staxImages: Screenshot[] = [
  { url: stax, caption: "Stax Trade Centres" },
  { url: stax2, caption: "Stax Trade Centres" },
  { url: stax3, caption: "Stax Trade Centres" },
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
      "Subscription-based healthcare platform. I took the designs post-wireframe, produced the full component breakdown, then owned the structural build, styling and API integration end-to-end.",
    highlights: [
      "Mapped base components, grouped components, blocks and screens in a build spreadsheet to maximise reusability.",
      "Built components dynamic-first, with API data plumbed in at parent level so children stayed presentational.",
      "Brought in a team of 2–3 for REST API integration on the larger, data-heavy components as deadline approached.",
      "Mobile-first responsive design matched to Figma and brand guidelines across mobile, tablet and desktop.",
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
      "Internal portal supporting LEO, used to manage and fulfil patient prescriptions. Built from designs using an AI-augmented workflow with Claude Code.",
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
      "Full front-end rebuild of the RiskSmart platform. I worked alongside a senior developer who led the API integration, focusing my own time on component build and styling from the Figma designs.",
    highlights: [
      "Built and styled components across the full site rebuild, matched to Figma and brand guidelines.",
      "Paired closely with a senior developer, learning state management and REST API patterns on a live production codebase.",
      "Delivered responsive layouts and handled cross-browser testing across a large multi-page site.",
      "Supported QA and bug fixing through to release.",
    ],
    tags: ["React", "JavaScript", "SCSS", "Tailwind", "REST APIs", "BitBucket"],
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
      "Year-long front-end build for a large trade e-commerce site, delivered in an Agile team on bi-weekly sprints. I focused on component build and styling, and owned a number of API endpoints along with the site's slide-out drawers and more complex interactive logic.",
    highlights: [
      "Built and styled components across a large, multi-section site to Figma and brand guidelines, working in a small front-end team.",
      "Integrated a number of REST API endpoints alongside back-end developers.",
      "Built slide-out filter drawers and complex conditional UI logic, including state handling across nested filters.",
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
      "Mobile app taken from design through component breakdown, with form validation and the initial API endpoint integration built by me.",
    highlights: [
      "Built the forms and validation myself, from design through to working screens.",
      "Integrated an initial set of REST API endpoints, with the wider team supporting further API and back-end work near completion.",
    ],
    tags: ["React Native", "JavaScript", "REST APIs", "Axios", "BitBucket"],
    images: edgeElecImages,
  }
];