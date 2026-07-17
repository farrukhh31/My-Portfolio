"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  function move(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current!.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;

    const y = e.clientY - rect.top - rect.height / 2;

    ref.current!.style.transform = `translate(${x * .15}px,${
      y * .15
    }px)`;
  }

  function leave() {
    ref.current!.style.transform = "translate(0,0)";
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      whileTap={{
        scale: .95,
      }}
      className="rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition-all duration-300"
    >
      {children}
    </motion.button>
  );
}