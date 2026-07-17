"use client";

import { motion } from "framer-motion";

export default function ActivePill() {
  return (
    <motion.div
      layoutId="active-pill"
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 35,
        mass: 0.8,
      }}
      className="
        absolute
        inset-0
        rounded-full
        border
        border-white/10
        bg-white/10
        backdrop-blur-md
        shadow-[0_0_20px_rgba(255,255,255,0.08)]
      "
    />
  );
}