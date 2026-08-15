import { sanitizeArticleHTML } from "@patorsiang/utils";
import { marked } from "marked";

type RenderOptions = {
  /** Original image URL to vendored local path. */
  readonly vendoredImages: ReadonlyMap<string, string>;
};

const isLocal = (url: string) => url.startsWith("/");

/**
 * Turns a post body into HTML that is safe to inject.
 *
 * Sanitising is not optional even though the author wrote the content. This is
 * the first HTML on the site not authored in TSX, `style-src` already allows
 * 'unsafe-inline', and the source lives in a second repo - if that repo is ever
 * compromised, or a post embeds a raw HTML block, this is the only thing
 * between it and the reader.
 */
export function renderPostBody(markdown: string, { vendoredImages }: RenderOptions): string {
  const renderer = new marked.Renderer();

  renderer.image = ({ href, text }) => {
    if (isLocal(href)) {
      return `<img src="${href}" alt="${text}" loading="lazy" />`;
    }

    const vendored = vendoredImages.get(href);

    if (vendored) {
      return `<img src="${vendored}" alt="${text}" loading="lazy" />`;
    }

    // Not vendored yet: ISR cannot write to public/, so between deploys a new
    // image has no local file. A link works; a broken image does not.
    return `<a href="${href}" rel="noreferrer" target="_blank">${text}</a>`;
  };

  const html = marked.parse(markdown, { renderer, async: false });

  return sanitizeArticleHTML(html);
}
