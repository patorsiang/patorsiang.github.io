import { setRequestLocale } from "next-intl/server";

import Layout from "@/components/layout";
import AboutMe from "@/components/page/aboutMe";

import { metadata as meta } from "@/data/profile";
import { generateStaticParamsFunc } from "@/utils/generateStaticParams";

export const metadata = { ...meta, title: `${meta.title} | About` };
export const generateStaticParams = () => generateStaticParamsFunc();
export const dynamic = "force-static";
export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Layout lang={locale}>
      <AboutMe />
    </Layout>
  );
}
