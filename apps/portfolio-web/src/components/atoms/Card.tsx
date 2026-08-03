import type { ReactNode } from "react";

import { classNames } from "@/lib/classnames";

type CardProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "article" | "section" | "div";
};

export function Card({ children, className, as: Component = "article" }: CardProps) {
  return (
    <Component
      className={classNames(
        "rounded-lg border border-(--color-border) bg-(--color-surface) shadow-sm",
        className,
      )}
    >
      {children}
    </Component>
  );
}
