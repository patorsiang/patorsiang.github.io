import type { ReactNode } from "react";

import { GridGlow } from "@/components/atoms/GridGlow";
import { GlobalNav } from "@/components/organisms/GlobalNav";
import { SiteFooter } from "@/components/organisms/SiteFooter";
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
    // The footer sits outside <main> on purpose: a <footer> nested inside main
    // is a sectioning footer, not the contentinfo landmark a screen reader user
    // jumps to. `flex-1` rather than `min-h-screen` so it settles at the bottom
    // of a short page instead of always below the fold - the body is already
    // `min-h-full flex flex-col` for this.
    <>
      <main
        lang={lang}
        className={classNames(
          "relative flex-1 overflow-hidden bg-background text-foreground print:bg-white",
          className,
        )}
      >
        <GridGlow />
        <div
          className={classNames(
            "relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 sm:px-8 lg:px-10",
            contentClassName,
          )}
        >
          <GlobalNav />
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
