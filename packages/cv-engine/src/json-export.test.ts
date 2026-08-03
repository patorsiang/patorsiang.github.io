import { describe, expect, test } from "bun:test";
import { buildCVOutput, exportCVAsJSON, generateCVJSON } from "./index";

describe("JSON export", () => {
  test("returns valid pretty JSON by default", () => {
    const cv = buildCVOutput("fullstack_engineer", "en");
    const json = exportCVAsJSON(cv);

    expect(json).toContain("\n  ");
    expect(JSON.parse(json)).toEqual(cv);
  });

  test("returns compact JSON when requested", () => {
    const cv = buildCVOutput("ai_ml_engineer", "en");
    const json = exportCVAsJSON(cv, { pretty: false });

    expect(json).not.toContain("\n  ");
    expect(JSON.parse(json)).toEqual(cv);
  });

  test("generateCVJSON includes the full structured CV and debug data", () => {
    const json = generateCVJSON("security_engineer", "en");
    const parsed = JSON.parse(json) as ReturnType<typeof buildCVOutput>;

    expect(parsed.meta.roleId).toBe("security_engineer");
    expect(parsed.skills.length).toBeGreaterThan(0);
    expect(parsed.projects[0].rankDebug.priorityScore).toBeDefined();
    expect(parsed.projects[0].rankDebug.scoreBreakdown).toBeDefined();
    expect(parsed.experience[0].rankDebug.relevanceScore).toBeDefined();
    expect(parsed.experience[0].rankDebug.scoreBreakdown).toBeDefined();
  });
});
