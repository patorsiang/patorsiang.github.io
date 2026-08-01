import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { defaultDescription, defaultTitle, ownerName, siteMetadataBase, siteName } from "@/lib/seo";
import { themeBootstrapScript } from "@/lib/theme";

import { geistMono, geistSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: {
    default: defaultTitle,
    template: `%s | ${ownerName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: themeBootstrapScript,
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
