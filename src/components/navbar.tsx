"use client";
import { sendGTMEvent } from "@next/third-parties/google";

import { clsx } from "clsx";

import Link from "next/link";

import { useSplitPathname } from "@/utils/hooks/useSplitPathname";

export default function Navbar({ lang }: { lang: string }) {
  const { currentPath } = useSplitPathname();

  const menus = [
    { title: "/home" },
    { title: "/showcases", path: "showcases" },
    { title: "/about", path: "about" },
  ];

  return (
    <nav className="nav">
      <Link
        className="nav_icon"
        href={`/${lang}`}
        onClick={() => sendGTMEvent({ event: "changed_page", value: "NT" })}
      >
        NT
      </Link>
      <ul className="nav_list">
        {menus.map(({ title, path }) => (
          <li className="nav_list-item" key={title}>
            <Link
              className={clsx({ active: currentPath === path })}
              onClick={() =>
                sendGTMEvent({ event: "changed_page", value: title })
              }
              href={`/${lang}${path ? "/" + path : ""}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
