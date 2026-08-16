import { legacyProfileSource } from "./shared";
import type { SkillGroup } from "../types";

export const skills = [
  {
    id: "skills.programming-fundamentals",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "programming-fundamentals",
    label: {
      en: "Programming & Fundamentals",
      translated: { th: { value: "Programming & Fundamentals", status: "reviewed" } },
    },
    items: ["Java", "Python", "JavaScript/TypeScript", "C++", "Go", "SQL", "CSS", "HTML", "OOP"],
  },
  {
    id: "skills.frontend",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "frontend",
    label: { en: "Frontend", translated: { th: { value: "Frontend", status: "reviewed" } } },
    items: ["React.js", "Next.js", "Angular", "Vue.js", "Nuxt.js", "PWA"],
  },
  {
    id: "skills.backend-tools",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "backend-tools",
    label: {
      en: "Backend & Tools",
      translated: { th: { value: "Backend & Tools", status: "reviewed" } },
    },
    items: ["Node.js", "Express.js", "FastAPI", "Git", "Docker", "UiPath"],
  },
  {
    id: "skills.machine-learning-ai",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "machine-learning-ai",
    label: {
      en: "Machine Learning & AI",
      translated: { th: { value: "Machine Learning & AI", status: "reviewed" } },
    },
    items: ["TensorFlow", "scikit-learn", "Pandas", "NumPy", "Transfer learning"],
  },
  {
    id: "skills.cloud-infrastructure",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "cloud-infrastructure",
    label: {
      en: "Cloud & Infrastructure",
      translated: { th: { value: "Cloud & Infrastructure", status: "reviewed" } },
    },
    items: ["AWS", "GCP", "Azure", "Firebase", "IBM Cloud", "RabbitMQ", "Redis"],
  },
  {
    id: "skills.security-blockchain",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "security-blockchain",
    label: {
      en: "Security, Blockchain & Systems",
      translated: { th: { value: "Security, Blockchain & Systems", status: "reviewed" } },
    },
    items: [
      "RSA cryptography",
      "Blockchain development",
      "Stellar",
      "Hyperledger Fabric",
      "Linux command line",
    ],
  },
  {
    id: "skills.databases",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "databases",
    label: { en: "Databases", translated: { th: { value: "Databases", status: "reviewed" } } },
    items: ["PostgreSQL", "MongoDB", "MSSQL", "ER modeling & query optimization"],
  },
  {
    id: "skills.languages",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "languages",
    label: { en: "Languages", translated: { th: { value: "ภาษา", status: "reviewed" } } },
    items: [
      "Thai: Native",
      "English: IELTS 6 / CEFR B2",
      "Korean: Elementary (TOPIK 1 / Sejong 2A)",
      "Chinese: HSK 2",
    ],
  },
] as const satisfies readonly SkillGroup[];
