"use client";

import { useEffect } from "react";
import { logger } from "@patorsiang/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our shared utility
    logger.error("Application error boundary triggered", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-rose-600">Error</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-600">
          An unexpected error occurred. We've been notified and are looking into it.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => reset()}
            className="rounded-md bg-zinc-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Try again
          </button>
          <a href="/" className="text-sm font-semibold text-zinc-950">
            Go back home <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
