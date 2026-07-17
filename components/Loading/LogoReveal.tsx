"use client";

import { motion } from "framer-motion";

export default function LoadingLogo() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-44 w-44 rounded-full bg-cyan-400/20 blur-[80px]"
      />

      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-28 w-28 rounded-full border border-cyan-400/20"
      />

      {/* Orbit Dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-28 w-28"
      >
        <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
      </motion.div>

      {/* Logo */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-2xl

          border
          border-white/10

          bg-white/5
          backdrop-blur-xl

          shadow-[0_0_40px_rgba(34,211,238,.2)]
        "
      >
        <span
          className="
            bg-gradient-to-r
            from-cyan-300
            via-sky-400
            to-violet-400

            bg-clip-text
            text-3xl
            font-black
            tracking-tight
            text-transparent
          "
        >
          FA
        </span>
      </motion.div>
    </div>
  );
}