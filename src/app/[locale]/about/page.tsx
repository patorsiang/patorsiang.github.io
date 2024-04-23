import Layout from "@/components/layout";
import AboutMe from "@/components/page/aboutMe";

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
