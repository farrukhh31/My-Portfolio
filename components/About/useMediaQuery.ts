"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Returns `false` on the server / first paint,
 * then syncs to the real value on mount and keeps listening for changes
 * (screen rotation, window resize across breakpoints, OS-level "reduce
 * motion" toggles, etc).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Safari < 14 fallback
    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    } else {
      mql.addListener(handler);
      return () => mql.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/** True on phones/tablets — anything below the `lg` breakpoint. */
export function useIsCompact() {
  return useMediaQuery("(max-width: 1023px)");
}

/** True only when the device has a real mouse (skip hover/tilt FX on touch). */
export function useHasFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** True when the user has asked the OS for reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
