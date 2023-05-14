import "@/app/globals.css";

import { noto_sans_th, noto_sans_kr } from "@/app/fonts";
import meta from "@/public/manifest.json";

export const metadata = meta;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "";
  return (
    <html lang={locale ?? "en"}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="name" content={metadata.name} />
        <meta name="title" content={metadata.short_name} />
        <meta name="description" content={metadata.description} />
        <meta
          name="keywords"
          content={metadata.description.split(" ").join(",")}
        />
        <meta name="author" content={metadata.author} />
        <meta name="theme-color" content={metadata.theme_color} />
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Language" content="en-us,th,ko" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <meta property="og:title" content={metadata.short_name} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="icons/maskable_icon.png" />
      </head>
      <body
        className={
          // locale === "kr" ? noto_sans_kr.className :
          noto_sans_th.className
        }
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
