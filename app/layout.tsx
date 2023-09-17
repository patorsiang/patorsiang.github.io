import "./globals.css";

import meta from "@/public/manifest.json";

import { sans_th } from "./fonts";
import { locales } from "@/i18n-config";

import ThemeRegistry from "@/components/ThemeRegistry";

import { defaultMetadata } from "@/utils/defaultMeta";

export const metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      <body className={sans_th.className} suppressHydrationWarning={true}>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
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
