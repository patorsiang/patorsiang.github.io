import type { Experience, Project, SkillGroupId } from "@patorsiang/content";
import type { ProjectScoreBreakdown } from "./project-ranking";

export type CvRoleId = "fullstack_engineer" | "ai_ml_engineer" | "security_engineer";
export type CvLanguage = "en";

export type CvSectionId =
  | "header"
  | "summary"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "awards"
  | "languages";

export type CvRankDebug = {
  readonly score: number;
  readonly priorityScore?: number;
  readonly matchedKeywords: readonly string[];
  readonly scoreBreakdown?: ProjectScoreBreakdown;
};

export type CvLink = {
  readonly label: string;
  readonly url: string;
};

export type CvHeader = {
  readonly name: string;
  readonly targetTitle: string;
  readonly location: string;
  readonly email: string;
  readonly links: readonly CvLink[];
};

export type GeneratedCvSkillGroup = {
  readonly id: string;
  readonly group: string;
  readonly items: readonly string[];
};

export type GeneratedCvExperience = {
  readonly id: string;
  readonly title: string;
  readonly organization: string;
  readonly location: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly summary: string;
  readonly bullets: readonly string[];
  readonly skills: readonly string[];
  readonly rankDebug: CvRankDebug;
};

export type GeneratedCvProject = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly links: readonly CvLink[];
  readonly rankDebug: CvRankDebug;
};

export type GeneratedCvEducation = {
  readonly id: string;
  readonly degree: string;
  readonly organization: string;
  readonly location: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly summary: string;
  readonly bullets: readonly string[];
};

export type GeneratedCvAward = {
  readonly id: string;
  readonly title: string;
  readonly organization: string;
  readonly summary: string;
};

export type GeneratedCvLanguage = {
  readonly name: string;
  readonly level: string;
};

export type GeneratedCVMeta = {
  readonly generatedAt: string;
  readonly roleId: CvRoleId;
  readonly language: CvLanguage;
  readonly maxPages: number;
  readonly sourceVersion: "portfolio-content-v1";
  readonly sectionOrder: readonly CvSectionId[];
  readonly warnings: readonly string[];
};

export type GeneratedCV = {
  readonly meta: GeneratedCVMeta;
  readonly header: CvHeader;
  readonly summary: {
    readonly text: string;
  };
  readonly skills: readonly GeneratedCvSkillGroup[];
  readonly experience: readonly GeneratedCvExperience[];
  readonly projects: readonly GeneratedCvProject[];
  readonly education: readonly GeneratedCvEducation[];
  readonly awards: readonly GeneratedCvAward[];
  readonly languages: readonly GeneratedCvLanguage[];
};

export type CvRoleConfig = {
  readonly id: CvRoleId;
  readonly label: string;
  readonly targetTitle: string;
  readonly summaryIntent: string;
  readonly requiredTags: readonly string[];
  readonly preferredTags: readonly string[];
  readonly excludedTags?: readonly string[];
  readonly atsKeywords: readonly string[];
  readonly prioritySkillGroups: readonly SkillGroupId[];
  readonly priorityProjectCategories: readonly Project["category"][];
  readonly priorityExperienceTypes: readonly Experience["type"][];
  readonly sectionOrder: readonly CvSectionId[];
  readonly limits: {
    readonly maxPages: number;
    readonly maxProjects: number;
    readonly maxExperienceItems: number;
    readonly maxBulletsPerExperience: number;
    readonly maxSkillsPerGroup: number;
  };
};

export class CvEngineInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CvEngineInputError";
  }
}

export const roleConfigs = {
  fullstack_engineer: {
    id: "fullstack_engineer",
    label: "Full-Stack Engineer",
    targetTitle: "Full-Stack Developer",
    summaryIntent:
      "Show end-to-end product development ability across frontend, backend, cloud, data, and secure systems.",
    requiredTags: ["frontend", "backend", "web", "software engineering"],
    preferredTags: ["react", "next.js", "node.js", "api", "cloud", "database", "security", "ai"],
    excludedTags: ["private-only", "tutorial-learning"],
    atsKeywords: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "GCP",
      "Docker",
      "Git",
      "Agile",
    ],
    prioritySkillGroups: [
      "programming-fundamentals",
      "frontend",
      "backend-tools",
      "databases",
      "cloud-infrastructure",
      "security-blockchain",
    ],
    priorityProjectCategories: ["web", "ai-ml", "blockchain-fintech", "iot"],
    priorityExperienceTypes: ["work", "internship"],
    sectionOrder: [
      "header",
      "summary",
      "skills",
      "experience",
      "projects",
      "education",
      "awards",
      "languages",
    ],
    limits: {
      maxPages: 2,
      maxProjects: 4,
      maxExperienceItems: 5,
      maxBulletsPerExperience: 4,
      maxSkillsPerGroup: 8,
    },
  },
  ai_ml_engineer: {
    id: "ai_ml_engineer",
    label: "AI / ML Engineer",
    targetTitle: "AI / Machine Learning Engineer",
    summaryIntent:
      "Emphasize machine learning, applied AI systems, data pipelines, model evaluation, and software engineering ability.",
    requiredTags: ["ai", "machine learning", "python", "data"],
    preferredTags: [
      "deep learning",
      "computer vision",
      "tensorflow",
      "scikit-learn",
      "pandas",
      "research",
      "backend",
    ],
    excludedTags: ["private-only", "tutorial-learning"],
    atsKeywords: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Computer Vision",
      "Model Evaluation",
      "FastAPI",
      "Data Processing",
    ],
    prioritySkillGroups: [
      "machine-learning-ai",
      "programming-fundamentals",
      "backend-tools",
      "databases",
      "cloud-infrastructure",
    ],
    priorityProjectCategories: ["ai-ml", "iot", "academic", "blockchain-fintech"],
    priorityExperienceTypes: ["education", "work", "internship"],
    sectionOrder: [
      "header",
      "summary",
      "skills",
      "projects",
      "experience",
      "education",
      "awards",
      "languages",
    ],
    limits: {
      maxPages: 2,
      maxProjects: 5,
      maxExperienceItems: 4,
      maxBulletsPerExperience: 3,
      maxSkillsPerGroup: 8,
    },
  },
  security_engineer: {
    id: "security_engineer",
    label: "Security Engineer",
    targetTitle: "Security-Focused Software Engineer",
    summaryIntent:
      "Show secure software development, cybersecurity learning, CTF activity, cryptography, and blockchain-related security exposure.",
    requiredTags: ["security", "software engineering"],
    preferredTags: ["ctf", "cryptography", "blockchain", "linux", "backend", "cloud", "python"],
    excludedTags: ["private-only", "tutorial-learning"],
    atsKeywords: [
      "Cybersecurity",
      "CTF",
      "Linux",
      "Python",
      "Cryptography",
      "RSA",
      "Blockchain",
      "Secure Backend",
      "Node.js",
      "Go",
      "Hyperledger Fabric",
    ],
    prioritySkillGroups: [
      "security-blockchain",
      "programming-fundamentals",
      "backend-tools",
      "cloud-infrastructure",
      "databases",
    ],
    priorityProjectCategories: ["security-ctf", "blockchain-fintech", "ai-ml", "iot"],
    priorityExperienceTypes: ["work", "internship", "education", "activity", "award"],
    sectionOrder: [
      "header",
      "summary",
      "skills",
      "experience",
      "awards",
      "projects",
      "education",
      "languages",
    ],
    limits: {
      maxPages: 2,
      maxProjects: 4,
      maxExperienceItems: 5,
      maxBulletsPerExperience: 3,
      maxSkillsPerGroup: 8,
    },
  },
} as const satisfies Record<CvRoleId, CvRoleConfig>;

export function getRoleConfig(role: CvRoleId): CvRoleConfig {
  const roleConfig = roleConfigs[role];

  if (!roleConfig) {
    throw new CvEngineInputError(
      `Unsupported CV role "${role}". Supported roles: ${Object.keys(roleConfigs).join(", ")}.`,
    );
  }

  return roleConfig;
}
