import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-teal-700">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-zinc-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-zinc-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Go back home
          </Link>
          <a href="mailto:napatchol.tha@gmail.com" className="text-sm font-semibold text-zinc-950">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
