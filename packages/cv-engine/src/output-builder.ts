import {
  experiences,
  profile,
  projects,
  skills,
  type Experience,
  type Link,
  type Project,
  type TranslatableText,
} from "@patorsiang/content";
import {
  type CvLanguage,
  type CvRoleId,
  type GeneratedCV,
  type GeneratedCvAward,
  type GeneratedCvEducation,
  type GeneratedCvExperience,
  type GeneratedCvLanguage,
  type GeneratedCvProject,
  type GeneratedCvSkillGroup,
  type CvRoleConfig,
  CvEngineInputError,
  getRoleConfig,
  isCvLanguage,
} from "./config";
import { selectExperiencesForRole, type RankedExperience } from "./experience-selection";
import { filterProjectsForRole } from "./project-filter";
import { isContentAvailableForLanguage, isMissingTranslation, text } from "./content-language";
import { normalizeTag } from "./normalize";
import { groupSkillsForRole } from "./skill-grouping";
import { rankProjectsForRole, type RankedProject } from "./project-ranking";

const fullstackAtsSummary =
  "Full-stack developer currently building cybersecurity, gamified learning, and AI-related platform features at SEC Playground Co., Ltd. Experience includes Vue.js, Nuxt.js, React, Next.js, Angular, Node.js, Java, Go, APIs, SQL, PostgreSQL, MongoDB, AWS, GCP, Docker, Git, Linux, and TypeScript across startup, government, freelance, and client-facing environments.";

const atsMaxEducationItems = 2;
const atsMaxAwardItems = 3;

const atsEducationPriority = new Map<string, number>([
  ["education.university-of-kent-msc-advanced-computer-science", 0],
  ["education.mahidol-ict-bsc", 1],
  ["education.ramkhamhaeng-laws", 2],
]);

const fullstackAtsExperienceBullets: Readonly<Record<string, readonly string[]>> = {
  "experience.freelance-frontend-developer": [
    "Maintained a corporate WordPress site and delivered responsive React and Next.js web interfaces from requirements gathering through deployment support.",
    "Built client-facing dashboards and web experiences using JavaScript/TypeScript, CSS, HTML, and cloud hosting practices.",
    "Coordinated with clients and collaborators to clarify scope, resolve feedback, and ship production-ready frontend changes.",
  ],
  "experience.datawow-frontend-developer": [
    "Built React and Next.js interfaces for PDPA compliance platforms, dashboards, and internal product workflows.",
    "Implemented real-time dashboard and LINE bot chat storage features with frontend state, API integration, and release-ready UI behavior.",
    "Delivered frontend changes in Agile product teams across privacy-tech, mock exam, and internal-platform products.",
  ],
  "experience.bank-of-thailand-system-analyst": [
    "Developed and maintained Angular, Node.js, Go, and Hyperledger Fabric components for DLTBond, a blockchain-based government bond platform.",
    "Supported ISO 20022 migration through Java updates, requirements analysis, SWIFT-standard alignment, and system testing.",
    "Automated repetitive operational workflows with UiPath RPA to reduce manual processing in financial-system operations.",
  ],
  "experience.kbtg-blockchain-developer-internship": [
    "Built a React frontend and Go backend proof of concept integrating the Stellar SDK for a blockchain social-impact application.",
    "Delivered the Time Donation prototype in an Agile team sprint covering frontend, backend, blockchain integration, and demo readiness.",
  ],
  "experience.beid-frontend-developer-internship": [
    "Developed React dashboard and landing-page interfaces for web product prototypes.",
  ],
};

const fullstackAtsProjectSummaries: Readonly<Record<string, string>> = {
  "project.rugpull-detection":
    "Full-stack research prototype using React, FastAPI, Python, Redis, Docker, and TensorFlow to intake contract addresses, run feature extraction, and review DeFi rug-pull risk predictions.",
  "project.smart-shoe":
    "IoT dashboard prototype using Next.js, ESP32 firmware, BLE, MQTT, and sensor data processing to visualize live step, balance, and fall-risk signals.",
  "project.chi-cultural-heritage-pwa":
    "Progressive web app using JavaScript, Node.js, and MongoDB to deliver offline-capable cultural heritage web and mobile experiences.",
};

const roleText = {
  fullstack_engineer: {
    targetTitle: {
      en: "Full-Stack Developer",
      translated: {
        th: {
          value: "Full-Stack Developer",
          status: "approved",
        },
      },
    },
    summaryIntent: {
      en: "Show practical product development experience across frontend, backend, cloud, data, and security-aware systems.",
      translated: {
        th: {
          value:
            "นำเสนอประสบการณ์พัฒนาผลิตภัณฑ์เชิงปฏิบัติ ครอบคลุม frontend, backend, cloud, data และระบบที่คำนึงถึงความปลอดภัย",
          status: "reviewed",
        },
      },
    },
  },
  ai_ml_engineer: {
    targetTitle: {
      en: "AI / Machine Learning Engineer",
      translated: {
        th: {
          value: "วิศวกร AI / Machine Learning",
          status: "approved",
        },
      },
    },
    summaryIntent: {
      en: "Emphasize machine learning, applied AI projects, data pipelines, model evaluation, and software engineering experience.",
      translated: {
        th: {
          value:
            "เน้นประสบการณ์ด้าน machine learning, โปรเจกต์ AI เชิงประยุกต์, data pipelines, การประเมินโมเดล และ software engineering",
          status: "reviewed",
        },
      },
    },
  },
  security_engineer: {
    targetTitle: {
      en: "Security-Focused Software Engineer",
      translated: {
        th: {
          value: "Software Engineer ที่เน้นด้านความปลอดภัย",
          status: "approved",
        },
      },
    },
    summaryIntent: {
      en: "Show security-aware software development, cybersecurity learning, CTF activity, cryptography, and blockchain-related exposure.",
      translated: {
        th: {
          value:
            "นำเสนอประสบการณ์พัฒนาซอฟต์แวร์ที่คำนึงถึงความปลอดภัย การเรียนรู้ cybersecurity กิจกรรม CTF พื้นฐาน cryptography และงานที่เกี่ยวข้องกับ blockchain",
          status: "reviewed",
        },
      },
    },
  },
} as const satisfies Record<
  CvRoleId,
  {
    readonly targetTitle: TranslatableText;
    readonly summaryIntent: TranslatableText;
  }
>;

export function buildCVOutput(role: CvRoleId, lang: CvLanguage): GeneratedCV {
  const roleConfig = getRoleConfig(role);

  if (!isCvLanguage(lang)) {
    throw new CvEngineInputError(`Unsupported CV language "${lang}". Supported languages: en, th.`);
  }

  const filteredProjects = rankProjectsForRole(
    filterProjectsForRole(projects, roleConfig, lang),
    roleConfig,
  ).slice(0, roleConfig.limits.maxProjects);
  const rankedExperiences = selectExperiencesForRole(experiences, roleConfig, lang).slice(
    0,
    roleConfig.limits.maxExperienceItems,
  );

  const educationSource = publicExperiencesForLanguage(lang)
    .filter((experience) => experience.type === "education")
    .sort(compareAtsEducationPriority)
    .slice(0, atsMaxEducationItems);

  const awardSource = publicExperiencesForLanguage(lang)
    .filter((experience) => experience.type === "award" || experience.type === "activity")
    .sort(compareExperienceDates)
    .slice(0, atsMaxAwardItems);
  const summaryText = buildSummary(roleConfig, lang);
  const skillGroups = groupSkillsForRole(skills, roleConfig, lang).map((skillGroup) => ({
    id: skillGroup.id,
    category: skillGroup.category,
    group: skillGroup.label,
    items: skillGroup.items,
  }));
  const generatedExperience = rankedExperiences.map((rankedExperience) =>
    toGeneratedExperience(rankedExperience, roleConfig, lang),
  );
  const generatedProjects = filteredProjects.map((project) =>
    toGeneratedProject(project.project, roleConfig, project, lang),
  );
  const education = educationSource.map((item) => toGeneratedEducation(item, lang));
  const awards = awardSource.map((item) => toGeneratedAward(item, lang));
  const languages = buildLanguages(lang);

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      roleId: roleConfig.id,
      language: lang,
      maxPages: roleConfig.limits.maxPages,
      sourceVersion: "portfolio-content-v1",
      sectionOrder: roleConfig.sectionOrder,
      warnings: buildWarnings(
        roleConfig,
        filteredProjects,
        rankedExperiences,
        {
          summaryText,
          skills: skillGroups,
          experience: generatedExperience,
          projects: generatedProjects,
          education,
          awards,
          languages,
        },
        educationSource,
        awardSource,
        lang,
      ),
    },
    header: {
      name: text(profile.name, lang),
      targetTitle: text(roleText[roleConfig.id].targetTitle, lang),
      location: text(profile.location, lang),
      email: linkLabel(profile.contact.email, lang),
      links: profile.links.map((link) => toCvLink(link, lang)),
    },
    summary: {
      text: summaryText,
    },
    skills: skillGroups,
    experience: generatedExperience,
    projects: generatedProjects,
    education,
    awards,
    languages,
  };
}

function publicExperiencesForLanguage(lang: CvLanguage) {
  return experiences.filter(
    (experience) =>
      experience.visibility === "public" && isContentAvailableForLanguage(experience.locale, lang),
  );
}

function buildSummary(roleConfig: CvRoleConfig, lang: CvLanguage): string {
  if (roleConfig.id === "fullstack_engineer" && lang === "en") {
    return fullstackAtsSummary;
  }

  return [
    text(roleText[roleConfig.id].summaryIntent, lang),
    ...profile.summary.map((paragraph) => text(paragraph, lang)),
  ].join(" ");
}

function buildLanguages(lang: CvLanguage): readonly GeneratedCvLanguage[] {
  const languageGroup = skills
    .filter(
      (group) => group.visibility === "public" && isContentAvailableForLanguage(group.locale, lang),
    )
    .find((skillGroup) => skillGroup.groupId === "languages");

  if (!languageGroup) {
    return [];
  }

  return languageGroup.items.map((item) => {
    const [name, ...levelParts] = formatLanguageItem(item, lang).split(":");

    return {
      name: name.trim(),
      level: levelParts.join(":").trim() || text(languageGroup.label, lang),
    };
  });
}

function toGeneratedExperience(
  rankedExperience: RankedExperience,
  roleConfig: CvRoleConfig,
  lang: CvLanguage,
): GeneratedCvExperience {
  const item = rankedExperience.experience;

  return {
    id: item.id,
    title: text(item.title, lang),
    organization: text(item.organization, lang),
    location: text(item.location, lang),
    startDate: item.startDate,
    endDate: formatOpenEndedDate(item.current ? undefined : item.endDate, lang),
    summary: text(item.summary, lang),
    bullets: buildExperienceBullets(item, roleConfig, lang),
    skills: item.skills,
    rankDebug: {
      score: rankedExperience.relevanceScore,
      relevanceScore: rankedExperience.relevanceScore,
      matchedKeywords: rankedExperience.matchedKeywords,
      scoreBreakdown: rankedExperience.scoreBreakdown,
    },
  };
}

function toGeneratedProject(
  item: Project,
  roleConfig: CvRoleConfig,
  rankedProject: RankedProject,
  lang: CvLanguage,
): GeneratedCvProject {
  return {
    id: item.id,
    title: text(item.title, lang),
    subtitle: text(item.role, lang),
    summary: buildProjectSummary(item, roleConfig, lang),
    technologies: item.techStack,
    links: item.links.map((link) => toCvLink(link, lang)),
    rankDebug: {
      score: rankedProject.priorityScore,
      priorityScore: rankedProject.priorityScore,
      matchedKeywords: rankedProject.matchedKeywords,
      scoreBreakdown: rankedProject.scoreBreakdown,
    },
  };
}

function buildExperienceBullets(
  item: Experience,
  roleConfig: CvRoleConfig,
  lang: CvLanguage,
): readonly string[] {
  const atsBullets =
    roleConfig.id === "fullstack_engineer" && lang === "en"
      ? fullstackAtsExperienceBullets[item.id]
      : undefined;

  return (atsBullets ?? item.highlights.map((highlight) => text(highlight, lang))).slice(
    0,
    roleConfig.limits.maxBulletsPerExperience,
  );
}

function buildProjectSummary(item: Project, roleConfig: CvRoleConfig, lang: CvLanguage): string {
  if (roleConfig.id === "fullstack_engineer" && lang === "en") {
    return fullstackAtsProjectSummaries[item.id] ?? text(item.summary, lang);
  }

  return text(item.summary, lang);
}

function compareAtsEducationPriority(a: Experience, b: Experience): number {
  const priorityDifference = getAtsEducationPriority(a) - getAtsEducationPriority(b);

  return priorityDifference === 0 ? compareExperienceDates(a, b) : priorityDifference;
}

function getAtsEducationPriority(item: Experience): number {
  return atsEducationPriority.get(item.id) ?? 99;
}

function compareExperienceDates(a: Experience, b: Experience): number {
  return comparableDate(b.endDate ?? b.startDate) - comparableDate(a.endDate ?? a.startDate);
}

function toGeneratedEducation(item: Experience, lang: CvLanguage): GeneratedCvEducation {
  return {
    id: item.id,
    degree: text(item.title, lang),
    organization: text(item.organization, lang),
    location: text(item.location, lang),
    startDate: item.startDate,
    endDate: formatOpenEndedDate(item.current ? undefined : item.endDate, lang),
    summary: text(item.summary, lang),
    bullets: item.highlights.map((highlight) => text(highlight, lang)).slice(0, 1),
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
  rankedProjects: readonly RankedProject[],
  rankedExperiences: readonly RankedExperience[],
  generatedContent: {
    readonly summaryText: string;
    readonly skills: readonly GeneratedCvSkillGroup[];
    readonly experience: readonly GeneratedCvExperience[];
    readonly projects: readonly GeneratedCvProject[];
    readonly education: readonly GeneratedCvEducation[];
    readonly awards: readonly GeneratedCvAward[];
    readonly languages: readonly GeneratedCvLanguage[];
  },
  education: readonly Experience[],
  awards: readonly Experience[],
  lang: CvLanguage,
): readonly string[] {
  const warnings: string[] = [];
  const generatedText = normalizeTag(buildGeneratedCvText(generatedContent));
  const missingKeywords = roleConfig.atsKeywords.filter(
    (keyword) => !generatedText.includes(normalizeTag(keyword)),
  );

  if (missingKeywords.length > 0) {
    warnings.push(`Missing ATS keyword coverage: ${missingKeywords.slice(0, 6).join(", ")}.`);
  }

  if (rankedProjects.length < roleConfig.limits.maxProjects) {
    warnings.push(`Only ${rankedProjects.length} project(s) matched the ${roleConfig.id} role.`);
  }

  const fallbackCount = countMissingTranslations({
    lang,
    roleConfig,
    rankedProjects,
    rankedExperiences,
    education,
    awards,
  });

  if (fallbackCount > 0) {
    warnings.push(
      `${fallbackCount} Thai translation field(s) fell back to English draft/source content.`,
    );
  }

  return warnings;
}

function buildGeneratedCvText({
  summaryText,
  skills: generatedSkills,
  experience,
  projects: generatedProjects,
  education,
  awards,
  languages,
}: {
  readonly summaryText: string;
  readonly skills: readonly GeneratedCvSkillGroup[];
  readonly experience: readonly GeneratedCvExperience[];
  readonly projects: readonly GeneratedCvProject[];
  readonly education: readonly GeneratedCvEducation[];
  readonly awards: readonly GeneratedCvAward[];
  readonly languages: readonly GeneratedCvLanguage[];
}): string {
  return [
    summaryText,
    ...generatedSkills.flatMap((group) => [group.group, ...group.items]),
    ...experience.flatMap((item) => [
      item.title,
      item.organization,
      item.summary,
      ...item.bullets,
      ...item.skills,
    ]),
    ...generatedProjects.flatMap((project) => [
      project.title,
      project.subtitle,
      project.summary,
      ...project.technologies,
    ]),
    ...education.flatMap((item) => [item.degree, item.organization, item.summary, ...item.bullets]),
    ...awards.flatMap((item) => [item.title, item.organization, item.summary]),
    ...languages.flatMap((language) => [language.name, language.level]),
  ].join(" ");
}

function formatLanguageItem(item: string, lang: CvLanguage): string {
  if (lang === "en") {
    return item;
  }

  const translations: Record<string, string> = {
    "Thai: Native": "ไทย: ภาษาแม่",
    "English: IELTS 6 / CEFR B2": "อังกฤษ: IELTS 6 / CEFR B2",
    "Korean: Elementary (TOPIK 1 / Sejong 2A)": "เกาหลี: ระดับต้น (TOPIK 1 / Sejong 2A)",
  };

  return translations[item] ?? item;
}

function formatOpenEndedDate(endDate: string | undefined, lang: CvLanguage): string {
  if (endDate) {
    return endDate;
  }

  return lang === "th" ? "ปัจจุบัน" : "present";
}

function countMissingTranslations({
  lang,
  roleConfig,
  rankedProjects,
  rankedExperiences,
  education,
  awards,
}: {
  readonly lang: CvLanguage;
  readonly roleConfig: CvRoleConfig;
  readonly rankedProjects: readonly RankedProject[];
  readonly rankedExperiences: readonly RankedExperience[];
  readonly education: readonly Experience[];
  readonly awards: readonly Experience[];
}): number {
  if (lang === "en") {
    return 0;
  }

  const fields: TranslatableText[] = [
    profile.name,
    profile.location,
    ...profile.links.map((link) => link.label),
    roleText[roleConfig.id].targetTitle,
    roleText[roleConfig.id].summaryIntent,
    ...profile.summary,
    ...rankedExperiences.flatMap(({ experience }) => [
      experience.title,
      experience.organization,
      experience.location,
      experience.summary,
      ...experience.highlights,
    ]),
    ...rankedProjects.flatMap(({ project }) => [
      project.title,
      project.role,
      project.summary,
      ...project.links.map((link) => link.label),
    ]),
    ...education.flatMap((experience) => [
      experience.title,
      experience.organization,
      experience.location,
      experience.summary,
      ...experience.highlights,
    ]),
    ...awards.flatMap((experience) => [
      experience.title,
      experience.organization,
      experience.summary,
    ]),
  ];

  return fields.filter((field) => isMissingTranslation(field, lang)).length;
}

function toCvLink(link: Link, lang: CvLanguage) {
  return {
    label: text(link.label, lang),
    url: link.url,
  };
}

function linkLabel(link: Link, lang: CvLanguage): string {
  return text(link.label, lang);
}

function comparableDate(value: string): number {
  const [year = "0", month = "1"] = value.split("-");

  return Number.parseInt(year, 10) * 100 + Number.parseInt(month, 10);
}
