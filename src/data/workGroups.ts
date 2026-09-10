import type { WorkGroup } from "./types";

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