import type { ReactNode } from "react";

type CVSectionProps = {
  readonly title: string;
  readonly children: ReactNode;
};

export function CVSection({ title, children }: CVSectionProps) {
  return (
    <section>
      <h2 className="border-b border-[var(--color-border)] pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text)]">
        {title}
      </h2>
      <div className="mt-4 print:mt-3">{children}</div>
    </section>
  );
}
