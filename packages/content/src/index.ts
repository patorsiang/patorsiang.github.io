import { z } from "zod";
import {
  experiences as rawExperiences,
  profile as rawProfile,
  projects as rawProjects,
  skills as rawSkills,
} from "./data";
import {
  experienceSchema,
  profileSchema,
  projectSchema,
  skillGroupSchema,
} from "./schemas";

export const experiences = z.array(experienceSchema).parse(rawExperiences);
export const profile = profileSchema.parse(rawProfile);
export const projects = z.array(projectSchema).parse(rawProjects);
export const skills = z.array(skillGroupSchema).parse(rawSkills);

export type {
  ContentMeta,
  ContentSource,
  ContentSourceType,
  ContentVisibility,
  ContributionType,
  Experience,
  ExperienceType,
  Link,
  Locale,
  Profile,
  Project,
  ProjectCategory,
  ProjectPlacement,
  ProjectStatus,
  SkillGroup,
  SkillGroupId,
  SupportedLocale,
  TranslatableText,
  TranslationEntry,
  TranslationStatus,
} from "./types";

export * from "./schemas";
