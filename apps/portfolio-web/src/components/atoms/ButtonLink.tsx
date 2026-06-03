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
      ? "bg-[var(--color-accent-strong)] text-white hover:bg-[var(--color-accent)]"
      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]";

  return (
    <Link
      href={safeHref}
      target={target}
      rel={rel}
      className={classNames(
        "inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}
