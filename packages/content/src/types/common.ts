export type Locale = "en";

export type ContentSourceType =
  | "manual"
  | "github"
  | "linkedin"
  | "blog"
  | "external";

export type ContentSource = {
  readonly type: ContentSourceType;
  readonly label: string;
  readonly url?: string;
  readonly syncedAt?: string;
};

export type ContentVisibility =
  | "public"
  | "private"
  | "case-study-only"
  | "draft";

export type ContentMeta = {
  readonly id: string;
  readonly locale: Locale;
  readonly source: ContentSource;
  readonly visibility: ContentVisibility;
};

export type Link = {
  readonly label: string;
  readonly url: string;
};
