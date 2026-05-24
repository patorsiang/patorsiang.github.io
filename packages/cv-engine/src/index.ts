import {
  experiences,
  profile,
  projects,
  skills,
  type Experience,
  type Link,
  type Project,
  type SkillGroup,
  type TranslatableText,
} from "@patorsiang/content";
import {
  type CvHeader,
  type CvLink,
  type CvLanguage,
  type CvRankDebug,
  type CvRoleConfig,
  type CvRoleId,
  type CvSectionId,
  type GeneratedCV,
  type GeneratedCvAward,
  type GeneratedCvEducation,
  type GeneratedCvExperience,
  type GeneratedCvLanguage,
  type GeneratedCvProject,
  type GeneratedCvSkillGroup,
  CvEngineInputError,
  getRoleConfig,
  roleConfigs,
} from "./config";
import { filterProjectsForRole } from "./project-filter";
import { normalizeTag } from "./normalize";
import { rankProjectsForRole, type RankedProject } from "./project-ranking";

export type {
  CvHeader,
  CvLanguage,
  CvRankDebug,
  CvRoleConfig,
  CvRoleId,
  CvSectionId,
  GeneratedCV,
  GeneratedCvAward,
  GeneratedCvEducation,
  GeneratedCvExperience,
  GeneratedCvLanguage,
  GeneratedCvProject,
  GeneratedCvSkillGroup,
};

export { filterProjectsForRole, getRoleConfig, roleConfigs, rankProjectsForRole };
export type { ProjectScoreBreakdown, RankedProject } from "./project-ranking";

export function generateCV(role: CvRoleId, lang: CvLanguage): GeneratedCV {
  const roleConfig = getRoleConfig(role);

  if (lang !== "en") {
    throw new CvEngineInputError(`Unsupported CV language "${lang}". Supported languages: en.`);
  }

  const filteredProjects = rankProjectsForRole(
    filterProjectsForRole(projects, roleConfig, lang),
    roleConfig,
  ).slice(0, roleConfig.limits.maxProjects);

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
      warnings: buildWarnings(roleConfig, filteredProjects),
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
    experience: publicEnglishExperiences()
      .filter((experience) => experience.type === "work" || experience.type === "internship")
      .map((experience) => ({
        item: experience,
        debug: rankExperience(experience, roleConfig),
      }))
      .sort(compareRankedItems)
      .slice(0, roleConfig.limits.maxExperienceItems)
      .map(({ item, debug }) => toGeneratedExperience(item, debug, roleConfig, lang)),
    projects: filteredProjects.map((project) => toGeneratedProject(project.project, project, lang)),
    education,
    awards,
    languages: buildLanguages(lang),
  };
}

function publicEnglishExperiences() {
  return experiences.filter(
    (experience) => experience.visibility === "public" && experience.locale === "en",
  );
}

function buildSummary(roleConfig: CvRoleConfig, lang: CvLanguage): string {
  return [
    roleConfig.summaryIntent,
    ...profile.summary.map((paragraph) => text(paragraph, lang)),
  ].join(" ");
}

function buildSkills(roleConfig: CvRoleConfig, lang: CvLanguage): readonly GeneratedCvSkillGroup[] {
  return skills
    .filter((group) => group.visibility === "public" && group.locale === "en")
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
  const languageGroup = skills
    .filter((group) => group.visibility === "public" && group.locale === "en")
    .find((skillGroup) => skillGroup.groupId === "languages");

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
  const priorityTerms = normalizedSet([
    ...roleConfig.requiredTags,
    ...roleConfig.preferredTags,
    ...roleConfig.atsKeywords,
  ]);

  return [...skillGroup.items].sort((a, b) => {
    const aPriority = priorityTerms.has(normalizeTag(a));
    const bPriority = priorityTerms.has(normalizeTag(b));

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
  const searchText = normalizeSearchText(searchValues);
  const matchedKeywords = matchedRoleKeywords(searchText, roleConfig);
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
  rankedProject: RankedProject,
  lang: CvLanguage,
): GeneratedCvProject {
  const { priorityScore, matchedKeywords, scoreBreakdown } = rankedProject;

  return {
    id: item.id,
    title: text(item.title, lang),
    subtitle: text(item.role, lang),
    summary: text(item.summary, lang),
    technologies: item.techStack,
    links: item.links.map((link) => toCvLink(link, lang)),
    rankDebug: {
      score: priorityScore,
      priorityScore,
      matchedKeywords,
      scoreBreakdown,
    },
  };
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
  rankedProjects: readonly RankedProject[],
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

  return warnings;
}

function matchedRoleKeywords(searchText: string, roleConfig: CvRoleConfig): readonly string[] {
  return [
    ...roleConfig.atsKeywords,
    ...roleConfig.requiredTags,
    ...roleConfig.preferredTags,
  ].filter((keyword) => searchText.includes(normalizeTag(keyword)));
}

function overlapScore(searchText: string, keywords: readonly string[]): number {
  if (keywords.length === 0) {
    return 0;
  }

  const matchedCount = keywords.filter((keyword) =>
    searchText.includes(normalizeTag(keyword)),
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

  return overlapScore(normalizeSearchText(lines), impactTerms);
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

function normalizeSearchText(values: readonly string[]): string {
  return values.map(normalizeTag).join("");
}

function normalizedSet(values: readonly string[]): ReadonlySet<string> {
  return new Set(values.map(normalizeTag));
}

function roundScore(value: number): number {
  return Math.round(Math.min(value, 1) * 100) / 100;
}

function text(value: TranslatableText, lang: CvLanguage): string {
  if (lang === "en") {
    return value.en;
  }

  return value.en;
}

function toCvLink(link: Link, lang: CvLanguage): CvLink {
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
