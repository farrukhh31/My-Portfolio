"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function Aurora() {
  return (
    <>
      <motion.div
        animate={{
          x: [-150, 150, -150],
          y: [-80, 80, -80],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/4 top-1/4 h-80 w-[320px] rounded-full bg-cyan-500/20 blur-[90px] sm:h-125 sm:w-125 sm:blur-[180px]"
      />

      <motion.div
        animate={{
          x: [150, -150, 150],
          y: [80, -80, 80],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-1/4 bottom-1/4 h-87.5 w-87.5 rounded-full bg-violet-500/20 blur-[90px] sm:h-137.5 sm:w-137.5 sm:blur-[180px]"
      />

      <motion.div
        animate={{
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.08),transparent_70%)]"
      />
    </>
  );
}
export default memo(Aurora);