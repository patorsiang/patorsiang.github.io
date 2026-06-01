import type { Experience } from "@patorsiang/content";
import type { CvLanguage, CvRoleConfig } from "./config";
import { isContentAvailableForLanguage } from "./content-language";
import { normalizeTag } from "./normalize";
import type { BaseCvRankDebug } from "./types";

export type ExperienceScoreBreakdown = {
  readonly requiredTagMatch: number;
  readonly preferredTagMatch: number;
  readonly keywordMatch: number;
  readonly impactScore: number;
  readonly recencyScore: number;
  readonly typeBoost: number;
};

export type ExperienceRankDebug = BaseCvRankDebug & {
  readonly relevanceScore: number;
  readonly scoreBreakdown: ExperienceScoreBreakdown;
};

export type RankedExperience = {
  readonly experience: Experience;
  readonly relevanceScore: number;
  readonly matchedKeywords: readonly string[];
  readonly scoreBreakdown: ExperienceScoreBreakdown;
};

type RankedExperienceDetail = RankedExperience & {
  readonly isCurrent: boolean;
  readonly endYear: number | null;
  readonly startYear: number | null;
};

export function selectExperiencesForRole(
  experiences: readonly Experience[],
  roleConfig: CvRoleConfig,
  lang: CvLanguage,
  referenceYear = new Date().getFullYear(),
): readonly RankedExperience[] {
  return [...experiences]
    .filter((experience) => isEligibleExperience(experience, roleConfig, lang))
    .map((experience) => scoreExperience(experience, roleConfig, referenceYear))
    .sort(compareRankedExperiences)
    .map(({ isCurrent: _isCurrent, endYear: _endYear, startYear: _startYear, ...experience }) => experience);
}

function isEligibleExperience(
  experience: Experience,
  roleConfig: CvRoleConfig,
  lang: CvLanguage,
): boolean {
  if (experience.visibility !== "public") {
    return false;
  }

  if (!isContentAvailableForLanguage(experience.locale, lang)) {
    return false;
  }

  if (experience.type !== "work" && experience.type !== "internship") {
    return false;
  }

  const excludedTags = normalizedTagSet(roleConfig.excludedTags ?? []);
  const requiredTags = normalizedTagSet(roleConfig.requiredTags);
  const preferredTags = normalizedTagSet(roleConfig.preferredTags);
  const experienceTags = normalizedTagSet(experience.tags);

  if (hasOverlap(experienceTags, excludedTags)) {
    return false;
  }

  return hasOverlap(experienceTags, requiredTags) || hasOverlap(experienceTags, preferredTags);
}

function scoreExperience(
  experience: Experience,
  roleConfig: CvRoleConfig,
  referenceYear: number,
): RankedExperienceDetail {
  const requiredTagMatch = overlapRatio(experience.tags, roleConfig.requiredTags);
  const preferredTagMatch = overlapRatio(experience.tags, roleConfig.preferredTags);
  const searchText = normalizeSearchText([
    experience.title.en,
    experience.organization.en,
    experience.summary.en,
    ...experience.highlights.map((highlight) => highlight.en),
    ...experience.skills,
    ...experience.tags,
  ]);
  const keywordMatch = overlapScore(searchText, roleConfig.atsKeywords);
  const matchedKeywords = matchedKeywordsForSearch(searchText, roleConfig.atsKeywords);
  const impactScore = calculateImpactScore(experience);
  const recencyScore = calculateRecencyScore(experience, referenceYear);
  const typeBoost = roleConfig.priorityExperienceTypes.includes(experience.type) ? 1 : 0;
  const weightedScore =
    requiredTagMatch * 0.3 +
    preferredTagMatch * 0.15 +
    keywordMatch * 0.15 +
    impactScore * 0.2 +
    recencyScore * 0.1 +
    typeBoost * 0.1;
  const relevanceScore = roundScore(weightedScore);

  return {
    experience,
    relevanceScore,
    matchedKeywords,
    scoreBreakdown: {
      requiredTagMatch: roundScore(requiredTagMatch),
      preferredTagMatch: roundScore(preferredTagMatch),
      keywordMatch: roundScore(keywordMatch),
      impactScore: roundScore(impactScore),
      recencyScore: roundScore(recencyScore),
      typeBoost: roundScore(typeBoost),
    },
    isCurrent: Boolean(experience.current),
    endYear: experience.endDate ? extractYear(experience.endDate) : null,
    startYear: extractYear(experience.startDate),
  };
}

function compareRankedExperiences(a: RankedExperienceDetail, b: RankedExperienceDetail): number {
  if (a.relevanceScore !== b.relevanceScore) {
    return b.relevanceScore - a.relevanceScore;
  }

  if (a.isCurrent !== b.isCurrent) {
    return a.isCurrent ? -1 : 1;
  }

  if (a.endYear !== null && b.endYear !== null && a.endYear !== b.endYear) {
    return b.endYear - a.endYear;
  }

  if (a.endYear !== null && b.endYear === null) {
    return -1;
  }

  if (a.endYear === null && b.endYear !== null) {
    return 1;
  }

  if (a.startYear !== null && b.startYear !== null && a.startYear !== b.startYear) {
    return b.startYear - a.startYear;
  }

  if (a.startYear !== null && b.startYear === null) {
    return -1;
  }

  if (a.startYear === null && b.startYear !== null) {
    return 1;
  }

  return a.experience.id.localeCompare(b.experience.id);
}

function calculateImpactScore(experience: Experience): number {
  const impactTerms = [
    "built",
    "designed",
    "developed",
    "deployed",
    "delivered",
    "automated",
    "contributed",
    "supported",
    "maintained",
    "translated",
  ];

  const searchText = normalizeSearchText([
    experience.summary.en,
    ...experience.highlights.map((highlight) => highlight.en),
  ]);
  const matchedTerms = new Set(
    impactTerms.filter((term) => searchText.includes(normalizeTag(term))),
  );

  return Math.min(matchedTerms.size / 3, 1);
}

function calculateRecencyScore(experience: Experience, referenceYear: number): number {
  if (experience.current) {
    return 1;
  }

  if (!experience.endDate) {
    return 0.4;
  }

  const endYear = extractYear(experience.endDate);

  if (endYear === null) {
    return 0.4;
  }

  const age = referenceYear - endYear;

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

function overlapRatio(values: readonly string[], criteria: readonly string[]): number {
  if (criteria.length === 0) {
    return 0;
  }

  const criteriaSet = normalizedTagSet(criteria);
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

function matchedKeywordsForSearch(searchText: string, keywords: readonly string[]): readonly string[] {
  const matched = keywords.filter((keyword) => searchText.includes(normalizeTag(keyword)));

  return [...new Set(matched)];
}

function normalizeSearchText(values: readonly string[]): string {
  return values.map(normalizeTag).join("");
}

function normalizedTagSet(values: readonly string[]): ReadonlySet<string> {
  return new Set(values.map(normalizeTag));
}

function hasOverlap(left: ReadonlySet<string>, right: ReadonlySet<string>): boolean {
  for (const value of left) {
    if (right.has(value)) {
      return true;
    }
  }

  return false;
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
