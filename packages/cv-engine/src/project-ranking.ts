import type { Project } from "@patorsiang/content";
import type { CvRoleConfig } from "./config";
import { normalizeTag } from "./normalize";
import type { BaseCvRankDebug } from "./types";

export type ProjectScoreBreakdown = {
  readonly requiredTagMatch: number;
  readonly preferredTagMatch: number;
  readonly keywordMatch: number;
  readonly categoryMatch: number;
  readonly evidenceScore: number;
  readonly freshnessScore: number;
  readonly placementBoost: number;
};

export type ProjectRankDebug = BaseCvRankDebug & {
  readonly priorityScore: number;
  readonly scoreBreakdown: ProjectScoreBreakdown;
};

export type RankedProject = {
  readonly project: Project;
  readonly priorityScore: number;
  readonly matchedKeywords: readonly string[];
  readonly scoreBreakdown: ProjectScoreBreakdown;
};

type RankedProjectDetail = RankedProject & {
  readonly isFeatured: boolean;
  readonly timeframeYear: number | null;
};

export function rankProjectsForRole(
  projects: readonly Project[],
  roleConfig: CvRoleConfig,
  referenceYear = new Date().getFullYear(),
): readonly RankedProject[] {
  return [...projects]
    .map((project) => scoreProject(project, roleConfig, referenceYear))
    .sort(compareRankedProjectDetails)
    .map(({ isFeatured: _isFeatured, timeframeYear: _timeframeYear, ...project }) => project);
}

function scoreProject(
  project: Project,
  roleConfig: CvRoleConfig,
  referenceYear: number,
): RankedProjectDetail {
  const requiredTagMatch = overlapRatio(project.tags, roleConfig.requiredTags);
  const preferredTagMatch = overlapRatio(project.tags, roleConfig.preferredTags);
  const searchText = normalizeSearchText([
    project.title.en,
    project.summary.en,
    project.role.en,
    ...project.techStack,
    ...project.highlights.map((highlight) => highlight.en),
    ...project.tags,
  ]);
  const keywordMatch = overlapScore(searchText, roleConfig.atsKeywords);
  const matchedKeywords = matchedKeywordsForSearch(searchText, roleConfig.atsKeywords);
  const categoryMatch = roleConfig.priorityProjectCategories.includes(project.category) ? 1 : 0;
  const evidence = evidenceScore(project);
  const freshness = timeframeFreshnessScore(project.timeframe?.en, referenceYear);
  const placementBoost = project.placement === "featured-project" ? 0.05 : 0;
  const weightedScore =
    requiredTagMatch * 0.3 +
    preferredTagMatch * 0.2 +
    keywordMatch * 0.15 +
    categoryMatch * 0.1 +
    evidence * 0.1 +
    freshness * 0.1 +
    placementBoost;
  const priorityScore = roundScore(weightedScore);

  return {
    project,
    priorityScore,
    matchedKeywords,
    scoreBreakdown: {
      requiredTagMatch: roundScore(requiredTagMatch),
      preferredTagMatch: roundScore(preferredTagMatch),
      keywordMatch: roundScore(keywordMatch),
      categoryMatch,
      evidenceScore: roundScore(evidence),
      freshnessScore: roundScore(freshness),
      placementBoost: roundScore(placementBoost),
    },
    isFeatured: project.placement === "featured-project",
    timeframeYear: project.timeframe ? extractYear(project.timeframe.en) : null,
  };
}

function compareRankedProjectDetails(a: RankedProjectDetail, b: RankedProjectDetail): number {
  if (a.priorityScore !== b.priorityScore) {
    return b.priorityScore - a.priorityScore;
  }

  if (a.isFeatured !== b.isFeatured) {
    return a.isFeatured ? -1 : 1;
  }

  if (a.timeframeYear !== null && b.timeframeYear !== null && a.timeframeYear !== b.timeframeYear) {
    return b.timeframeYear - a.timeframeYear;
  }

  if (a.timeframeYear !== null && b.timeframeYear === null) {
    return -1;
  }

  if (a.timeframeYear === null && b.timeframeYear !== null) {
    return 1;
  }

  return a.project.id.localeCompare(b.project.id);
}

function overlapRatio(values: readonly string[], criteria: readonly string[]): number {
  if (criteria.length === 0) {
    return 0;
  }

  const criteriaSet = new Set(criteria.map(normalizeTag));
  const matches = values.filter((value) => criteriaSet.has(normalizeTag(value))).length;

  return matches / criteria.length;
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

function normalizeSearchText(values: readonly string[]): string {
  return values.map(normalizeTag).join("");
}

function matchedKeywordsForSearch(
  searchText: string,
  keywords: readonly string[],
): readonly string[] {
  const matched = keywords.filter((keyword) => searchText.includes(normalizeTag(keyword)));

  return [...new Set(matched)];
}

function evidenceScore(project: Project): number {
  if (
    project.links.some((link) =>
      normalizeTag([link.label.en, link.url].join(" ")).includes("github"),
    )
  ) {
    return 0.7;
  }

  if (project.links.length > 0) {
    return 0.5;
  }

  return 0.2;
}

function timeframeFreshnessScore(timeframe: string | undefined, referenceYear: number): number {
  if (!timeframe) {
    return 0.4;
  }

  const year = extractYear(timeframe);

  if (year === null) {
    return 0.4;
  }

  const age = referenceYear - year;

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

function extractYear(value: string): number | null {
  const match = value.match(/\d{4}/);

  if (!match) {
    return null;
  }

  return Number.parseInt(match[0], 10);
}

function roundScore(value: number): number {
  return Math.round(Math.min(value, 1) * 100) / 100;
}
