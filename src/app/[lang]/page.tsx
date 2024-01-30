import Image from "next/image";

import { getDictionary } from "@/utils/getDictionaries";

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // const dict = await getDictionary(lang);
  return lang;
}
