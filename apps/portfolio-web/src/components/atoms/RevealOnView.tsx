"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { classNames } from "@/lib/classnames";

type RevealOnViewProps = {
  readonly children: ReactNode;
};

/**
 * React warns if useLayoutEffect runs during server rendering ("useLayoutEffect
 * does nothing on the server") - and Next.js does server-render client
 * components to produce the initial HTML. useEffect is silently a no-op
 * there instead, so falling back to it during SSR (typeof window ===
 * "undefined") avoids the warning with no behavior change: the effect
 * still only ever does anything once this runs on the client.
 */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Reveals its children once, the first time they scroll into view - or
 * leaves them alone if they're already in view when this mounts, or if
 * prefers-reduced-motion is set (motion-guidelines.md: "Disable section
 * reveals," not "make them instant").
 *
 * Defaults to visible: the hidden state only exists once this effect has
 * run and found the element off-screen, never in the server-rendered
 * HTML, so content never depends on JavaScript to become visible - only
 * to animate. A layout effect, not a regular effect, so that first hide
 * (when it happens) lands before the browser's first paint - otherwise a
 * below-the-fold section would flash visible for one frame before fading
 * out, which is exactly the flicker this exists to avoid.
 */
export function RevealOnView({ children }: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        } else {
          setHidden(true);
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(
        "transition-[opacity,translate] duration-200",
        hidden ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
      )}
    >
      {children}
    </div>
  );
}
