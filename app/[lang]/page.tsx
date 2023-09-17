import { Container } from "@mui/material";

import { getDictionary } from "@/utils/getDictionaries";

import { defaultMetadata } from "@/utils/defaultMeta";

export const metadata = {
  ...defaultMetadata,
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
  const dict = await getDictionary(lang);
  return <Container maxWidth="lg">{dict.Index.title}</Container>;
}
