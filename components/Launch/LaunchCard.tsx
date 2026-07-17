"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";
import LaunchButton from "./LaunchButton";

type Props = {
  onEnter: () => void;
};

export default function LaunchCard({
  onEnter,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 1.0,
        ease: "easeOut",
      }}
      className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl shadow-[0_0_80px_rgba(34,211,238,.08)]"
    >
      {/* Top Gradient */}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Glow */}

      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
      />

      {/* Content */}

      <div className="relative z-10 text-center">

        <Logo />

        {/* Badge */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mx-auto mt-8 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300"
        >
          FA Launch Card
        </motion.div>

        {/* Welcome */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-10 text-slate-400"
        >
          Welcome to
        </motion.p>

        {/* Name */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
          }}
          className="mt-3 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-5xl font-black text-transparent"
        >
          Farrukh Ahmad
        </motion.h1>

        {/* Role */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="mt-5 text-lg text-cyan-300"
        >
          Full Stack Developer • Game Developer • DevOps
        </motion.p>

        {/* Description */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
          }}
          className="mx-auto mt-8 max-w-md leading-8 text-slate-400"
        >
          Building modern web applications,
          immersive game experiences,
          and scalable software with clean design,
          smooth interactions, and thoughtful engineering.
        </motion.p>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.4,
          }}
        >
          <LaunchButton
            onClick={onEnter}
          />
        </motion.div>

        {/* Bottom */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.1,
          }}
          className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-500"
        >
          <span>Next.js</span>

          <span>•</span>

          <span>TypeScript</span>

          <span>•</span>

          <span>Framer Motion</span>
        </motion.div>

      </div>
    </motion.div>
  );
}