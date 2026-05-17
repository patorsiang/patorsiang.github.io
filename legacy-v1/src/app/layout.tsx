import type { Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

import { fontEN } from "@/constants";

import "./globals.css";

export { metadata } from "@/data/profile";

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#193441" }],
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
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
      <GoogleTagManager gtmId="G-XG777MV585" />
      <body className={fontEN.className}>{children}</body>
    </html>
  );
}
