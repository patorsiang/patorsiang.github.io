"use server-only";

export const getDictionary = async (locale: string) =>
  import(`@/data/profile${locale === "en" ? "" : `.${locale}`}.ts`).then(
    (module) => module.data
  );
