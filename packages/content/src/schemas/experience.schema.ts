import { z } from "zod";
import { contentMetaSchema } from "./common.schema";
import { translatableTextSchema } from "./translation.schema";

export const experienceTypeSchema = z.enum([
  "work",
  "education",
  "award",
  "activity",
  "internship",
]);

export const experienceSchema = contentMetaSchema.extend({
  type: experienceTypeSchema,
  title: translatableTextSchema,
  organization: translatableTextSchema,
  location: translatableTextSchema,
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  summary: translatableTextSchema,
  highlights: z.array(translatableTextSchema),
  skills: z.array(z.string()),
});
