import type { ReactNode } from "react";

import { GlobalNav } from "@/components/organisms/GlobalNav";
import { classNames } from "@/lib/classnames";

type PageShellProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly contentClassName?: string;
  /**
   * BCP 47 tag for the page content, when it is not the document default.
   * The root layout has to declare lang="en" because it is shared with the
   * un-localized routes, so localized pages scope their own language here.
   */
  readonly lang?: string;
};

export function PageShell({ children, className, contentClassName, lang }: PageShellProps) {
  return (
    <main
      lang={lang}
      className={classNames("min-h-screen bg-background text-foreground print:bg-white", className)}
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
