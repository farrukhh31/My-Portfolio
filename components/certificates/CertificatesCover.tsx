"use client";

import { motion } from "framer-motion";
import {
  Award,
  BrainCircuit,
  Gamepad2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

interface Props {
  title: string;
  issuer: string;
  year: string;
  category: "game-dev" | "ai" | "web-dev";
  status: "completed" | "in-progress";
}

const icons = {
  "game-dev": Gamepad2,
  ai: BrainCircuit,
  "web-dev": GraduationCap,
};

export default function CertificateCover({
  title,
  issuer,
  year,
  category,
  status,
}: Props) {
  const Icon = icons[category];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* Cyan Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [.25, .5, .25],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-cyan-500/25
          blur-[120px]
        "
      />

      {/* Purple Glow */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [.2, .4, .2],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-24
          -right-20
          h-72
          w-72
          rounded-full
          bg-violet-600/20
          blur-[130px]
        "
      />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Noise */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,.03)_100%)]" />

      {/* Decorative Corners */}

      <div className="absolute left-6 top-6 h-14 w-14 rounded-tl-3xl border-l border-t border-cyan-400/20" />

      <div className="absolute bottom-6 right-6 h-14 w-14 rounded-br-3xl border-b border-r border-violet-400/20" />

      <div className="relative flex h-full flex-col justify-between p-8">

        {/* Header */}

        <div className="flex items-start justify-between">

          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="
              rounded-3xl
              border
              border-cyan-400/20
              bg-cyan-400/10
              p-5
            "
          >
            <Icon
              size={42}
              className="text-cyan-400"
            />
          </motion.div>

          <span
            className={`
              rounded-full
              border
              px-4
              py-2
              text-xs
              font-semibold
              tracking-[0.18em]

              ${
                status === "completed"
                  ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-400/30 bg-amber-500/10 text-amber-300"
              }
            `}
          >
            {status === "completed"
              ? "COMPLETED"
              : "IN PROGRESS"}
          </span>

        </div>
                {/* Center */}

        <div className="relative">

          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-cyan-400/90">
            {issuer}
          </p>

          <h2 className="mt-5 max-w-lg text-4xl font-black leading-tight text-white xl:text-5xl">
            {title}
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            This certificate recognizes successful completion of the learning
            program and validates practical knowledge and technical skills.
          </p>

          {/* Verified */}

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-2xl
              border
              border-cyan-400/20
              bg-cyan-500/10
              px-5
              py-3
              backdrop-blur-xl
            "
          >
            <ShieldCheck
              size={18}
              className="text-cyan-400"
            />

            <span className="text-sm font-medium text-cyan-300">
              Verified Certificate
            </span>

          </motion.div>

        </div>

        {/* Footer */}

        <div>

          {/* Divider */}

          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="flex items-end justify-between">

            {/* Left */}

            <div>

              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                Issued
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {year}
              </p>

            </div>

            {/* Center */}

            <div className="flex items-center gap-3">

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3">

                <Award
                  size={18}
                  className="text-cyan-400"
                />

              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Portfolio
                </p>

                <p className="font-semibold text-slate-200">
                  Farrukh.dev
                </p>

              </div>

            </div>

            {/* Right */}

            <div className="text-right">

              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                Certificate ID
              </p>

              <p className="mt-2 font-mono text-sm text-slate-300">
                #{title.replace(/\s+/g, "").slice(0, 8).toUpperCase()}-{year}
              </p>

            </div>

          </div>

        </div>

        {/* Watermark */}

        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            -right-20
            bottom-8
            opacity-[0.03]
          "
        >
          <Award
            size={220}
            className="text-white"
          />
        </motion.div>

        {/* Bottom Accent */}

        <div className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400" />

      </div>

    </div>
  );
}