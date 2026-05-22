import type { ContentMeta } from "./common";

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
  readonly label: string;
  readonly items: readonly string[];
};
