import { unstable_setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
  return [{ locale: "th" }, { locale: "en" }, { locale: "kr" }];
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
