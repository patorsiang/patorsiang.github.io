import { usePathname } from "next/navigation";

export const useSplitPathname = () => {
  const pathname = usePathname();
  const currentPath = pathname.trim().split("/")[2];
  const currentLang = pathname.trim().split("/")[1];

  return { currentPath, currentLang };
};
