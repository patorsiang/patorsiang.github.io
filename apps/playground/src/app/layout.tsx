import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Playground | Napatchol Thaipanich",
    template: "%s | Playground",
  },
  description:
    "Interactive experiments by Napatchol Thaipanich, starting with an explorable 2D room built in Kaboom.js.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
