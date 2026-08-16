import type { ReactNode } from "react";

type SectionProps = {
  readonly eyebrow?: string;
  readonly title?: string;
  readonly children: ReactNode;
};

export function Section({ eyebrow, title, children }: SectionProps) {
  return (
    <section>
      {eyebrow || title ? (
        <div>
          {eyebrow ? (
            <p className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
