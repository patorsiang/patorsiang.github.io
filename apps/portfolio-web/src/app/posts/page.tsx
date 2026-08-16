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
          Notes and reflections from events, projects, and the day job.
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
