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

const roleText = {
  fullstack_engineer: {
    targetTitle: {
      en: "Full-Stack Developer",
      translated: {
        th: {
          value: "นักพัฒนา Full-Stack",
          status: "ai_draft",
        },
      },
    },
    summaryIntent: {
      en: "Show end-to-end product development ability across frontend, backend, cloud, data, and secure systems.",
      translated: {
        th: {
          value:
            "นำเสนอความสามารถในการพัฒนาผลิตภัณฑ์ครบวงจร ครอบคลุม frontend, backend, cloud, data และระบบที่คำนึงถึงความปลอดภัย",
          status: "ai_draft",
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
          status: "ai_draft",
        },
      },
    },
    summaryIntent: {
      en: "Emphasize machine learning, applied AI systems, data pipelines, model evaluation, and software engineering ability.",
      translated: {
        th: {
          value:
            "เน้นประสบการณ์ด้าน machine learning, ระบบ AI เชิงประยุกต์, data pipelines, การประเมินโมเดล และทักษะ software engineering",
          status: "ai_draft",
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
          status: "ai_draft",
        },
      },
    },
    summaryIntent: {
      en: "Show secure software development, cybersecurity learning, CTF activity, cryptography, and blockchain-related security exposure.",
      translated: {
        th: {
          value:
            "นำเสนอประสบการณ์พัฒนาซอฟต์แวร์อย่างปลอดภัย การเรียนรู้ cybersecurity กิจกรรม CTF พื้นฐาน cryptography และงานที่เกี่ยวข้องกับ blockchain security",
          status: "ai_draft",
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
    .sort(compareExperienceDates);

  const awardSource = publicExperiencesForLanguage(lang)
    .filter((experience) => experience.type === "award" || experience.type === "activity")
    .sort(compareExperienceDates);
  const education = educationSource.map((item) => toGeneratedEducation(item, lang));
  const awards = awardSource.map((item) => toGeneratedAward(item, lang));

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      roleId: roleConfig.id,
      language: lang,
      maxPages: roleConfig.limits.maxPages,
      sourceVersion: "portfolio-content-v1",
      sectionOrder: roleConfig.sectionOrder,
      warnings: buildWarnings(roleConfig, filteredProjects, rankedExperiences, educationSource, awardSource, lang),
    },
    header: {
      name: text(profile.name, lang),
      targetTitle: text(roleText[roleConfig.id].targetTitle, lang),
      location: text(profile.location, lang),
      email: linkLabel(profile.contact.email, lang),
      links: profile.links.map((link) => toCvLink(link, lang)),
    },
    summary: {
      text: buildSummary(roleConfig, lang),
    },
    skills: groupSkillsForRole(skills, roleConfig, lang).map((skillGroup) => ({
      id: skillGroup.id,
      category: skillGroup.category,
      group: skillGroup.label,
      items: skillGroup.items,
    })),
    experience: rankedExperiences.map((rankedExperience) =>
      toGeneratedExperience(rankedExperience, roleConfig, lang),
    ),
    projects: filteredProjects.map((project) => toGeneratedProject(project.project, project, lang)),
    education,
    awards,
    languages: buildLanguages(lang),
  };
}

function publicExperiencesForLanguage(lang: CvLanguage) {
  return experiences.filter(
    (experience) =>
      experience.visibility === "public" && isContentAvailableForLanguage(experience.locale, lang),
  );
}

function buildSummary(roleConfig: CvRoleConfig, lang: CvLanguage): string {
  return [
    text(roleText[roleConfig.id].summaryIntent, lang),
    ...profile.summary.map((paragraph) => text(paragraph, lang)),
  ].join(" ");
}

function buildLanguages(lang: CvLanguage): readonly GeneratedCvLanguage[] {
  const languageGroup = skills
    .filter(
      (group) =>
        group.visibility === "public" && isContentAvailableForLanguage(group.locale, lang),
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
    bullets: item.highlights
      .map((highlight) => text(highlight, lang))
      .slice(0, roleConfig.limits.maxBulletsPerExperience),
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
  rankedProject: RankedProject,
  lang: CvLanguage,
): GeneratedCvProject {
  return {
    id: item.id,
    title: text(item.title, lang),
    subtitle: text(item.role, lang),
    summary: text(item.summary, lang),
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
  rankedProjects: readonly RankedProject[],
  rankedExperiences: readonly RankedExperience[],
  education: readonly Experience[],
  awards: readonly Experience[],
  lang: CvLanguage,
): readonly string[] {
  const warnings: string[] = [];
  const matchedKeywords = new Set(
    rankedProjects.flatMap(({ matchedKeywords: keywords }) => keywords.map(normalizeTag)),
  );
  const missingKeywords = roleConfig.atsKeywords.filter(
    (keyword) => !matchedKeywords.has(normalizeTag(keyword)),
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
