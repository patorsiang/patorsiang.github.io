import "./globals.css";

import meta from "@/public/manifest.json";

import { noto_sans_th, noto_sans_kr } from "./fonts";

export const metadata = meta;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "th" }, { lang: "kr" }];
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
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
          lang === "kr" ? noto_sans_kr.className : noto_sans_th.className
        }
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
