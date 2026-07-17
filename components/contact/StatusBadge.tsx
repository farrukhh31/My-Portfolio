"use client";

import { motion } from "framer-motion";

export default function StatusBadge() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      className="mt-10 flex items-center gap-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5"
    >
      <span className="h-3 w-3 rounded-full bg-green-400" />

      <div>
        <p className="font-semibold">
          Available for Internships
        </p>

        <p className="text-sm text-slate-400">
          Open to Full Stack & Game Dev roles
        </p>
      </div>
    </motion.div>
  );
}