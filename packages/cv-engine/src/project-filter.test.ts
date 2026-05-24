import { describe, expect, test } from "bun:test";
import { projects, type Project } from "@patorsiang/content";
import { type CvRoleConfig, type CvSectionId, generateCV } from "./index";
import { filterProjectsForRole } from "./project-filter";

const sectionOrder: readonly CvSectionId[] = [
  "header",
  "summary",
  "skills",
  "experience",
  "projects",
  "education",
  "awards",
  "languages",
];

const baseRoleConfig: CvRoleConfig = {
  id: "fullstack_engineer",
  label: "Fixture Role",
  targetTitle: "Fixture Target",
  summaryIntent: "Fixture summary",
  requiredTags: ["required-tag"],
  preferredTags: ["preferred-tag"],
  excludedTags: ["excluded-tag"],
  atsKeywords: [],
  prioritySkillGroups: [],
  priorityProjectCategories: [],
  priorityExperienceTypes: [],
  sectionOrder,
  limits: {
    maxPages: 2,
    maxProjects: 10,
    maxExperienceItems: 0,
    maxBulletsPerExperience: 0,
    maxSkillsPerGroup: 0,
  },
};

const baseProject = projects[0];

function makeProject(overrides: Partial<Project>): Project {
  return {
    ...baseProject,
    id: `project.fixture.${overrides.slug ?? "base"}`,
    slug: overrides.slug ?? "fixture-base",
    title: overrides.title ?? { en: "Fixture Project" },
    summary: overrides.summary ?? { en: "Fixture summary" },
    role: overrides.role ?? { en: "Developer" },
    techStack: overrides.techStack ?? [],
    tags: overrides.tags ?? [],
    highlights: overrides.highlights ?? [],
    links: overrides.links ?? [],
    placement: overrides.placement ?? "project",
    contributionType: overrides.contributionType ?? "solo",
    category: overrides.category ?? baseProject.category,
    status: overrides.status ?? "prototype",
    locale: overrides.locale ?? "en",
    visibility: overrides.visibility ?? "public",
    source: overrides.source ?? baseProject.source,
    timeframe: overrides.timeframe ?? baseProject.timeframe,
    problem: overrides.problem ?? baseProject.problem,
    audience: overrides.audience ?? baseProject.audience,
    keyLearning: overrides.keyLearning ?? baseProject.keyLearning,
    testingNotes: overrides.testingNotes ?? baseProject.testingNotes,
  };
}

describe("filterProjectsForRole", () => {
  test("includes required and preferred tag matches", () => {
    const required = makeProject({
      slug: "required",
      tags: ["required-tag"],
    });
    const preferred = makeProject({
      slug: "preferred",
      tags: ["preferred-tag"],
    });
    const noMatch = makeProject({
      slug: "no-match",
      tags: ["other-tag"],
    });

    const result = filterProjectsForRole([required, preferred, noMatch], baseRoleConfig, "en");

    expect(result.map((project) => project.slug)).toEqual(["required", "preferred"]);
  });

  test("excludes excluded tags even when the project also matches preferred tags", () => {
    const excluded = makeProject({
      slug: "excluded",
      tags: ["preferred-tag", "excluded-tag"],
    });

    const result = filterProjectsForRole([excluded], baseRoleConfig, "en");

    expect(result).toEqual([]);
  });

  test("excludes private, other locale, and archived projects", () => {
    const privateProject = makeProject({
      slug: "private",
      tags: ["required-tag"],
      visibility: "private",
    });
    const otherLocale = makeProject({
      slug: "other-locale",
      tags: ["required-tag"],
      locale: "th",
    });
    const archived = makeProject({
      slug: "archived",
      tags: ["required-tag"],
      status: "archived",
    });

    const result = filterProjectsForRole(
      [privateProject, otherLocale, archived],
      baseRoleConfig,
      "en",
    );

    expect(result).toEqual([]);
  });

  test("normalizes tag forms consistently", () => {
    const normalizedRole: CvRoleConfig = {
      ...baseRoleConfig,
      requiredTags: ["software-engineering"],
      preferredTags: [],
      excludedTags: [],
    };
    const project = makeProject({
      slug: "normalized",
      tags: ["Software Engineering"],
    });

    const result = filterProjectsForRole([project], normalizedRole, "en");

    expect(result.map((item) => item.slug)).toEqual(["normalized"]);
  });
});

describe("generateCV project filtering", () => {
  test("ai_ml_engineer only keeps eligible projects before ranking and limiting", () => {
    const cv = generateCV("ai_ml_engineer", "en");

    expect(cv.projects.map((project) => project.id)).toEqual([
      "project.rugpull-detection",
      "project.chi-cultural-heritage-pwa",
    ]);
  });

  test("security_engineer does not reintroduce archived projects", () => {
    const cv = generateCV("security_engineer", "en");
    const archivedIds = new Set(
      projects.filter((project) => project.status === "archived").map((project) => project.id),
    );

    expect(cv.projects.length).toBeGreaterThan(0);
    expect(cv.projects.every((project) => !archivedIds.has(project.id))).toBe(true);
  });
});
