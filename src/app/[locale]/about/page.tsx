import Layout from "@/components/layout";
import AboutMe from "@/components/page/aboutMe";

import { metadata as meta } from "@/data/profile";

export const metadata = { ...meta, title: `${meta.title} | About` };

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <Layout lang={locale}>
      <AboutMe />
    </Layout>
  );
}
