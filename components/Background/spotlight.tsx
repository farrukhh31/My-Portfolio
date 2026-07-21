"use client";

import { useEffect, useRef, useState } from "react";

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pos = useRef({ x: -500, y: -500 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip the spotlight entirely on touch / coarse-pointer devices
    // (no mouse to track, and it's wasted work on mobile).
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (frame.current !== null) return;

      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        if (ref.current) {
          ref.current.style.setProperty("--x", `${pos.current.x}px`);
          ref.current.style.setProperty("--y", `${pos.current.y}px`);
        }
      });
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10"
      style={
        {
          "--x": "-500px",
          "--y": "-500px",
          background:
            "radial-gradient(300px circle at var(--x) var(--y), rgba(34,211,238,.10), transparent 70%)",
        } as React.CSSProperties
      }
    />
  );
}