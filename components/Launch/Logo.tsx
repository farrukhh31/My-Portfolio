"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: .6,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: .7,
      }}
      className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/15 bg-cyan-400/10 backdrop-blur-xl"
    >
      <Sparkles
        size={34}
        className="text-cyan-300"
      />
    </motion.div>
  );
}