import { setRequestLocale } from "next-intl/server";

import GamePortfolio from "@/components/page/showcases/2d-game-portfolio";
import { metadata as meta } from "@/data/profile";
import { generateStaticParamsFunc } from "@/utils/generateStaticParams";

export const metadata = { ...meta, title: `${meta.title} | My Beta Story` };
export const generateStaticParams = () => generateStaticParamsFunc();
export const dynamic = "force-static";
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GamePortfolio />;
}
