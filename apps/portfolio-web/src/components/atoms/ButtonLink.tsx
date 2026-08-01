import { sanitizeUrl } from "@patorsiang/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { classNames } from "@/lib/classnames";

type ButtonLinkProps = {
  readonly href: string;
  readonly children: string;
  readonly variant?: "primary" | "secondary";
  readonly className?: string;
  readonly target?: ComponentPropsWithoutRef<"a">["target"];
  readonly rel?: ComponentPropsWithoutRef<"a">["rel"];
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  className,
  target,
  rel,
}: ButtonLinkProps) {
  const safeHref = href.startsWith("/") ? href : sanitizeUrl(href);
  const styles =
    variant === "primary"
      ? "bg-(--color-accent-strong) text-(--color-on-accent-strong) hover:bg-(--color-accent) hover:text-(--color-on-accent)"
      : "border border-(--color-border) bg-(--color-surface) text-foreground hover:border-(--color-accent) hover:text-(--color-accent)";

  return (
    <Link
      href={safeHref}
      target={target}
      rel={rel}
      className={classNames(
        "inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)",
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}
