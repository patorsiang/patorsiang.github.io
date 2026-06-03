import { sanitizeHTML } from "@patorsiang/utils";

type SanitizedHTMLProps = {
  readonly html: string;
  readonly className?: string;
};

/**
 * A component that safely renders HTML content after sanitization.
 * Use this for any content that contains HTML tags (e.g. from the profile subtitle).
 */
export function SanitizedHTML({ html, className }: SanitizedHTMLProps) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeHTML(html) }} />;
}
