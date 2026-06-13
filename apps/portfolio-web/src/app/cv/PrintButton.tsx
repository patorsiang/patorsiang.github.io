"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      // TODO: If automated PDF export is added, render with A4, printBackground, and displayHeaderFooter: false.
      title="Uses browser print. Future automated PDF export should set displayHeaderFooter: false."
      className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-teal-800"
    >
      Print CV
    </button>
  );
}
