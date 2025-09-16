import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { getDictionary } from "@/utils/getDictionaries";

export const locales = ["en", "th", "kr"] as const;
export const defaultLocale = locales[0];

export const i18n = {
  defaultLocale,
  locales,
} as const;

export type Locale = (typeof i18n)["locales"][number];

export default getRequestConfig(async ({ locale = "en" }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await getDictionary(locale),
  };
});
