"use server-only";

export const getDictionary = async (locale: string) =>
  import(`@/dictionaries/${locale}.json`).then((module) => module.default);
