import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes a URL to prevent dangerous protocols like 'javascript:' or 'data:'.
 * Returns the original URL if safe, or 'about:blank' if unsafe.
 */
export function sanitizeUrl(url: string | undefined): string {
  if (!url) return "";

  const trimmedUrl = url.trim();

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
