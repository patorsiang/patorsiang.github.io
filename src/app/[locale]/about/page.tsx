import Layout from "@/components/layout";
import AboutMe from "@/components/page/aboutMe";

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Layout lang={params.locale}>
      <AboutMe lang={params.locale} />
    </Layout>
  );
}
