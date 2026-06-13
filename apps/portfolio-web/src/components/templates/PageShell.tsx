import type { ReactNode } from "react";

import { GlobalNav } from "@/components/organisms/GlobalNav";
import { classNames } from "@/lib/classnames";

type PageShellProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly contentClassName?: string;
};

export function PageShell({ children, className, contentClassName }: PageShellProps) {
  return (
    <main
      className={classNames(
        "min-h-screen bg-[var(--color-page)] text-[var(--color-text)] print:bg-white",
        className,
      )}
    >
      <div
        className={classNames(
          "mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 sm:px-8 lg:px-10",
          contentClassName,
        )}
      >
        <GlobalNav />
        {children}
      </div>
    </main>
  );
}
