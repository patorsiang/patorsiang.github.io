// Subpath, not the main barrel: this is the one file in the app that
// actually needs DOMPurify - see packages/utils/src/index.ts.
import { sanitizeArticleHTML } from "@patorsiang/utils/security";
import { marked } from "marked";

type RenderOptions = {
  /** Original image URL to vendored local path. */
  readonly vendoredImages: ReadonlyMap<string, string>;
};

const isLocal = (url: string) => url.startsWith("/");

/**
 * The renderer below builds raw HTML strings before sanitizeArticleHTML ever
 * sees them - safety today rests entirely on DOMPurify's ALLOWED_ATTR
 * excluding event handlers, with no independent layer if that ever changes.
 * Escaping href/text here means a crafted alt or URL can't break out of the
 * attribute or tag in the first place.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
    const safeAlt = escapeHtml(text);

    if (isLocal(href)) {
      return `<img src="${escapeHtml(href)}" alt="${safeAlt}" loading="lazy" />`;
    }

    const vendored = vendoredImages.get(href);

    if (vendored) {
      return `<img src="${escapeHtml(vendored)}" alt="${safeAlt}" loading="lazy" />`;
    }

    // Not vendored yet: ISR cannot write to public/, so between deploys a new
    // image has no local file. A link works; a broken image does not.
    return `<a href="${escapeHtml(href)}" rel="noreferrer" target="_blank">${safeAlt}</a>`;
  };

  const html = marked.parse(markdown, { renderer, async: false });

  return sanitizeArticleHTML(html);
}
