"use client";

import { motion } from "framer-motion";
import useMouse from "./useMouse";

export default function Cursor() {
  const { x, y } = useMouse();

  return (
    <>
      {/* Main Cursor */}

      <motion.div
        animate={{
          x: x - 10,
          y: y - 10,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 40,
          mass: 0.2,
        }}
        className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9999]
        h-5
        w-5
        rounded-full
        bg-cyan-400
        shadow-[0_0_25px_rgba(34,211,238,.8)]
        mix-blend-screen
        "
      />

      {/* Outer Ring */}

      <motion.div
        animate={{
          x: x - 24,
          y: y - 24,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
        className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9998]
        h-12
        w-12
        rounded-full
        border
        border-cyan-400/40
        "
      />
    </>
  );
}