import type { PostSummary } from "@patorsiang/content";
import Link from "next/link";

import { Card } from "@/components/atoms/Card";
import { Tag } from "@/components/atoms/Tag";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Exported for testing: which URL a post card's title should link to, if any.
 *
 * Fallback summaries carry no body, so the internal `/posts/<slug>` route
 * 404s - rather than link there, or out to the raw notes file in the source
 * repo (readers should see finished posts, not drafts-in-progress), the
 * card renders as plain, unlinked text while data is degraded. `null` means
 * "no link".
 */
export function postCardHref(slug: string, isFallback: boolean): string | null {
  return isFallback ? null : `/posts/${slug}`;
}

/**
 * `isFallback` means `post` came from the committed `POST_FALLBACK`, not a
 * live fetch - it carries no body, so there is nowhere for the title to
 * link to yet. The card still shows title, date and summary; it just is
 * not clickable until the live data is back.
 */
export function PostCard({
  post,
  isFallback = false,
}: {
  readonly post: PostSummary;
  readonly isFallback?: boolean;
}) {
  const titleLinkClassName =
    "tap-reach underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)";

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-baseline gap-x-3 text-xs font-medium uppercase tracking-[0.12em] text-(--color-accent)">
        <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
        {/* Only surfaced when it is not a finished post - the reader should
            know they are reading a draft, and "published" is the default. */}
        {post.maturity === "published" ? null : <span>{post.maturity.replace("-", " ")}</span>}
      </div>

      <h2 className="mt-3 text-xl font-semibold text-foreground">
        {/* tap-reach rather than a real 40px box: the title carries the
            card's line rhythm, and a block-level hit box would open a gap
            above the date row and below the summary. */}
        {(() => {
          const href = postCardHref(post.slug, isFallback);

          return href ? (
            <Link href={href} className={titleLinkClassName}>
              {post.title}
            </Link>
          ) : (
            post.title
          );
        })()}
      </h2>

      <p className="mt-3 text-sm leading-7 text-(--color-text-muted)">{post.summary}</p>

      {post.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
