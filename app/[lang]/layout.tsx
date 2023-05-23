import "../globals.css";

import { noto_sans_th, noto_sans_kr } from "../fonts";

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <body
        className={
          lang === "kr" ? noto_sans_kr.className : noto_sans_th.className
        }
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
