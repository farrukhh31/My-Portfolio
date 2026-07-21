"use client";

import { AnimatePresence, motion } from "framer-motion";

import LaunchBackground from "./LaunchBg";
import LaunchCard from "./LaunchCard";
import useLaunch from "./useLaunch";

export default function LaunchScreen() {
  const { open, enterPortfolio } = useLaunch();

  // If the launch screen has already been shown during this session,
  // don't render it again.
  if (open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.06,
          filter: "blur(24px)",
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-[#030712] px-4 sm:px-6"
      >
        <LaunchBackground />

        {/* Decorative Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute h-105 w-105 rounded-full bg-cyan-500/10 blur-[90px] sm:h-175 sm:w-175 sm:blur-[180px]"
        />

        {/* Launch Card */}
        <LaunchCard onEnter={enterPortfolio} />
      </motion.div>
    </AnimatePresence>
  );
}