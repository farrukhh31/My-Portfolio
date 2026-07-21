"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { useHasFinePointer, usePrefersReducedMotion } from "./useMediaQuery";

export default function Journey() {
  const hasFinePointer = useHasFinePointer();
  const reduceMotion = usePrefersReducedMotion();
  const enableLoops = !reduceMotion;

  return (
    <motion.div
      whileHover={hasFinePointer ? { y: -8 } : undefined}
      className="glass relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-purple-500/10 blur-[60px] sm:h-56 sm:w-56 sm:blur-[90px]" />

      <div className="relative z-10 flex items-center gap-3">
        <Quote size={20} className="text-cyan-400 sm:hidden" />
        <Quote size={22} className="hidden text-cyan-400 sm:block" />
        <h3 className="text-xl font-bold sm:text-2xl">
          My Story
        </h3>
      </div>

      <p className="relative z-10 mt-5 leading-7 text-slate-400 sm:mt-6 sm:leading-8">
        I&apos;m a Computer Science student specializing in Gaming &amp;
        Animation at NED University. What started as curiosity about how
        websites work turned into a habit of building — full stack
        applications, interactive games, and the automation that ships
        them without drama.
      </p>

      <p className="relative z-10 mt-4 leading-7 text-slate-400 sm:mt-5 sm:leading-8">
        These days that means writing React and Node.js by day, tuning
        Unity gameplay on the side, wiring up Docker and CI/CD so
        deployments stop being an event, and folding AI into products
        wherever it genuinely makes them better. Four disciplines that,
        in practice, feed each other constantly.
      </p>

      <div className="relative z-10 mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
        {[
          "Full Stack Development",
          "Game Development",
          "DevOps & Automation",
          "Artificial Intelligence",
        ].map((tag, index) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1,
              y: enableLoops ? [0, -4, 0] : 0,
            }}
            transition={{
              opacity: {
                delay: index * 0.12,
                duration: 0.5,
              },
              y: {
                duration: 4 + index,
                repeat: enableLoops ? Infinity : 0,
                ease: "easeInOut",
              },
            }}
            whileHover={hasFinePointer ? { scale: 1.08, y: -6 } : undefined}
            className="
              relative
              overflow-hidden
              rounded-full
              border
              border-cyan-400/15
              bg-white/[0.05]
              px-4
              py-1.5
              text-xs
              text-slate-200
              backdrop-blur-md
              transition
              sm:px-5
              sm:py-2
              sm:text-sm
            "
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
