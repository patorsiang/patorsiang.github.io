"use server-only";
import { Data } from "@/data/profile";

export const getDictionary = async (locale: string): Promise<Data> =>
  import(`@/data/profile${locale === "en" ? "" : `.${locale}`}.ts`).then(
    (module) => module.data
  );
