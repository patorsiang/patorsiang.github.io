export type SupportedLocale = "th" | "ko" | "zh-CN";

export type TranslationStatus = "missing" | "ai_draft" | "reviewed" | "approved";

export interface TranslationEntry {
  readonly value: string;
  readonly status: TranslationStatus;
}

export interface TranslatableText {
  readonly en: string;
  readonly translated?: Partial<Record<SupportedLocale, TranslationEntry>>;
}
