import doctorApprovals from "@/assets/cloudrx/doctor-approvals.png";
import patientSearch from "@/assets/cloudrx/patient-search.png";
import resultsFilter from "@/assets/cloudrx/results-filter.png";
import addPrescription from "@/assets/cloudrx/add-prescription.png";
import orderDetails from "@/assets/cloudrx/order-details.png";
import statusReport from "@/assets/cloudrx/status-report.png";
import addPatient from "@/assets/cloudrx/add-patient.png";
import changePassword from "@/assets/cloudrx/change-password.png";
import searchValidation from "@/assets/cloudrx/search-validation.png";
import cloudRxSignIn from "@/assets/cloudrx/signin.png";

import type {
  ApproachStep,
  EducationItem,
  ExperienceItem,
  Project,
  Screenshot,
  Snippet,
  WorkGroup,
} from "./types";

export type { Project, Screenshot, WorkGroup } from "./types";

export const cloudRxPortalGallery: Screenshot[] = [
  { url: doctorApprovals, caption: "Doctor approvals — sortable, paginated results table" },
  { url: patientSearch, caption: "Patient search with slide-out criteria panel" },
  { url: resultsFilter, caption: "Results filtering drawer" },
  { url: addPrescription, caption: "Add a prescription, with live patient details" },
  { url: orderDetails, caption: "Prescription order details and basket" },
  { url: statusReport, caption: "Prescription status report with Excel export" },
  { url: addPatient, caption: "Add patient — multi-column form with postcode lookup" },
  { url: searchValidation, caption: "Form validation and empty state" },
  { url: changePassword, caption: "Change password with password rules" },
];


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
    image: "/projects/project-leo.png",
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
    tags: ["React", "JavaScript", "REST APIs", "Claude Code", "Tailwind", "Azure DevOps"],
    image: "/projects/project-pharma.png",
  },
  {
    id: "cloudrx",
    title: "CloudRx — Marketing Site",
    category: "React Web App",
    role: "Lead Front-End Developer",
    status: "Live",
    description:
      "Static marketing site for the CloudRx pharmacy service. I led the front-end build, applying the same component-breakdown approach to structure clean, reusable page templates.",
    highlights: [
      "Delivered fully responsive, brand-aligned pages from wireframe through to client sign-off.",
      "Built reusable page templates shared with the internal portal build.",
    ],
    tags: ["React", "JavaScript", "SCSS", "Tailwind", "REST APIs", "BitBucket"],
    image: cloudRxSignIn,
    liveUrl: "https://www.cloudrx.co.uk/",
  },
  {
    id: "cloudrx-portal",
    title: "CloudRx — Doctors Portal",
    category: "React Web App",
    role: "Lead Front-End Developer",
    status: "Internal",
    description:
      "Internal portal for prescribers: patient search and records, prescription creation and approval, delivery details and reporting. I led the front-end build from component breakdown through styling and REST API integration.",
    highlights: [
      "Built data-heavy tables with sorting, pagination and per-row actions from reusable base components.",
      "Created multi-step prescription and patient forms with validation, postcode lookup and clear empty/error states.",
      "Delivered filter drawers, slide-out panels and reporting screens with Excel export against the brand guidelines.",
      "Integrated the REST API endpoints for patients, prescriptions, approvals and reports.",
    ],
    tags: ["React", "JavaScript", "SCSS", "REST APIs", "Axios", "BitBucket"],
    image: doctorApprovals,
    gallery: cloudRxPortalGallery,
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
    image: "/projects/project-mobile.png",
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
    image: "/projects/project-edge-electrical.png",
  },
];

export const workGroups: WorkGroup[] = [
  {
    title: "Front-End Collaboration — team of 3",
    blurb: "Contributed to build, styling and API integration across:",
    items: [
      { name: "RiskSmart", url: "https://www.risksmart.com/" },
      { name: "Stax Trade Centres", url: "https://www.staxtradecentres.co.uk/" },
      { name: "Ballerz", url: "https://ballerz.co.uk/", note: "plus internal portal & game screens" },
      { name: "Helix" },
      { name: "Suite Spotter" },
      { name: "Sensore Health", url: "https://sensore.health/", note: "tablet app" },
      { name: "Appeals Centre", url: "https://www.appealscentre.eu/" },
    ],
  },
  {
    title: "Legacy Code & CMS Front-End Support",
    blurb: "Picked up tickets on legacy codebases and built front-ends within existing CMS platforms:",
    items: [
      { name: "Glindexes", url: "https://www.glindexes.com/" },
      { name: "Chase de Vere", url: "https://chasedevere.co.uk/" },
      { name: "Solar Configurator", url: "https://www.solarconfigurator.co.uk/" },
      { name: "Sturge Toth", url: "https://sturgetoth.com/" },
      { name: "Hamerville", url: "https://hamerville.co.uk/", note: "app" },
    ],
  },
];


export const architecture: { title: string; intro: string; steps: ApproachStep[] } = {
  title: "How I approach a front-end build",
  intro:
    "Once wireframes are handed over, I break the design down into a component architecture before development starts.",
  steps: [
    {
      title: "Break down the design",
      body: "Following Brad Frost's atomic design approach, I map atoms, molecules, organisms, templates and pages in a build spreadsheet to identify what can be reused across the project.",
    },
    {
      title: "Build dynamic-first",
      body: "Components are built to take data from the start, with API data plumbed in at parent level so child components stay presentational and reusable.",
    },
    {
      title: "Own the structure and styling",
      body: "I lead the structural breakdown, initial build and styling myself, keeping the UI consistent with Figma and brand guidelines.",
    },
    {
      title: "Bring in support to ship",
      body: "As deadlines approach I bring in one or two developers for larger components and API integration, reviewing the work back into the architecture.",
    },
  ],
};

export const snippets: Snippet[] = [
  {
    id: "api-hook",
    title: "Form Validation",
    language: "React Native",
    description: "",
    code: `const siteVisitSchema = object().shape({
      shiftType: string().required(),
      permitRequired: string().oneOf(["Yes", "No"]).required(),
    
      // Only required when the sibling field flags it — avoids maintaining
      // a separate schema per branch of the form.
      permitNumbers: array()
        .of(object({ value: string().required("Enter a permit number") }))
        .when("permitRequired", {
          is: "Yes",
          then: (schema) => schema.min(1, "Enter at least one permit number"),
          otherwise: (schema) => schema.notRequired(),
        }),
    
      hazards: array().of(string()).min(1, "Select at least one hazard"),
      hazardsOther: string().when("hazards", {
        is: (hazards: string[]) => hazards?.includes("Other"),
        then: (schema) => schema.required("Describe the hazard"),
        otherwise: (schema) => schema.notRequired(),
      }),
    });
    
    /** Runs a Yup schema and reshapes the result into { isValid, errors },
     *  ready to hand straight to form state. */
    async function validateForm<T extends object>(schema: ObjectSchema<T>, values: T) {
      try {
        await schema.validate(values, { abortEarly: false });
        return { isValid: true, errors: {} as Record<string, string> };
      } catch (error) {
        const errors: Record<string, string> = {};
        if (error instanceof ValidationError) {
          error.inner.forEach((err) => {
            if (err.path) errors[err.path] = err.message;
          });
        }
        return { isValid: false, errors };
      }
    }`,
  },
//   {
//     id: "parent-level-data",
//     title: "Data at the parent, presentation in the child",
//     language: "TypeScript (TSX)",
//     description:
//       "How I structure screens: the parent owns the typed API data and state, child components stay dumb and reusable — the pattern behind LEO and the prescriptions portals.",
//     code: `interface Prescription {
//   id: string;
//   patient: string;
//   status: "pending" | "approved" | "rejected";
//   issuedAt: string;
// }

// function PrescriptionList() {
//   const { data, loading, error } =
//     useAxiosFetch<Prescription[]>("/api/prescriptions");

//   if (loading) return <ListSkeleton rows={5} />;
//   if (error) return <ErrorState onRetry={refetch} />;

//   return (
//     <ul className="grid gap-4">
//       {data?.map((rx) => (
//         <PrescriptionCard
//           key={rx.id}
//           patient={rx.patient}
//           status={rx.status}
//           issuedAt={rx.issuedAt}
//         />
//       ))}
//     </ul>
//   );
// }`,
//   },
//   {
//     id: "card-component",
//     title: "Typed Animated Project Card",
//     language: "TypeScript (TSX)",
//     description:
//       "A polished card with hover lift, glow, and image scale using only Tailwind utilities — with a typed props contract.",
//     code: `interface ProjectCardProps {
//   title: string;
//   image: string;
//   onOpen?: () => void;
// }

// export function ProjectCard({ title, image, onOpen }: ProjectCardProps) {
//   return (
//     <article
//       onClick={onOpen}
//       className="group rounded-2xl border border-border bg-card
//         transition-all duration-300 hover:-translate-y-1
//         hover:border-primary/40"
//     >
//       <div className="aspect-4/3 overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="h-full w-full object-cover
//             transition-transform duration-500 group-hover:scale-105"
//         />
//       </div>
//     </article>
//   );
// }`,
//   },
];


export const techStack: string[] = [
  "React.js",
  "React Native",
  "JavaScript (ES6+)",
  "TypeScript (upskilling)",
  "HTML5",
  "CSS / SCSS",
  "Tailwind",
  "Bootstrap",
  "REST APIs",
  "Axios",
  "Node.js",
  "PHP (legacy)",
  ".NET (familiarisation)",
  "Azure DevOps",
  "Docker",
  "Storybook",
  "Xcode",
  "Git / GitHub / BitBucket",
  "WordPress (CMS)",
  "Claude Code",
];

export const certifications: string[] = [
  "MentorHER – mentee",
  "Intro to Web Dev – Code First Girls",
  "Web Dev Group Project – Code First Girls",
  "Git & GitHub – Codecademy",
  "HTML / CSS – Codecademy",
];

export const experience: ExperienceItem[] = [
  {
    role: "Front End Developer",
    company: "JB Cole UK (now Bolland & Co)",
    period: "2024 – Present",
    description:
      "Led front-end delivery — from component architecture through to build and API integration — on 2 of 18 client projects, spanning 4 apps and 14 websites; collaborated in a small front-end team of 2–3 on the majority of the rest, and picked up legacy codebase and CMS ticket work on 5. Integrate REST APIs alongside back-end developers, apply clean code standards, considered state management and performance optimisation as everyday practice, and use Claude Code in the terminal to speed up delivery — including the component-architecture planning phase, now under a day rather than 2–3. Active in code review, stand-ups and sprint planning across Agile and Waterfall projects, and building TypeScript into day-to-day work.",
  },
  {
    role: "Apprentice Software Engineer",
    company: "JB Cole UK",
    period: "2023 – 2024",
    description:
      "Hands-on experience on real-world front-end projects using React, contributing to bug fixes, UI improvements and API integrations. Shadowed senior developers to build understanding of clean code, accessibility and version-control best practice.",
  },
];

export const education: EducationItem[] = [
  {
    title: "Software Developer Apprenticeship – Level 4",
    institution: "Manchester Digital",
    period: "2023 – 2024",
  },
  {
    title: "Front End Web Dev Certification – Bootcamp",
    institution: "University of Birmingham",
    period: "2022 – 2023",
  },
];

export const interests: string[] = [
  "Music & gigs",
  "Dog walks",
  "Dining out",
  "Activity bars",
  "Puzzles",
  "Reading",
];
