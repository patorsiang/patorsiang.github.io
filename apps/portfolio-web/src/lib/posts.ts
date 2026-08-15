import { fetchPosts, POST_FALLBACK, type Post, type PostSummary } from "@patorsiang/content";

import { VENDORED_IMAGES } from "@/lib/vendored-images";

export type PostsResult = {
  readonly posts: readonly PostSummary[];
  /**
   * True when `posts` is the committed `POST_FALLBACK`, not a live fetch.
   * Fallback summaries carry no bodies, so a card linking to
   * `/posts/<slug>` would 404 - callers use this to link to the source
   * repo instead. See `PostCard`.
   */
  readonly isFallback: boolean;
};

/**
 * Every route reads posts through here.
 *
 * The fallback exists so a GitHub outage degrades the index to titles and
 * links rather than an empty page. It carries no bodies, so `getPost` returns
 * null on failure and the route 404s - showing a title with no article would
 * be worse than admitting the post cannot be loaded right now.
 */
export async function getPosts(): Promise<PostsResult> {
  try {
    return { posts: await fetchPosts(VENDORED_IMAGES), isFallback: false };
  } catch (error) {
    console.error("Falling back to committed post summaries", error);
    return { posts: [...POST_FALLBACK], isFallback: true };
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const posts = await fetchPosts(VENDORED_IMAGES);
    return posts.find((post) => post.slug === slug) ?? null;
  } catch (error) {
    console.error(`Could not load post ${slug}`, error);
    return null;
  }
}
