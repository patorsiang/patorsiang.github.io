import { setRequestLocale } from "next-intl/server";

import Layout from "@/components/layout";
import Main from "@/components/page/main";
import { generateStaticParamsFunc } from "@/utils/generateStaticParams";

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
      <Main />
    </Layout>
  );
}
