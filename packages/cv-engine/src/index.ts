import type { CvLanguage, CvRoleId, GeneratedCV } from "./config";
import {
  type BaseCvRankDebug,
  type CvHeader,
  type CvLink,
  type CvRankDebug,
  type CvRoleConfig,
  type CvSectionId,
  type ExperienceRankDebug,
  type GeneratedCvAward,
  type GeneratedCvEducation,
  type GeneratedCvExperience,
  type GeneratedCvLanguage,
  type GeneratedCvProject,
  type GeneratedCvSkillGroup,
  type ProjectRankDebug,
  isCvLanguage,
  isCvRoleId,
  roleConfigs,
  CvEngineInputError,
  getRoleConfig,
} from "./config";
import { buildCVOutput } from "./output-builder";
import { exportCVAsJSON, generateCVJSON, type JsonExportOptions } from "./json-export";
import {
  exportCVAsMarkdown,
  generateCVMarkdown,
  type MarkdownExportOptions,
} from "./markdown-export";
import { filterProjectsForRole } from "./project-filter";
import { selectExperiencesForRole } from "./experience-selection";
import { groupSkillsForRole } from "./skill-grouping";
import { rankProjectsForRole } from "./project-ranking";

export type {
  BaseCvRankDebug,
  CvHeader,
  CvLanguage,
  CvLink,
  CvRankDebug,
  CvRoleConfig,
  CvRoleId,
  CvSectionId,
  ExperienceRankDebug,
  GeneratedCV,
  GeneratedCvAward,
  GeneratedCvEducation,
  GeneratedCvExperience,
  GeneratedCvLanguage,
  GeneratedCvProject,
  GeneratedCvSkillGroup,
  JsonExportOptions,
  MarkdownExportOptions,
  ProjectRankDebug,
};

export {
  buildCVOutput,
  exportCVAsJSON,
  exportCVAsMarkdown,
  filterProjectsForRole,
  generateCVJSON,
  generateCVMarkdown,
  getRoleConfig,
  groupSkillsForRole,
  isCvLanguage,
  isCvRoleId,
  rankProjectsForRole,
  roleConfigs,
  selectExperiencesForRole,
  CvEngineInputError,
};

export function generateCV(role: CvRoleId, lang: CvLanguage): GeneratedCV {
  return buildCVOutput(role, lang);
}

export { type GroupedSkillCategory } from "./skill-grouping";
export { type ProjectScoreBreakdown, type RankedProject } from "./project-ranking";
export { type ExperienceScoreBreakdown, type RankedExperience } from "./experience-selection";
