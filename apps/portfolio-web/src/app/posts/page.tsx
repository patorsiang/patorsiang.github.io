import type { Metadata } from "next";

import { PostCard } from "@/components/molecules/PostCard";
import { Section } from "@/components/organisms/Section";
import { PageShell } from "@/components/templates/PageShell";
import { getPosts } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";

const title = "Posts";
const description =
  "Writing by Napatchol Thaipanich on software engineering, AI-assisted development, and learning in public.";

export const metadata: Metadata = buildPageMetadata({ title, description, path: "/posts" });

/** An edited post goes live within the hour without a redeploy. */
export const revalidate = 3600;

export default async function PostsPage() {
  const { posts, isFallback } = await getPosts();

  return (
    <PageShell>
      <Section eyebrow="Posts" title="Learning in public.">
        <p className="mt-6 max-w-2xl text-base leading-8 text-(--color-text-muted)">
          Notes and reflections from events, projects, and the day job. Written first in the{" "}
          <a
            href="https://github.com/patorsiang/thinking-in-public"
            target="_blank"
            rel="noreferrer"
            // tap-reach rather than a real 40px box: this sits inline in
            // prose, and giving it a height would open a gap in the line.
            // whitespace-nowrap: the hyphens in "thinking-in-public" are soft
            // wrap points, and a link broken across two lines gets a bounding
            // rect that unions both fragments - its "centre" then falls in
            // the gap between them, which is neither line and untappable.
            className="tap-reach whitespace-nowrap font-semibold text-(--color-accent) underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
          >
            thinking-in-public
          </a>{" "}
          archive, and mirrored here.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} isFallback={isFallback} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
