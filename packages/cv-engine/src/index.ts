import {
  experiences,
  profile,
  projects,
  skills,
  type Experience,
  type Link,
  type Project,
  type SkillGroup,
  type SkillGroupId,
  type TranslatableText,
} from "@patorsiang/content";

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
  readonly matchedKeywords: readonly string[];
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

class CvEngineInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CvEngineInputError";
  }
}

const roleConfigs = {
  fullstack_engineer: {
    id: "fullstack_engineer",
    label: "Full-Stack Engineer",
    targetTitle: "Full-Stack Developer",
    summaryIntent:
      "Show end-to-end product development ability across frontend, backend, cloud, data, and secure systems.",
    requiredTags: ["frontend", "backend", "web", "software engineering"],
    preferredTags: ["react", "next.js", "node.js", "api", "cloud", "database", "security", "ai"],
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

export function generateCV(role: CvRoleId, lang: CvLanguage): GeneratedCV {
  const roleConfig = getRoleConfig(role);

  if (lang !== "en") {
    throw new CvEngineInputError(`Unsupported CV language "${lang}". Supported languages: en.`);
  }

  const rankedExperience = publicEnglishExperiences()
    .filter((experience) => experience.type === "work" || experience.type === "internship")
    .map((experience) => ({
      item: experience,
      debug: rankExperience(experience, roleConfig),
    }))
    .sort(compareRankedItems)
    .slice(0, roleConfig.limits.maxExperienceItems);

  const rankedProjects = publicEnglishProjects()
    .map((project) => ({
      item: project,
      debug: rankProject(project, roleConfig),
    }))
    .filter(({ item, debug }) => item.status !== "archived" || debug.score >= 0.5)
    .sort(compareRankedItems)
    .slice(0, roleConfig.limits.maxProjects);

  const education = publicEnglishExperiences()
    .filter((experience) => experience.type === "education")
    .sort(compareExperienceDates)
    .map((item) => toGeneratedEducation(item, lang));

  const awards = publicEnglishExperiences()
    .filter((experience) => experience.type === "award" || experience.type === "activity")
    .sort(compareExperienceDates)
    .map((item) => toGeneratedAward(item, lang));

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      roleId: roleConfig.id,
      language: lang,
      maxPages: roleConfig.limits.maxPages,
      sourceVersion: "portfolio-content-v1",
      sectionOrder: roleConfig.sectionOrder,
      warnings: buildWarnings(roleConfig, rankedExperience, rankedProjects),
    },
    header: {
      name: text(profile.name, lang),
      targetTitle: roleConfig.targetTitle,
      location: text(profile.location, lang),
      email: linkLabel(profile.contact.email, lang),
      links: profile.links.map((link) => toCvLink(link, lang)),
    },
    summary: {
      text: buildSummary(roleConfig, lang),
    },
    skills: buildSkills(roleConfig, lang),
    experience: rankedExperience.map(({ item, debug }) =>
      toGeneratedExperience(item, debug, roleConfig, lang),
    ),
    projects: rankedProjects.map(({ item, debug }) => toGeneratedProject(item, debug, lang)),
    education,
    awards,
    languages: buildLanguages(lang),
  };
}

function getRoleConfig(role: CvRoleId): CvRoleConfig {
  const roleConfig = roleConfigs[role];

  if (!roleConfig) {
    throw new CvEngineInputError(
      `Unsupported CV role "${role}". Supported roles: ${Object.keys(roleConfigs).join(", ")}.`,
    );
  }

  return roleConfig;
}

function publicEnglishExperiences() {
  return experiences.filter(
    (experience) => experience.visibility === "public" && experience.locale === "en",
  );
}

function publicEnglishProjects() {
  return projects.filter((project) => project.visibility === "public" && project.locale === "en");
}

function publicEnglishSkills() {
  return skills.filter(
    (skillGroup) => skillGroup.visibility === "public" && skillGroup.locale === "en",
  );
}

function buildSummary(roleConfig: CvRoleConfig, lang: CvLanguage): string {
  return [
    roleConfig.summaryIntent,
    ...profile.summary.map((paragraph) => text(paragraph, lang)),
  ].join(" ");
}

function buildSkills(roleConfig: CvRoleConfig, lang: CvLanguage): readonly GeneratedCvSkillGroup[] {
  return publicEnglishSkills()
    .map((skillGroup) => ({
      skillGroup,
      priorityIndex: roleConfig.prioritySkillGroups.indexOf(skillGroup.groupId),
    }))
    .filter(({ skillGroup }) => skillGroup.groupId !== "languages")
    .sort((a, b) => {
      if (a.priorityIndex === -1 && b.priorityIndex === -1) {
        return text(a.skillGroup.label, lang).localeCompare(text(b.skillGroup.label, lang));
      }

      if (a.priorityIndex === -1) {
        return 1;
      }

      if (b.priorityIndex === -1) {
        return -1;
      }

      return a.priorityIndex - b.priorityIndex;
    })
    .map(({ skillGroup }) => ({
      id: skillGroup.id,
      group: text(skillGroup.label, lang),
      items: orderSkillItems(skillGroup, roleConfig).slice(0, roleConfig.limits.maxSkillsPerGroup),
    }));
}

function buildLanguages(lang: CvLanguage): readonly GeneratedCvLanguage[] {
  const languageGroup = publicEnglishSkills().find(
    (skillGroup) => skillGroup.groupId === "languages",
  );

  if (!languageGroup) {
    return [];
  }

  return languageGroup.items.map((item) => {
    const [name, ...levelParts] = item.split(":");

    return {
      name: name.trim(),
      level: levelParts.join(":").trim() || text(languageGroup.label, lang),
    };
  });
}

function orderSkillItems(skillGroup: SkillGroup, roleConfig: CvRoleConfig): readonly string[] {
  const priorityTerms = normalizeTerms([
    ...roleConfig.requiredTags,
    ...roleConfig.preferredTags,
    ...roleConfig.atsKeywords,
  ]);

  return [...skillGroup.items].sort((a, b) => {
    const aPriority = priorityTerms.has(normalizeTerm(a));
    const bPriority = priorityTerms.has(normalizeTerm(b));

    if (aPriority === bPriority) {
      return a.localeCompare(b);
    }

    return aPriority ? -1 : 1;
  });
}

function rankExperience(experience: Experience, roleConfig: CvRoleConfig): CvRankDebug {
  const searchValues = [
    text(experience.title, "en"),
    text(experience.organization, "en"),
    text(experience.summary, "en"),
    ...experience.highlights.map((highlight) => text(highlight, "en")),
    ...experience.skills,
  ];
  const terms = itemTerms(searchValues);
  const searchText = normalizedSearchText(searchValues);
  const matchedKeywords = matchedRoleKeywords(terms, searchText, roleConfig);
  const roleMatch = overlapScore(searchText, [
    ...roleConfig.requiredTags,
    ...roleConfig.preferredTags,
  ]);
  const keywordMatch = overlapScore(searchText, roleConfig.atsKeywords);
  const typeBoost = roleConfig.priorityExperienceTypes.includes(experience.type) ? 0.1 : 0;
  const impact = impactScore([
    text(experience.summary, "en"),
    ...experience.highlights.map((highlight) => text(highlight, "en")),
  ]);
  const recency = recencyScore(experience.endDate, experience.current);

  return {
    score: roundScore(
      roleMatch * 0.35 + keywordMatch * 0.25 + impact * 0.15 + recency * 0.15 + typeBoost,
    ),
    matchedKeywords,
  };
}

function rankProject(project: Project, roleConfig: CvRoleConfig): CvRankDebug {
  const searchValues = [
    text(project.title, "en"),
    project.category,
    text(project.summary, "en"),
    text(project.role, "en"),
    ...project.techStack,
    ...project.highlights.map((highlight) => text(highlight, "en")),
  ];
  const terms = itemTerms(searchValues);
  const searchText = normalizedSearchText(searchValues);
  const matchedKeywords = matchedRoleKeywords(terms, searchText, roleConfig);
  const roleMatch = overlapScore(searchText, [
    ...roleConfig.requiredTags,
    ...roleConfig.preferredTags,
    ...roleConfig.priorityProjectCategories,
  ]);
  const keywordMatch = overlapScore(searchText, roleConfig.atsKeywords);
  const categoryBoost = roleConfig.priorityProjectCategories.includes(project.category) ? 0.12 : 0;
  const placementBoost = project.placement === "featured-project" ? 0.08 : 0;
  const evidence = evidenceScore(project);
  const freshness = project.timeframe
    ? timeframeFreshnessScore(text(project.timeframe, "en"))
    : 0.4;

  return {
    score: roundScore(
      roleMatch * 0.35 +
        keywordMatch * 0.25 +
        evidence * 0.1 +
        freshness * 0.1 +
        categoryBoost +
        placementBoost,
    ),
    matchedKeywords,
  };
}

function toGeneratedExperience(
  item: Experience,
  rankDebug: CvRankDebug,
  roleConfig: CvRoleConfig,
  lang: CvLanguage,
): GeneratedCvExperience {
  return {
    id: item.id,
    title: text(item.title, lang),
    organization: text(item.organization, lang),
    location: text(item.location, lang),
    startDate: item.startDate,
    endDate: item.current ? "present" : (item.endDate ?? "present"),
    summary: text(item.summary, lang),
    bullets: item.highlights
      .map((highlight) => text(highlight, lang))
      .slice(0, roleConfig.limits.maxBulletsPerExperience),
    skills: item.skills,
    rankDebug,
  };
}

function toGeneratedProject(
  item: Project,
  rankDebug: CvRankDebug,
  lang: CvLanguage,
): GeneratedCvProject {
  return {
    id: item.id,
    title: text(item.title, lang),
    subtitle: text(item.role, lang),
    summary: text(item.summary, lang),
    technologies: item.techStack,
    links: item.links.map((link) => toCvLink(link, lang)),
    rankDebug,
  };
}

function toGeneratedEducation(item: Experience, lang: CvLanguage): GeneratedCvEducation {
  return {
    id: item.id,
    degree: text(item.title, lang),
    organization: text(item.organization, lang),
    location: text(item.location, lang),
    startDate: item.startDate,
    endDate: item.current ? "present" : (item.endDate ?? "present"),
    summary: text(item.summary, lang),
    bullets: item.highlights.map((highlight) => text(highlight, lang)),
  };
}

function toGeneratedAward(item: Experience, lang: CvLanguage): GeneratedCvAward {
  return {
    id: item.id,
    title: text(item.title, lang),
    organization: text(item.organization, lang),
    summary: text(item.summary, lang),
  };
}

function buildWarnings(
  roleConfig: CvRoleConfig,
  rankedExperience: readonly { readonly debug: CvRankDebug }[],
  rankedProjects: readonly { readonly debug: CvRankDebug }[],
): readonly string[] {
  const warnings: string[] = [];
  const matchedKeywords = new Set(
    [...rankedExperience, ...rankedProjects].flatMap(({ debug }) =>
      debug.matchedKeywords.map(normalizeTerm),
    ),
  );
  const missingKeywords = roleConfig.atsKeywords.filter(
    (keyword) => !matchedKeywords.has(normalizeTerm(keyword)),
  );

  if (missingKeywords.length > 0) {
    warnings.push(`Missing ATS keyword coverage: ${missingKeywords.slice(0, 6).join(", ")}.`);
  }

  if (rankedProjects.length < roleConfig.limits.maxProjects) {
    warnings.push(
      `Only ${rankedProjects.length} public project(s) matched the ${roleConfig.id} role.`,
    );
  }

  return warnings;
}

function matchedRoleKeywords(
  terms: ReadonlySet<string>,
  searchText: string,
  roleConfig: CvRoleConfig,
): readonly string[] {
  return [
    ...roleConfig.atsKeywords,
    ...roleConfig.requiredTags,
    ...roleConfig.preferredTags,
  ].filter((keyword) => matchesKeyword(terms, searchText, keyword));
}

function overlapScore(searchText: string, keywords: readonly string[]): number {
  if (keywords.length === 0) {
    return 0;
  }

  const matchedCount = keywords.filter((keyword) =>
    searchText.includes(normalizeTerm(keyword)),
  ).length;

  return matchedCount / keywords.length;
}

function impactScore(lines: readonly string[]): number {
  const impactTerms = [
    "built",
    "designed",
    "developed",
    "delivered",
    "improved",
    "automated",
    "reduced",
  ];
  const searchText = normalizedSearchText(lines);

  return overlapScore(searchText, impactTerms);
}

function evidenceScore(project: Project): number {
  if (project.links.some((link) => normalizeTerm(text(link.label, "en")).includes("github"))) {
    return 0.7;
  }

  if (project.links.length > 0) {
    return 0.5;
  }

  return 0.2;
}

function recencyScore(endDate?: string, current?: boolean): number {
  if (current || !endDate) {
    return 1;
  }

  const year = Number.parseInt(endDate.slice(0, 4), 10);

  if (Number.isNaN(year)) {
    return 0.4;
  }

  return yearScore(year);
}

function timeframeFreshnessScore(timeframe: string): number {
  const yearMatch = timeframe.match(/\d{4}/);

  if (!yearMatch) {
    return 0.4;
  }

  return yearScore(Number.parseInt(yearMatch[0], 10));
}

function yearScore(year: number): number {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age <= 1) {
    return 1;
  }

  if (age <= 2) {
    return 0.8;
  }

  if (age <= 5) {
    return 0.5;
  }

  return 0.2;
}

function itemTerms(values: readonly string[]): ReadonlySet<string> {
  const terms = values.flatMap((value) =>
    value
      .split(/[^a-zA-Z0-9+#.]+/)
      .map(normalizeTerm)
      .filter(Boolean),
  );

  return new Set(terms);
}

function matchesKeyword(terms: ReadonlySet<string>, searchText: string, keyword: string): boolean {
  const normalizedKeyword = normalizeTerm(keyword);

  return terms.has(normalizedKeyword) || searchText.includes(normalizedKeyword);
}

function normalizedSearchText(values: readonly string[]): string {
  return values.map(normalizeTerm).join(" ");
}

function normalizeTerms(values: readonly string[]): ReadonlySet<string> {
  return new Set(values.map(normalizeTerm));
}

function normalizeTerm(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim();
}

function compareRankedItems(
  a: { readonly debug: CvRankDebug },
  b: { readonly debug: CvRankDebug },
): number {
  return b.debug.score - a.debug.score;
}

function compareExperienceDates(a: Experience, b: Experience): number {
  return comparableDate(b.endDate ?? b.startDate) - comparableDate(a.endDate ?? a.startDate);
}

function comparableDate(value: string): number {
  const [year = "0", month = "1"] = value.split("-");

  return Number.parseInt(year, 10) * 100 + Number.parseInt(month, 10);
}

function text(value: TranslatableText, lang: CvLanguage): string {
  if (lang === "en") {
    return value.en;
  }

  return value.en;
}

function toCvLink(link: Link, lang: CvLanguage): CvLink {
  return {
    label: linkLabel(link, lang),
    url: link.url,
  };
}

function linkLabel(link: Link, lang: CvLanguage): string {
  return text(link.label, lang);
}

function roundScore(value: number): number {
  return Math.round(Math.min(value, 1) * 100) / 100;
}
