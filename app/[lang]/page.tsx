import { getDictionary } from "@/utils/getDictionaries";

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang); // en
  return <button>{dict.Index.title}</button>; // Add to Cart
}
