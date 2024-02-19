import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";

export const IconLink = ({
  label,
  children,
  target,
  disabled,
  ...props
}: {
  target?: string;
  disabled?: boolean;
  label: string;
  children: ReactNode;
} & LinkProps) => (
  <Link
    {...props}
    target={target}
    className={`cursor-pointer lnk tooltip ${disabled ? "disabled" : ""}`}
    aria-label={`Click ${label}`}
    aria-disabled={disabled}
  >
    {children}
    <span className="tooltipText">{label}</span>
  </Link>
);
