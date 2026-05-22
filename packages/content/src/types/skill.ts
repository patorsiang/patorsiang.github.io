import type { ContentMeta } from "./common";
import type { TranslatableText } from "./translation";

export type SkillGroupId =
  | "programming-fundamentals"
  | "frontend"
  | "backend-tools"
  | "machine-learning-ai"
  | "cloud-infrastructure"
  | "security-blockchain"
  | "databases"
  | "languages";

export type SkillGroup = ContentMeta & {
  readonly groupId: SkillGroupId;
  readonly label: TranslatableText;
  readonly items: readonly string[];
};
