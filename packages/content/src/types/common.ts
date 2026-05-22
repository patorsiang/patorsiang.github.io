import type { SupportedLocale, TranslatableText } from "./translation";

export type Locale = "en" | SupportedLocale;

export type ContentSourceType = "manual" | "github" | "linkedin" | "blog" | "external";

export type ContentSource = {
  readonly type: ContentSourceType;
  readonly label: TranslatableText;
  readonly url?: string;
  readonly syncedAt?: string;
};

export type ContentVisibility = "public" | "private" | "case-study-only" | "draft";

export type ContentMeta = {
  readonly id: string;
  readonly locale: Locale;
  readonly source: ContentSource;
  readonly visibility: ContentVisibility;
};

export type Link = {
  readonly label: TranslatableText;
  readonly url: string;
};
