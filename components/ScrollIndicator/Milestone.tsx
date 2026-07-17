"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
  top: number;
  active: boolean;
  onClick: () => void;
};

export default function Milestone({
  label,
  top,
  active,
  onClick,
}: Props) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.95 }}
      className="group absolute left-1/2 -translate-x-1/2"
      style={{
        top: `${top}%`,
      }}
    >
      {/* Outer Pulse */}

      <motion.div
        animate={{
          scale: active ? [1, 2.2, 1] : [1, 1.5, 1],
          opacity: active ? [0.4, 0, 0.4] : [0.15, 0, 0.15],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
      />

      {/* Glow */}

      <motion.div
        animate={{
          scale: active ? 1.4 : 1,
        }}
        className={`absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-all duration-500 ${
          active
            ? "bg-cyan-400/80"
            : "bg-cyan-400/20"
        }`}
      />

      {/* Main Dot */}

      <motion.div
        animate={{
          scale: active ? 1.2 : 1,
        }}
        transition={{
          duration: 0.3,
        }}
        className={`relative h-4 w-4 rounded-full border transition-all duration-300 ${
          active
            ? "border-cyan-300 bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,.8)]"
            : "border-white/30 bg-slate-900"
        }`}
      />

      {/* Tooltip */}

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{
          opacity: 1,
          x: -18,
        }}
        className="pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-xl"
      >
        {label}
      </motion.div>
    </motion.button>
  );
}