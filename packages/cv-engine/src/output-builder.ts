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
import { normalizeTag } from "./normalize";
import { groupSkillsForRole } from "./skill-grouping";
import { rankProjectsForRole, type RankedProject } from "./project-ranking";

export function buildCVOutput(role: CvRoleId, lang: CvLanguage): GeneratedCV {
  const roleConfig = getRoleConfig(role);

  if (!isCvLanguage(lang)) {
    throw new CvEngineInputError(`Unsupported CV language "${lang}". Supported languages: en.`);
  }

  const filteredProjects = rankProjectsForRole(
    filterProjectsForRole(projects, roleConfig, lang),
    roleConfig,
  ).slice(0, roleConfig.limits.maxProjects);
  const rankedExperiences = selectExperiencesForRole(experiences, roleConfig, lang).slice(
    0,
    roleConfig.limits.maxExperienceItems,
  );

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

function buildLanguages(lang: CvLanguage): readonly GeneratedCvLanguage[] {
  const languageGroup = skills
    .filter((group) => group.visibility === "public" && group.locale === lang)
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
    endDate: item.current ? "present" : (item.endDate ?? "present"),
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

function text(value: TranslatableText, lang: CvLanguage): string {
  if (lang === "en") {
    return value.en;
  }

  return value.en;
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
