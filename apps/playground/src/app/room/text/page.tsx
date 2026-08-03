import Link from "next/link";
import type { Metadata } from "next";

import { dialogue } from "@/game/dialogue";

export const metadata: Metadata = {
  title: "The room, as text",
  description:
    "Everything the objects in the 2D room say, as plain text — degrees, family, hobbies, and the rest.",
};

/**
 * The same `dialogue` module the game reads, so this page cannot fall out of
 * step with the room. Grouped for reading rather than by map position, which
 * means nothing here to a reader.
 */
const groups = [
  {
    title: "Study",
    keys: ["degree1", "degree2", "degree3", "degree5", "degree4"],
  },
  {
    title: "Work and making things",
    keys: ["desk with pc", "game", "desk in living room", "bookshelf", "treasure"],
  },
  {
    title: "Home",
    keys: ["station", "fridge", "stove", "sink", "clock", "bed", "sofa", "bath", "closet", "tv"],
  },
  {
    title: "People and pets",
    keys: ["dad's seat", "mom's seat", "ball", "pet", "bookshelf in living room"],
  },
] as const;

export default function RoomTextPage() {
  const grouped = new Set(groups.flatMap((group) => group.keys as readonly string[]));
  const ungrouped = Object.keys(dialogue).filter((key) => !grouped.has(key));

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-12 px-6 py-16">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
          The room
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-(--color-text) sm:text-4xl">As text.</h1>
        <p className="mt-4 text-base leading-8 text-(--color-text-muted)">
          Everything the objects in the room say, without walking around for it.
        </p>
        <p className="mt-6">
          <Link
            href="/room"
            className="text-sm font-semibold text-(--color-accent) underline-offset-4 hover:underline"
          >
            Play the room instead
          </Link>
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="text-xl font-semibold text-(--color-text)">{group.title}</h2>
          <dl className="mt-4 flex flex-col gap-5">
            {group.keys
              .filter((key) => dialogue[key])
              .map((key) => (
                <div key={key}>
                  <dt className="text-sm font-medium uppercase tracking-[0.12em] text-(--color-text-subtle)">
                    {key}
                  </dt>
                  <dd className="mt-1 text-base leading-8 text-(--color-text-muted)">
                    {dialogue[key]}
                  </dd>
                </div>
              ))}
          </dl>
        </section>
      ))}

      {ungrouped.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold text-(--color-text)">Everything else</h2>
          <dl className="mt-4 flex flex-col gap-5">
            {ungrouped.map((key) => (
              <div key={key}>
                <dt className="text-sm font-medium uppercase tracking-[0.12em] text-(--color-text-subtle)">
                  {key}
                </dt>
                <dd className="mt-1 text-base leading-8 text-(--color-text-muted)">
                  {dialogue[key]}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </main>
  );
}
