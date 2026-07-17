"use client";

import { motion } from "framer-motion";

export default function FooterLogo() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,.25)]"
    >
      <span className="text-3xl font-black text-white">
        FA
      </span>
    </motion.div>
  );
}