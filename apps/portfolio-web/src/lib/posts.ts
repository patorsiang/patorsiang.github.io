import { fetchPosts, POST_FALLBACK, type Post, type PostSummary } from "@patorsiang/content";

/**
 * Every route reads posts through here.
 *
 * The fallback exists so a GitHub outage degrades the index to titles and
 * links rather than an empty page. It carries no bodies, so `getPost` returns
 * null on failure and the route 404s - showing a title with no article would
 * be worse than admitting the post cannot be loaded right now.
 */
export async function getPosts(): Promise<PostSummary[]> {
  try {
    return await fetchPosts();
  } catch (error) {
    console.error("Falling back to committed post summaries", error);
    return [...POST_FALLBACK];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const posts = await fetchPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  } catch (error) {
    console.error(`Could not load post ${slug}`, error);
    return null;
  }
}
