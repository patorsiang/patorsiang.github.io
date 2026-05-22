import { legacyProfileSource } from "./shared";
import type { Experience } from "../types";

export const experiences = [
  {
    id: "experience.freelance-frontend-developer",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "work",
    title: { en: "Frontend Developer" },
    organization: { en: "Freelance" },
    location: { en: "Bangkok, Thailand" },
    startDate: "2023-06",
    endDate: "2024-05",
    summary: {
      en: "Designed, built, and deployed responsive websites and dashboards for client projects.",
    },
    highlights: [
      {
        en: "Collected client requirements and translated them into technical specifications and solutions.",
      },
      {
        en: "Built responsive websites using React, Next.js, and cloud hosting platforms.",
      },
      {
        en: "Maintained a corporate WordPress website and built a client analytics dashboard.",
      },
    ],
    skills: ["React", "Next.js", "WordPress", "Cloud Hosting"],
  },
  {
    id: "experience.datawow-frontend-developer",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "work",
    title: { en: "Frontend Developer" },
    organization: { en: "Data Wow Co., Ltd." },
    location: { en: "Bangkok, Thailand" },
    startDate: "2021-12",
    endDate: "2023-04",
    summary: {
      en: "Built privacy, dashboard, and internal-platform products with modern frontend frameworks.",
    },
    highlights: [
      { en: "Built PDPA compliance platforms including Cookie Wow and PDPA Pro." },
      {
        en: "Designed dashboards, LINE bot chat storage systems, and mock exam platforms with real-time data handling.",
      },
      {
        en: "Worked in agile teams to deliver production-ready code under strict deadlines.",
      },
    ],
    skills: ["Next.js", "React", "Ruby", "AWS", "Agile"],
  },
  {
    id: "experience.bank-of-thailand-system-analyst",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "work",
    title: { en: "System Analyst" },
    organization: { en: "Bank of Thailand" },
    location: { en: "Bangkok, Thailand" },
    startDate: "2019-11",
    endDate: "2021-11",
    summary: {
      en: "Contributed to government financial systems involving blockchain, ISO 20022 migration, testing, and automation.",
    },
    highlights: [
      {
        en: "Contributed to DLTBond, a blockchain-based government bond platform.",
      },
      {
        en: "Supported ISO 20022 migration through Java updates, requirements analysis, and system testing.",
      },
      { en: "Automated repetitive workflows using UiPath RPA." },
    ],
    skills: ["Angular", "Node.js", "Go", "Hyperledger Fabric", "Java", "UiPath"],
  },
  {
    id: "experience.kbtg-blockchain-developer-internship",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "internship",
    title: { en: "Blockchain Developer" },
    organization: { en: "KBTG Develop Bootcamp 2019" },
    location: { en: "Bangkok, Thailand" },
    startDate: "2019-06",
    endDate: "2019-08",
    summary: {
      en: "Built a blockchain proof of concept during an Agile three-month sprint.",
    },
    highlights: [
      { en: "Built Time Donation using React and a Go backend with Stellar SDK." },
      {
        en: "Developed a social-impact proof of concept in a bootcamp team environment.",
      },
    ],
    skills: ["React", "Go", "Stellar", "Blockchain", "Agile"],
  },
  {
    id: "experience.beid-frontend-developer-internship",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "internship",
    title: { en: "Frontend Developer" },
    organization: { en: "BeID Corporation Co., Ltd." },
    location: { en: "Bangkok, Thailand" },
    startDate: "2018-06",
    endDate: "2018-07",
    summary: { en: "Developed dashboard and landing-page interfaces." },
    highlights: [{ en: "Developed a dashboard and landing page using React." }],
    skills: ["React"],
  },
  {
    id: "education.university-of-kent-msc-advanced-computer-science",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "education",
    title: { en: "MSc Advanced Computer Science" },
    organization: { en: "University of Kent" },
    location: { en: "Canterbury, UK" },
    startDate: "2024-09",
    endDate: "2025-09",
    summary: {
      en: "Completed an MSc in Advanced Computer Science with distinction.",
    },
    highlights: [
      {
        en: "Studied artificial intelligence, deep learning, computer security, IoT, and quantum computing.",
      },
      {
        en: "Built a cryptocurrency rug pull detection dissertation project.",
      },
    ],
    skills: ["AI", "Deep Learning", "Computer Security", "IoT", "Python"],
  },
  {
    id: "education.mahidol-ict-bsc",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "education",
    title: { en: "B.Sc. Information and Communication Technology" },
    organization: { en: "Mahidol University" },
    location: { en: "Nakhon Pathom, Thailand" },
    startDate: "2015-07",
    endDate: "2019-06",
    summary: {
      en: "Studied Information and Communication Technology with a Database and Intelligent Systems focus.",
    },
    highlights: [
      {
        en: "Studied web programming, human-computer interaction, databases, algorithms, and digital image processing.",
      },
      {
        en: "Built a cultural heritage progressive web app as the senior project.",
      },
    ],
    skills: ["Web Programming", "Databases", "Algorithms", "HCI", "PWA"],
  },
  {
    id: "education.ramkhamhaeng-laws",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "education",
    title: { en: "LL.B. Bachelor of Laws" },
    organization: { en: "Ramkhamhaeng University" },
    location: { en: "Bangkok, Thailand" },
    startDate: "2015",
    endDate: "2023",
    summary: {
      en: "Studied law with coursework related to intellectual property, international trade, and computer-related law.",
    },
    highlights: [
      {
        en: "Built a cross-domain foundation connecting software, product risk, legal context, and people.",
      },
    ],
    skills: ["Law", "Intellectual Property", "Computer-Related Law"],
  },
] as const satisfies readonly Experience[];
