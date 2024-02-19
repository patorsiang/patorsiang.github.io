import { ReactNode } from "react";
import Link from "next/link";

export const IconLink = ({
  link,
  label,
  children,
}: {
  link: string;
  label: string;
  children: ReactNode;
}) => (
  <Link
    href={link}
    target="_blank"
    className="cursor-pointer lnk tooltip"
    aria-label={`Click ${label}`}
  >
    {children}
    <span className="tooltipText">{label}</span>
  </Link>
);
