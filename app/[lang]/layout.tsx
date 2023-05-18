import "./globals.css";

import meta from "@/public/manifest.json";

import { noto_sans_th, noto_sans_kr } from "./fonts";

import { locales } from "@/i18n-config";

export const metadata = {
  title: meta.name,
  description: meta.description,
  applicationName: meta.short_name,
  authors: [{ name: meta.author }],
  keywords: meta.description.split(" ").join(","),
  referrer: "origin",
  themeColor: meta.theme_color,
  colorScheme: "dark",
  viewport: { width: "device-width", initialScale: 1 },
  creator: meta.author,
  publisher: "github page",
  icons: meta.icons
    .map(({ sizes, src, ...icon }) => [
      { rel: "icon", size: sizes, url: src, ...icon },
      { rel: "apple-touch-icon", size: sizes, url: src, ...icon },
    ])
    .flat(),
  manifest: "/manifest.json",
  openGraph: {
    card: meta.name,
    creator: meta.author,
    images: meta.icons[meta.icons.length - 1].src,
  },
};

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
        <meta name="name" content={meta.name} />
        <meta name="title" content={meta.short_name} />
        <meta name="description" content={meta.description} />
        <meta httpEquiv="Content-Language" content={locales.join(",")} />
        <link rel="shortcut icon" href="icons/favicon.ico" />
        <meta property="og:title" content={meta.short_name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="icons/maskable_icon.png" />
        {[36, 48, 57, 72, 96, 144, 192].map((pixel) => (
          <LinkIcon pixel={pixel} ty="android" key={`android_${pixel}`} />
        ))}
        {[60, 72, 76, 114, 120, 144, 152, 180].map((pixel) => (
          <LinkIcon pixel={pixel} ty="apple" key={`apple_${pixel}`} />
        ))}
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

const LinkIcon = ({
  pixel,
  ty,
}: {
  pixel: string | number;
  ty: "apple" | "android";
}) => {
  const sizes = `${pixel}x${pixel}`;
  const href = `/icons/favicons/${ty}_${sizes}`;
  return (
    <link
      rel={ty === "apple" ? "apple-touch-icon" : "icon"}
      href={href}
      type="image/png"
      sizes={sizes}
    />
  );
};
