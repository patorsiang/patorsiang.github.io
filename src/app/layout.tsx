import type { Metadata, Viewport } from "next";

import { fontEN } from "@/constants";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#193441" }],
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
};

export const metadata: Metadata = {
  title: "Napatchol Thaipanich",
  description: "Napatchol Thaipanich's Profile",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["Napatchol Thaipanich"],
  authors: [
    { name: "Napatchol Thaipanich" },
    {
      name: "Napatchol Thaipanich",
      url: "https://www.linkedin.com/in/napatchol-thaipanich/",
    },
  ],
};

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={fontEN.className}>{children}</body>
    </html>
  );
}
