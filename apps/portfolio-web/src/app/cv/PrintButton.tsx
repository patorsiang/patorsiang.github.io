"use client";

import { Button } from "@/components/atoms/Button";

export function PrintButton() {
  return (
    <Button
      variant="primary"
      onClick={() => window.print()}
      aria-label="Uses browser print. Future automated PDF export should set displayHeaderFooter: false."
    >
      Print CV
    </Button>
  );
}
