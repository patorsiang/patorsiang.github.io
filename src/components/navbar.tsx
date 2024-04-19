"use client";

import { usePathname } from "next/navigation";
import { clsx } from "clsx";

import Link from "next/link";

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();

  const currentPath = pathname.trim().split("/")[2];

  const menus = [
    { title: "/home" },
    { title: "/showcases", path: "showcases" },
    { title: "/about", path: "about" },
  ];

  return (
    <nav className="nav">
      <ul className="nav_list">
        {menus.map(({ title, path }) => (
          <li className="nav_list-item" key={title}>
            <Link
              className={clsx({ active: currentPath === path })}
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
