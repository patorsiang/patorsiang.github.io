import type { ContentSource } from "../types";

export const legacyProfileSource = {
  type: "manual",
  label: "Migrated from legacy-v1 profile data",
} as const satisfies ContentSource;
