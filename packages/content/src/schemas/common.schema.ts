import { z } from "zod";
import { supportedLocaleSchema, translatableTextSchema } from "./translation.schema";

export const localeSchema = z.union([z.literal("en"), supportedLocaleSchema]);

export const contentSourceTypeSchema = z.enum(["manual", "github", "linkedin", "blog", "external"]);

export const contentSourceSchema = z.object({
  type: contentSourceTypeSchema,
  label: translatableTextSchema,
  url: z.string().optional(),
  syncedAt: z.string().optional(),
});

export const contentVisibilitySchema = z.enum(["public", "private", "case-study-only", "draft"]);

export const contentMetaSchema = z.object({
  id: z.string(),
  locale: localeSchema,
  source: contentSourceSchema,
  visibility: contentVisibilitySchema,
});

export const linkSchema = z.object({
  label: translatableTextSchema,
  url: z.string(),
});
