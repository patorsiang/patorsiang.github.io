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

/**
 * Same shape as `Post`, but `body` is branded as raw, unsanitized markdown
 * rather than sanitized HTML. `fetchRawPosts` returns this instead of `Post`
 * so a future caller cannot accidentally pass its output to
 * `dangerouslySetInnerHTML` without a type error - see `render.ts`'s
 * docstring for why that distinction matters. The brand exists purely for
 * the compiler; it carries no runtime check.
 */
export type RawPost = Omit<Post, "body"> & {
  readonly body: string & { readonly __rawMarkdown: unique symbol };
};
