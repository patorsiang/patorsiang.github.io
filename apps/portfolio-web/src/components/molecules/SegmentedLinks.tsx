import Link from "next/link";

import { classNames } from "@/lib/classnames";

export type SegmentedLinkItem = {
  readonly id: string;
  readonly href: string;
  /** Short text shown inside the segment. */
  readonly label: string;
  /** Full, unabbreviated name exposed to assistive tech and tooltips. */
  readonly fullLabel?: string;
  /** BCP 47 tag of the label text, so screen readers pronounce it correctly. */
  readonly lang?: string;
  /** BCP 47 tag of the destination page. */
  readonly hrefLang?: string;
  readonly active: boolean;
};

type SegmentedLinksProps = {
  readonly items: readonly SegmentedLinkItem[];
  /** Names the control for screen readers, e.g. "CV variant". */
  readonly label: string;
  /** Width and placement are the caller's business; the track sizes to content by default. */
  readonly className?: string;
};

/**
 * Joined set of links styled as one segmented control. Stays a list of real
 * anchors (not a JS-driven select) so each option remains crawlable and works
 * without client JS.
 */
export function SegmentedLinks({ items, label, className }: SegmentedLinksProps) {
  return (
    <nav
      aria-label={label}
      className={classNames(
        "inline-flex gap-1 rounded-lg border border-(--color-border) bg-(--color-surface-muted) p-1",
        className,
      )}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          aria-label={item.fullLabel}
          title={item.fullLabel}
          lang={item.lang}
          hrefLang={item.hrefLang}
          className={classNames(
            "inline-flex h-8 flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) motion-safe:active:translate-y-px sm:flex-none",
            item.active
              ? "bg-(--color-accent) font-semibold text-(--color-on-accent)"
              : "text-(--color-text-muted) hover:bg-(--color-surface) hover:text-(--color-accent)",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
