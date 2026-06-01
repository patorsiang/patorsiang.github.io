import { describe, expect, test } from "bun:test";
import { buildCVOutput, generateCV, isCvLanguage, isCvRoleId } from "./index";
import { isMissingTranslation, text } from "./content-language";

function stripGeneratedAt<T extends { readonly meta: { readonly generatedAt: string } }>(value: T) {
  const { generatedAt, ...meta } = value.meta;

  return {
    ...value,
    meta,
  };
}

describe("output builder", () => {
  test("buildCVOutput returns a complete structured CV", () => {
    const cv = buildCVOutput("fullstack_engineer", "en");

    expect(cv.meta.roleId).toBe("fullstack_engineer");
    expect(cv.header.name).toBe("Napatchol Thaipanich");
    expect(cv.summary.text.length).toBeGreaterThan(0);
    expect(cv.skills.map((group) => group.category)).toEqual([
      "programming-fundamentals",
      "frontend",
      "backend-tools",
      "databases",
      "cloud-infrastructure",
      "security-blockchain",
    ]);
    expect(cv.experience.length).toBeGreaterThan(0);
    expect(cv.projects.length).toBeGreaterThan(0);
    expect(cv.education.length).toBeGreaterThan(0);
    expect(cv.languages.length).toBeGreaterThan(0);
  });

  test("generateCV stays compatible with buildCVOutput apart from generatedAt", () => {
    const built = buildCVOutput("ai_ml_engineer", "en");
    const generated = generateCV("ai_ml_engineer", "en");

    expect(stripGeneratedAt(generated)).toEqual(stripGeneratedAt(built));
  });

  test("supports explicit role and language guards", () => {
    expect(isCvRoleId("fullstack_engineer")).toBe(true);
    expect(isCvRoleId("security-engineer")).toBe(false);
    expect(isCvLanguage("en")).toBe(true);
    expect(isCvLanguage("th")).toBe(true);
    expect(isCvLanguage("es")).toBe(false);
  });

  test("throws for unsupported language input", () => {
    expect(() => buildCVOutput("fullstack_engineer", "es" as never)).toThrow(
      /Unsupported CV language/,
    );
  });

  test("buildCVOutput supports Thai draft output with base-content fallback", () => {
    const cv = buildCVOutput("fullstack_engineer", "th");

    expect(cv.meta.language).toBe("th");
    expect(cv.header.location).toBe("กรุงเทพฯ ประเทศไทย");
    expect(cv.header.targetTitle).toBe("นักพัฒนา Full-Stack");
    expect(cv.summary.text).toContain("Software developer");
    expect(cv.skills.length).toBeGreaterThan(0);
    expect(cv.experience.length).toBeGreaterThan(0);
    expect(cv.projects.length).toBeGreaterThan(0);
    expect(cv.languages.map((language) => language.name)).toContain("ไทย");
  });

  test("Thai text resolution falls back to English when translation is missing", () => {
    const value = { en: "English source" };

    expect(text(value, "th")).toBe("English source");
    expect(isMissingTranslation(value, "th")).toBe(true);
  });

  test("throws for unsupported role input through the existing role validation", () => {
    expect(() => generateCV("unknown-role" as never, "en")).toThrow(/Unsupported CV role/);
  });
});
