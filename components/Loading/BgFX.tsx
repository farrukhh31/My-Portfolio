"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function BackgroundFX() {
  return (
    <>
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,.10),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,.12),transparent_55%),#030712]" />

      {/* Animated Grid */}
      <motion.div
        animate={{
          backgroundPosition: ["0px 0px", "80px 80px"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-0

          opacity-20

          bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]

          bg-size-[80px_80px]
        "
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.75))]" />

      {/* Scan Line */}
      <motion.div
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-0

          h-40
          w-full

          bg-linear-to-b
          from-transparent
          via-cyan-400/10
          to-transparent

          blur-2xl
        "
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2

          h-95
          w-95
          sm:h-162.5
          sm:w-162.5

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-cyan-400/10

          blur-[90px]
          sm:blur-[170px]
        "
      />
    </>
  );
}
export default memo(BackgroundFX);