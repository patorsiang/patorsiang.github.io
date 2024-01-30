import Main from "@/components/main";

export async function generateStaticParams() {
  return [{ lang: "th" }, { lang: "en" }, { lang: "kr" }, { lang: "" }];
}

export default async function Page({ params }: { params: { lang: string } }) {
  return <Main lang={params.lang} />;
}
