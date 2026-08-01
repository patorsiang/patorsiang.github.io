import type { ComponentPropsWithoutRef } from "react";

import { classNames } from "@/lib/classnames";

type ButtonProps = {
  readonly children: string;
  readonly variant?: "primary" | "secondary";
  readonly className?: string;
  readonly title?: string;
  readonly "aria-label"?: string;
  readonly onClick: ComponentPropsWithoutRef<"button">["onClick"];
};

export function Button({
  children,
  variant = "secondary",
  className,
  title,
  "aria-label": ariaLabel,
  onClick,
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-(--color-accent-strong) text-(--color-on-accent-strong) hover:bg-(--color-accent) hover:text-(--color-on-accent)"
      : "border border-(--color-border) bg-(--color-surface) text-foreground hover:border-(--color-accent) hover:text-(--color-accent)";

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      className={classNames(
        "inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus)",
        styles,
        className,
      )}
    >
      {children}
    </button>
  );
}
