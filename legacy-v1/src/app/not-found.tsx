import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Napatchol Thaipanic | 404",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center gap-16">
      <h2 className="text-7xl">Page Not Found</h2>
      <Link className="btn btn-back-404" href="/">
        Return Home
      </Link>
      <h1 className="text-404 text-9xl">404</h1>
    </main>
  );
}
