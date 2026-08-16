import { locales } from "#/i18n";

export const generateStaticParamsFunc = () => {
  return locales.map((locale) => ({ locale }));
};
