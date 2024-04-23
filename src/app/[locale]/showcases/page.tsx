import Layout from "@/components/layout";
import Maintenance from "@/components/page/maintenance";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <Layout lang={locale}>
      <Maintenance />
    </Layout>
  );
}
