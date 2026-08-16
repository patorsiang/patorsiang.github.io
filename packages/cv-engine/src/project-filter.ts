import type { Project } from "@patorsiang/content";
import type { CvLanguage, CvRoleConfig } from "./config";
import { isContentAvailableForLanguage } from "./content-language";
import { normalizeTag } from "./normalize";

export function filterProjectsForRole(
  projects: readonly Project[],
  roleConfig: CvRoleConfig,
  lang: CvLanguage,
): readonly Project[] {
  const requiredTags = normalizedTagSet(roleConfig.requiredTags);
  const preferredTags = normalizedTagSet(roleConfig.preferredTags);
  const excludedTags = normalizedTagSet(roleConfig.excludedTags ?? []);

  return projects.filter((project) => {
    if (project.visibility !== "public") {
      return false;
    }

    if (!isContentAvailableForLanguage(project.locale, lang)) {
      return false;
    }

    if (project.status === "archived") {
      return false;
    }

    if (project.tags.some((tag) => excludedTags.has(normalizeTag(tag)))) {
      return false;
    }

    return hasOverlap(project.tags, requiredTags) || hasOverlap(project.tags, preferredTags);
  });
}

function normalizedTagSet(values: readonly string[]): ReadonlySet<string> {
  return new Set(values.map(normalizeTag));
}

function hasOverlap(tags: readonly string[], criteria: ReadonlySet<string>): boolean {
  return tags.some((tag) => criteria.has(normalizeTag(tag)));
}
