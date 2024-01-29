import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#4682b4" }],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
