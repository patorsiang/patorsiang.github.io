import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
};

const experiments = [
  {
    href: "/room",
    title: "2D room",
    description:
      "Walk around a room and bump into objects to read about the person who lives there. Built with Kaboom.js, mapped in Tiled, sprites from Kenney.",
  },
];

export default function PlaygroundHome() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
          Playground
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-(--color-text) sm:text-4xl">
          Interactive experiments.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-(--color-text-muted)">
          Things that are more fun to play with than to read about. Separate from the main portfolio
          on purpose — nothing here is load-bearing.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {experiments.map((experiment) => (
          <li key={experiment.href}>
            <Link
              href={experiment.href}
              className="block rounded-lg border border-(--color-border) p-6 transition hover:border-(--color-accent)"
            >
              <h2 className="text-xl font-semibold text-(--color-text)">{experiment.title}</h2>
              <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                {experiment.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-sm">
        <a
          href="https://patorsiang.github.io"
          className="text-(--color-accent) underline-offset-4 hover:underline"
        >
          Back to the portfolio
        </a>
      </p>
    </main>
  );
}
