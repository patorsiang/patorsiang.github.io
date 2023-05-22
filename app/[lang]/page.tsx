import { Metadata } from "next";

import { getDictionary } from "@/utils/getDictionaries";

export const metadata: Metadata = {
  title: "About | Napatchol",
  description: "",
  openGraph: {
    title: "About | Napatchol",
  },
  keywords: [],
  authors: [{ name: "Napatchol Thaipanich" }],
};

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang); // en
  return dict.Index.title; // Add to Cart
}
