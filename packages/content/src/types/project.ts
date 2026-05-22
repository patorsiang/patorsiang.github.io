import type { ContentMeta, Link } from "./common";

export type ProjectCategory =
  | "web"
  | "ai-ml"
  | "security-ctf"
  | "blockchain-fintech"
  | "game-interactive"
  | "open-source"
  | "product-experiment"
  | "academic"
  | "tutorial-learning"
  | "iot";

export type ProjectStatus =
  | "idea"
  | "prototype"
  | "in-progress"
  | "launched"
  | "paused"
  | "archived";

export type ProjectPlacement = "featured-project" | "project" | "playground" | "hidden";

export type ContributionType = "solo" | "team" | "open-source" | "academic" | "tutorial";

export type Project = ContentMeta & {
  readonly title: string;
  readonly slug: string;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly summary: string;
  readonly role: string;
  readonly techStack: readonly string[];
  readonly highlights: readonly string[];
  readonly links: readonly Link[];
  readonly placement: ProjectPlacement;
  readonly contributionType: ContributionType;
  readonly timeframe?: string;
  readonly problem?: string;
  readonly audience?: string;
  readonly keyLearning?: readonly string[];
  readonly testingNotes?: string;
};
