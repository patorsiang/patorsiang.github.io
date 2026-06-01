import type { Locale, TranslatableText } from "@patorsiang/content";
import type { CvLanguage } from "./config";

export function isContentAvailableForLanguage(locale: Locale, lang: CvLanguage): boolean {
  return locale === "en" || locale === lang;
}

export function text(value: TranslatableText, lang: CvLanguage): string {
  if (lang === "en") {
    return value.en;
  }

  return value.translated?.[lang]?.value ?? value.en;
}

export function isMissingTranslation(value: TranslatableText, lang: CvLanguage): boolean {
  return lang !== "en" && !value.translated?.[lang]?.value;
}
