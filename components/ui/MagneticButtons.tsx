"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function MagneticButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const frame = useRef<number | null>(null);

  // Touch/coarse pointers can't hover, and some browsers fire a synthetic
  // mousemove right after a tap — without this the button can visibly jump
  // once on touch. Skip the magnetic pull there entirely.
  const [magnetic, setMagnetic] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setMagnetic(mql.matches);
    const onChange = () => setMagnetic(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function move(e: React.MouseEvent<HTMLButtonElement>) {
    if (!magnetic) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;

    // Batch the style write to the next paint instead of on every raw
    // mousemove — keeps this smooth even on a flurry of pointer events.
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

  function leave() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    frame.current = requestAnimationFrame(() => {
      el.style.transform = "translate3d(0, 0, 0)";
    });
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      whileTap={{
        scale: 0.95,
      }}
      className="touch-manipulation rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 sm:px-7 sm:py-3 sm:text-base"
    >
      {children}
    </motion.button>
  );
}