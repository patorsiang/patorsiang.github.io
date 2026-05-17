"use client";

import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";

export const IconLink = ({
  label,
  children,
  target,
  disabled,
  onClick,
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
    onClick={(e) => {
      if (onClick) {
        onClick(e);
      }
      sendGTMEvent({ event: "clicked_icon", value: label });
    }}
  >
    {children}
    <span className="tooltipText">{label}</span>
  </Link>
);
