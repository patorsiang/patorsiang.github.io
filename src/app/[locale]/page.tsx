import Layout from "@/components/layout";
import Main from "@/components/page/main";

export async function generateStaticParams() {
  return [{ locale: "th" }, { locale: "en" }, { locale: "kr" }];
}

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Layout lang={params.locale}>
      <Main lang={params.locale} />
    </Layout>
  );
}
