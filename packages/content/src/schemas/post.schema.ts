import { z } from "zod";

/**
 * Mirrors the maturity levels the source repo's README already defines, so the
 * archive and the site cannot disagree about what a post's status means.
 */
export const postMaturitySchema = z.enum(["raw-note", "draft", "published", "evergreen"]);

export const postSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  // ISO date, not just a year: three posts sorted by year alone have no order.
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  summary: z.string().min(1),
  tags: z.array(z.string()).default([]),
  maturity: postMaturitySchema,
  lang: z.array(z.enum(["en", "th"])).min(1),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;
export type PostMaturity = z.infer<typeof postMaturitySchema>;
