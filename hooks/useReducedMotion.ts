"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors `prefers-reduced-motion`. Used to tone down auto-rotation,
 * floating/bobbing and camera easing across the skills graph without
 * removing the 3D experience entirely.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
