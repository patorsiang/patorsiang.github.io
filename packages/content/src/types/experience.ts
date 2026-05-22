import type { ContentMeta } from "./common";
import type { TranslatableText } from "./translation";

export type ExperienceType = "work" | "education" | "award" | "activity" | "internship";

export type Experience = ContentMeta & {
  readonly type: ExperienceType;
  readonly title: TranslatableText;
  readonly organization: TranslatableText;
  readonly location: TranslatableText;
  readonly startDate: string;
  readonly endDate?: string;
  readonly current?: boolean;
  readonly summary: TranslatableText;
  readonly highlights: readonly TranslatableText[];
  readonly skills: readonly string[];
};
