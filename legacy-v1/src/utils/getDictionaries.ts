"use server-only";

export const getDictionary = async (locale: string) => ({
  page: (await import(`#/messages/${locale}.json`)).default,
  detail: await import(
    `@/data/profile/index${locale === "en" ? "" : `.${locale}`}.ts`
  ).then((module) => module.data),
});
