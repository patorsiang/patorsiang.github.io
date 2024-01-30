export const locales = ["en", "th", "kr"];

export const i18n = {
  defaultLocale: locales[0],
  locales,
} as const;

export type Locale = (typeof i18n)["locales"][number];
