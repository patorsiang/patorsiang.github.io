import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes a URL to prevent dangerous protocols like 'javascript:' or 'data:'.
 * Returns the original URL if safe, or 'about:blank' if unsafe.
 */
export function sanitizeUrl(url: string | undefined): string {
  if (!url) return "";

  const trimmedUrl = url.trim();

  // "//host" is protocol-relative - a browser resolves it against the
  // current scheme, so it is an external URL wearing an internal-path
  // disguise, not an internal path. Reject it before the "/" case below
  // would otherwise let it through.
  if (trimmedUrl.startsWith("//")) {
    return "about:blank";
  }

  // Allow only safe protocols
  if (
    trimmedUrl.startsWith("http://") ||
    trimmedUrl.startsWith("https://") ||
    trimmedUrl.startsWith("mailto:") ||
    trimmedUrl.startsWith("tel:") ||
    trimmedUrl.startsWith("/") ||
    trimmedUrl.startsWith("#")
  ) {
    return trimmedUrl;
  }

  // If it's a dangerous protocol or ambiguous, return a safe fallback
  return "about:blank";
}

/**
 * Sanitizes HTML to prevent XSS.
 * By default, it allows a very limited set of safe formatting tags.
 */
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "br", "p", "span"],
    ALLOWED_ATTR: ["class"], // Allow classes for basic styling if needed
  });
}

/**
 * Sanitizes rendered post-body HTML.
 *
 * Wider than sanitizeHTML's five-tag allowlist because post bodies come from
 * CommonMark, not a hand-typed string: headings, links, lists, code blocks,
 * images and blockquotes are all legitimate content there. `lang` is
 * explicitly allowed — without it, the Thai-paragraph markup posts rely on
 * (`<span lang="th">`) would be silently stripped, which is a bilingual
 * accessibility feature failing shut rather than open.
 */
export function sanitizeArticleHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "img",
      "hr",
      "br",
      "span",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "figure",
      "figcaption",
      "del",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "loading", "rel", "target", "lang"],
  });
}
