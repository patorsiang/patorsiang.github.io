import Layout from "@/components/layout";
import Showcases from "@/components/page/showcases";
// import Maintenance from "@/components/page/maintenance";

import { metadata as meta } from "@/data/profile";

export const metadata = { ...meta, title: `${meta.title} | Showcases` };

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <Layout lang={locale}>
      <Showcases />
      {/* <Maintenance /> */}
    </Layout>
  );
}
