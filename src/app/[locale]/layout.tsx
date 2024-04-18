import { unstable_setRequestLocale } from "next-intl/server";
import { clsx } from "clsx";

import { fontEN, fontKR, fontTH } from "@/constants";
import { locales } from "#/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const font = [
    locale === "th"
      ? fontTH.className
      : locale === "kr"
      ? fontKR.className
      : fontEN.className,
  ];

  return (
    <html lang={locale}>
      <body className={clsx(font)}>
        {children}
        {locale}
      </body>
    </html>
  );
}
