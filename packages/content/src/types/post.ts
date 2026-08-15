export type PostMaturity = "raw-note" | "draft" | "published" | "evergreen";

export type Post = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly maturity: PostMaturity;
  readonly lang: readonly ("en" | "th")[];
  readonly body: string;
};
