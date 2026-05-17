import Layout from "@/components/layout";
import Main from "@/components/page/main";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <Layout lang={locale}>
      <Main />
    </Layout>
  );
}
