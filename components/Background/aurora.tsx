"use client";

import { motion } from "framer-motion";

export default function Aurora() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 120, -120, 0],
          y: [0, -60, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        left-[-10%]
        top-[-10%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-500/20
        blur-[140px]
        -z-20
        "
      />

      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        right-[-10%]
        bottom-[-10%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-violet-500/20
        blur-[150px]
        -z-20
        "
      />
    </>
  );
}