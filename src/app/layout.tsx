import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import { clsx } from "clsx";

import "./globals.css";

const fontTH = IBM_Plex_Sans_Thai_Looped({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
});

const fontKR = IBM_Plex_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

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

export const dynamic = "auto";
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
    <html lang="en">
      <body className={clsx(fontTH.className, fontKR.className)}>
        {children}
      </body>
    </html>
  );
}
