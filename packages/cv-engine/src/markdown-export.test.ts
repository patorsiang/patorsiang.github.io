import { describe, expect, test } from "bun:test";
import { buildCVOutput, exportCVAsMarkdown, generateCVMarkdown } from "./index";

describe("Markdown export", () => {
  test("renders the readable CV document without debug output by default", () => {
    const cv = buildCVOutput("fullstack_engineer", "en");
    const markdown = exportCVAsMarkdown(cv);

    expect(markdown.startsWith("# Napatchol Thaipanich")).toBe(true);
    expect(markdown).toContain("## Professional Summary");
    expect(markdown).toContain("## Technical Skills");
    expect(markdown).toContain("## Work Experience");
    expect(markdown).toContain("## Selected Projects");
    expect(markdown).toContain("## Education");
    expect(markdown).toContain("## Languages");
    expect(markdown).toContain("[GitHub](");
    expect(markdown).toContain("[LinkedIn](");
    expect(markdown).not.toContain("## Generation Debug");
    expect(markdown).not.toContain("undefined");
    expect(markdown).not.toContain("[object Object]");
    expect(markdown.endsWith("\n")).toBe(true);
  });

  test("omits empty awards sections when no awards are present", () => {
    const markdown = generateCVMarkdown("ai_ml_engineer", "en");

    expect(markdown).not.toContain("## Awards & Activities");
  });

  test("includeDebug appends generation score summaries", () => {
    const cv = buildCVOutput("security_engineer", "en");
    const markdown = exportCVAsMarkdown(cv, { includeDebug: true });

    expect(markdown).toContain("## Generation Debug");
    expect(markdown).toContain("- Role: security_engineer");
    expect(markdown).toContain("- Language: en");
    expect(markdown).toContain("- Project scores:");
    expect(markdown).toContain("- Experience scores:");
    expect(markdown).toContain(cv.projects[0].id);
    expect(markdown).toContain(cv.experience[0].id);
  });
});
