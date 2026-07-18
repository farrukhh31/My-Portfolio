"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Journey() {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="glass relative overflow-hidden rounded-3xl border border-white/10 p-8"
    >
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-purple-500/10 blur-[90px]" />

      <div className="relative z-10 flex items-center gap-3">
        <Quote size={22} className="text-cyan-400" />
        <h3 className="text-2xl font-bold">
          My Story
        </h3>
      </div>

      <p className="relative z-10 mt-6 leading-8 text-slate-400">
        I&apos;m a Computer Science student specializing in Gaming &amp;
        Animation at NED University. What started as curiosity about how
        websites work turned into a habit of building — full stack
        applications, interactive games, and the automation that ships
        them without drama.
      </p>

      <p className="relative z-10 mt-5 leading-8 text-slate-400">
        These days that means writing React and Node.js by day, tuning
        Unity gameplay on the side, wiring up Docker and CI/CD so
        deployments stop being an event, and folding AI into products
        wherever it genuinely makes them better. Four disciplines that,
        in practice, feed each other constantly.
      </p>

     <div className="relative z-10 mt-8 flex flex-wrap gap-3">
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
        y: [0, -4, 0],
      }}
      transition={{
        opacity: {
          delay: index * 0.12,
          duration: 0.5,
        },
        y: {
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.08,
        y: -6,
      }}
      className="
        relative
        overflow-hidden
        rounded-full
        border
        border-cyan-400/15
        bg-white/[0.05]
        px-5
        py-2
        text-sm
        text-slate-200
        backdrop-blur-xl
      "
    >
      {tag}
    </motion.span>
  ))}
</div>
    </motion.div>
  );
}
