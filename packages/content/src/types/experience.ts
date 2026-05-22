import type { ContentMeta } from "./common";

export type ExperienceType = "work" | "education" | "award" | "activity" | "internship";

export type Experience = ContentMeta & {
  readonly type: ExperienceType;
  readonly title: string;
  readonly organization: string;
  readonly location: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly current?: boolean;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly skills: readonly string[];
};
