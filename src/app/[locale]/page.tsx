import Main from "@/components/main";

export async function generateStaticParams() {
  return [{ locale: "th" }, { locale: "en" }, { locale: "kr" }];
}

export default async function Page({ params }: { params: { locale: string } }) {
  return <Main lang={params.locale} />;
}
