"use client";

import { motion } from "framer-motion";

type Props = {
  progress: number;
};

export default function LoadingProgress({ progress }: Props) {
  return (
    <div className="mt-10 w-full max-w-[320px] sm:mt-14">
      {/* Percentage */}
      <div className="mb-4 flex items-center justify-between">
        <motion.span
          key={Math.floor(progress)}
          initial={{ opacity: 0.4, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tight text-white sm:text-4xl"
        >
          {Math.floor(progress)}%
        </motion.span>

        <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          Loading
        </span>
      </div>

      {/* Track */}
      <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
        {/* Fill */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-linear-to-r from-cyan-400 via-sky-400 to-violet-500"
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            ease: "easeOut",
          }}
        />

        {/* Shimmer */}
        <motion.div
          animate={{
            x: ["-100%", "300%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 h-full w-20 bg-white/25 blur-sm"
        />

        {/* Glowing Dot */}
        <motion.div
          animate={{
            left: `calc(${progress}% - 6px)`,
          }}
          transition={{
            ease: "easeOut",
          }}
          className="
            absolute
            top-1/2
            h-3
            w-3
            -translate-y-1/2
            rounded-full
            bg-cyan-300
            shadow-[0_0_18px_rgba(34,211,238,0.9)]
          "
        />
      </div>
    </div>
  );
}