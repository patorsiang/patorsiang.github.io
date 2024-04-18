"use client";

import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();

  const currentPath = pathname.trim().split("/")[2];

  const menus = [
    { title: "/home", path: undefined },
    { title: "/showcases", path: "showcases" },
    { title: "/about", path: "about" },
  ];

  console.log(currentPath);

  return (
    <nav className="nav">
      <ul className="nav_list">
        {menus.map(({ title, path }) => (
          <li className="nav_list-item">
            <a
              className={clsx({ active: currentPath === path })}
              href={`/${lang}/${path ?? ""}`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
