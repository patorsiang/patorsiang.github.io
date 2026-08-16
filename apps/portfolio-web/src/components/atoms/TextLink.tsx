import { sanitizeUrl } from "@patorsiang/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { classNames } from "@/lib/classnames";

type TextLinkProps = {
  readonly href: string;
  readonly children: string;
  readonly className?: string;
  readonly target?: ComponentPropsWithoutRef<"a">["target"];
  readonly rel?: ComponentPropsWithoutRef<"a">["rel"];
};

export function TextLink({ href, children, className, target, rel }: TextLinkProps) {
  const isInternal = href.startsWith("/");
  const sharedClassName = classNames(
    "font-semibold text-(--color-accent) underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus) motion-safe:active:translate-y-px print:text-zinc-800",
    className,
  );

  if (isInternal) {
    return (
      <Link href={href} className={sharedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a href={sanitizeUrl(href)} target={target} rel={rel} className={sharedClassName}>
      {children}
    </a>
  );
}
