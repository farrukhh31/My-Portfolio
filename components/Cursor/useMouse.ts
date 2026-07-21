"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/**
 * Tracks the raw pointer position as Framer Motion values instead of
 * React state, so the 60fps mousemove stream never triggers a
 * component re-render — only the elements actually bound to these
 * values update, via Motion's own animation loop.
 *
 * The listener is only attached on fine-pointer (mouse/trackpad)
 * devices. Touch screens never fire mousemove, so on mobile this is a
 * no-op — which also means callers should hide anything driven by it
 * behind the same "(pointer: fine)" check (see cursor.tsx).
 */
export default function useMouse(): { x: MotionValue<number>; y: MotionValue<number> } {
  // Start off-screen so nothing can flash at (0,0) before the first
  // real move event arrives.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!window.matchMedia?.("(pointer: fine)").matches) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return { x, y };
}
