import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/templates/PageShell";
import { getPost, getPosts } from "@/lib/posts";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

/** Prerendered at build; a post added later is served by ISR on first request. */
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.summary,
    path: `/posts/${slug}`,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageShell>
      <article className="mx-auto w-full max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-(--color-text-muted)">{post.summary}</p>

        {/* Sanitised in packages/content/src/posts/render.ts. */}
        <div className="post-body mt-10" dangerouslySetInnerHTML={{ __html: post.body }} />

        <p className="mt-12 border-t border-(--color-border) pt-6 text-sm text-(--color-text-muted)">
          Originally written in{" "}
          <a
            href={`https://github.com/patorsiang/thinking-in-public/blob/main/posts/${post.slug}.md`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-(--color-accent) underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)"
          >
            thinking-in-public
          </a>
          .
        </p>
      </article>
    </PageShell>
  );
}
