import Layout from "@/components/layout";
import Maintenance from "@/components/page/maintenance";

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Layout lang={params.locale}>
      <Maintenance />
    </Layout>
  );
}
