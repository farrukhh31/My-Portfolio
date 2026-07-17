"use client";

import { motion } from "framer-motion";

export default function FooterDivider() {
  return (
    <div className="my-16 flex items-center justify-center">

      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="mx-6 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,.8)]"
      />

      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    </div>
  );
}