import type { CvLanguage, CvRoleId, GeneratedCV } from "./config";
import { buildCVOutput } from "./output-builder";

export type MarkdownExportOptions = {
  readonly includeDebug?: boolean;
};

export function exportCVAsMarkdown(
  cv: GeneratedCV,
  options: MarkdownExportOptions = {},
): string {
  const includeDebug = options.includeDebug ?? false;
  const lines: string[] = [];

  lines.push(`# ${escapeMarkdown(cv.header.name)}`);
  lines.push("");
  lines.push(`**${escapeMarkdown(cv.header.targetTitle)}**`);
  lines.push(escapeMarkdown(cv.header.location));
  lines.push(`Email: ${formatMarkdownLink(cv.header.email, `mailto:${cv.header.email}`)}`);
  for (const link of cv.header.links) {
    lines.push(`${escapeMarkdown(link.label)}: ${formatMarkdownLink(link.label, link.url)}`);
  }

  appendSection(lines, "Professional Summary", [cv.summary.text]);

  if (cv.skills.length > 0) {
    lines.push("## Technical Skills");
    lines.push("");
    for (const group of cv.skills) {
      lines.push(`### ${escapeMarkdown(group.group)}`);
      lines.push("");
      lines.push(group.items.map(escapeMarkdown).join(", "));
      lines.push("");
    }
    trimTrailingBlankLine(lines);
  }

  if (cv.experience.length > 0) {
    lines.push("## Work Experience");
    lines.push("");
    for (const experience of cv.experience) {
      lines.push(`### ${escapeMarkdown(experience.title)} — ${escapeMarkdown(experience.organization)}`);
      lines.push("");
      lines.push(
        `*${escapeMarkdown(experience.location)} · ${escapeMarkdown(
          formatDateRange(experience.startDate, experience.endDate),
        )}*`,
      );
      lines.push("");
      lines.push(escapeMarkdown(experience.summary));
      lines.push("");
      if (experience.bullets.length > 0) {
        for (const bullet of experience.bullets) {
          lines.push(`- ${escapeMarkdown(bullet)}`);
        }
        lines.push("");
      }
      if (experience.skills.length > 0) {
        lines.push(`**Skills:** ${experience.skills.map(escapeMarkdown).join(", ")}`);
        lines.push("");
      }
    }
    trimTrailingBlankLine(lines);
  }

  if (cv.projects.length > 0) {
    lines.push("## Selected Projects");
    lines.push("");
    for (const project of cv.projects) {
      lines.push(`### ${escapeMarkdown(project.title)}`);
      lines.push("");
      lines.push(`*${escapeMarkdown(project.subtitle)}*`);
      lines.push("");
      lines.push(escapeMarkdown(project.summary));
      lines.push("");
      if (project.technologies.length > 0) {
        lines.push(`**Technologies:** ${project.technologies.map(escapeMarkdown).join(", ")}`);
      }
      if (project.links.length > 0) {
        lines.push(
          `**Links:** ${project.links
            .map((link) => formatMarkdownLink(link.label, link.url))
            .join(" · ")}`,
        );
      }
      lines.push("");
    }
    trimTrailingBlankLine(lines);
  }

  if (cv.education.length > 0) {
    lines.push("## Education");
    lines.push("");
    for (const education of cv.education) {
      lines.push(`### ${escapeMarkdown(education.degree)} — ${escapeMarkdown(education.organization)}`);
      lines.push("");
      lines.push(
        `*${escapeMarkdown(education.location)} · ${escapeMarkdown(
          formatDateRange(education.startDate, education.endDate),
        )}*`,
      );
      lines.push("");
      lines.push(escapeMarkdown(education.summary));
      lines.push("");
    }
    trimTrailingBlankLine(lines);
  }

  if (cv.awards.length > 0) {
    lines.push("## Awards & Activities");
    lines.push("");
    for (const award of cv.awards) {
      lines.push(`- ${escapeMarkdown(award.title)} — ${escapeMarkdown(award.organization)}`);
    }
    lines.push("");
    trimTrailingBlankLine(lines);
  }

  if (cv.languages.length > 0) {
    lines.push("## Languages");
    lines.push("");
    for (const language of cv.languages) {
      lines.push(`- ${escapeMarkdown(language.name)}: ${escapeMarkdown(language.level)}`);
    }
    lines.push("");
    trimTrailingBlankLine(lines);
  }

  if (includeDebug) {
    lines.push("## Generation Debug");
    lines.push("");
    lines.push(`- Role: ${escapeMarkdown(cv.meta.roleId)}`);
    lines.push(`- Language: ${escapeMarkdown(cv.meta.language)}`);
    lines.push("- Project scores:");
    for (const project of cv.projects) {
      lines.push(`  - ${escapeMarkdown(project.id)}: ${project.rankDebug.score.toFixed(2)}`);
    }
    lines.push("- Experience scores:");
    for (const experience of cv.experience) {
      lines.push(`  - ${escapeMarkdown(experience.id)}: ${experience.rankDebug.score.toFixed(2)}`);
    }
    lines.push("");
    trimTrailingBlankLine(lines);
  }

  trimTrailingBlankLine(lines);
  return `${lines.join("\n")}\n`;
}

export function generateCVMarkdown(
  role: CvRoleId,
  lang: CvLanguage,
  options: MarkdownExportOptions = {},
): string {
  return exportCVAsMarkdown(buildCVOutput(role, lang), options);
}

function appendSection(lines: string[], title: string, paragraphs: readonly string[]): void {
  if (paragraphs.length === 0) {
    return;
  }

  lines.push(`## ${title}`);
  lines.push("");
  paragraphs.forEach((paragraph, index) => {
    lines.push(escapeMarkdown(paragraph));
    if (index < paragraphs.length - 1) {
      lines.push("");
    }
  });
  lines.push("");
  trimTrailingBlankLine(lines);
}

function formatMarkdownLink(label: string, url: string): string {
  return `[${escapeMarkdown(label)}](${url})`;
}

function escapeMarkdown(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]").replaceAll("|", "\\|");
}

function formatDateRange(startDate: string, endDate?: string): string {
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

function trimTrailingBlankLine(lines: string[]): void {
  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
}
