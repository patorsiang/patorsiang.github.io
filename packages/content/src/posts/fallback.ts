import type { Post } from "../types/post";

export type PostSummary = Omit<Post, "body">;

/**
 * Enough to render the index when GitHub is unreachable.
 *
 * Committed rather than fetched on purpose: without it, a GitHub outage during
 * a deploy produces an empty /posts, and a build that depends on a third party
 * being up is not reproducible. Bodies are not included - a stale body is worse
 * than a link to the source.
 *
 * Update when a post is added. The e2e suite asserts every slug here still
 * resolves, so a deleted or renamed post fails loudly rather than 404ing for
 * readers.
 */
export const POST_FALLBACK: readonly PostSummary[] = [
  {
    slug: "four-months-without-ai-2026",
    title: "What I Learned from 4 Months Without AI Coding Tools (and 2 Months with Them)",
    date: "2026-08-01",
    summary:
      "Probation without any agentic AI, then Claude and Antigravity — and what actually changed.",
    tags: ["ai", "career", "learning"],
    maturity: "published",
    lang: ["en", "th"],
  },
  {
    slug: "bkkjs-summer-2026",
    title: "Insights from BKK.js Summer 2026",
    date: "2026-06-14",
    summary:
      "Web performance, WebAssembly, WebMCP, AI-assisted engineering, and event reflections.",
    tags: ["events", "web-performance", "ai"],
    maturity: "published",
    lang: ["en", "th"],
  },
  {
    slug: "gdg-buildwithai-2026",
    title: "Vibe Coding & Agentic AI: Key Takeaways from ChaiyoGCP & Build with AI Bangkok 2026",
    date: "2026-03-22",
    summary: "AI-assisted development, agentic systems, GenUI, and event reflections.",
    tags: ["events", "ai", "genui"],
    maturity: "published",
    lang: ["en", "th"],
  },
];
