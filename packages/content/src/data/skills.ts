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
      translated: { th: { value: "Programming & Fundamentals", status: "ai_draft" } },
    },
    items: ["Java", "Python", "JavaScript/TypeScript", "C++", "Go", "SQL", "CSS", "HTML", "OOP"],
  },
  {
    id: "skills.frontend",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "frontend",
    label: { en: "Frontend", translated: { th: { value: "Frontend", status: "ai_draft" } } },
    items: ["React.js", "Next.js", "Angular", "PWA"],
  },
  {
    id: "skills.backend-tools",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "backend-tools",
    label: {
      en: "Backend & Tools",
      translated: { th: { value: "Backend & Tools", status: "ai_draft" } },
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
      translated: { th: { value: "Machine Learning & AI", status: "ai_draft" } },
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
      translated: { th: { value: "Cloud & Infrastructure", status: "ai_draft" } },
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
      en: "Security & Blockchain",
      translated: { th: { value: "Security & Blockchain", status: "ai_draft" } },
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
    label: { en: "Databases", translated: { th: { value: "Databases", status: "ai_draft" } } },
    items: ["PostgreSQL", "MongoDB", "MSSQL", "ER modeling & query optimization"],
  },
  {
    id: "skills.languages",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    groupId: "languages",
    label: { en: "Languages", translated: { th: { value: "ภาษา", status: "ai_draft" } } },
    items: [
      "Thai: Native",
      "English: IELTS 6 / CEFR B2",
      "Korean: Elementary (TOPIK 1 / Sejong 2A)",
    ],
  },
] as const satisfies readonly SkillGroup[];
