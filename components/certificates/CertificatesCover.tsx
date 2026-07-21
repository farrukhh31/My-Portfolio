"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  devops: Award,
};

export default function CertificateCover({
  title,
  issuer,
  year,
  category,
  status,
}: Props) {
  const Icon = icons[category];
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* Cyan Glow */}

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [.25, .5, .25],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-cyan-500/25
          blur-[60px]
          transform-gpu
          will-change-transform
          sm:-left-16
          sm:-top-16
          sm:h-48
          sm:w-48
          sm:blur-[90px]
          lg:-left-20
          lg:-top-20
          lg:h-64
          lg:w-64
          lg:blur-[120px]
        "
      />

      {/* Purple Glow */}

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [.2, .4, .2],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-12
          -right-10
          h-36
          w-36
          rounded-full
          bg-violet-600/20
          blur-[65px]
          transform-gpu
          will-change-transform
          sm:-bottom-16
          sm:-right-16
          sm:h-56
          sm:w-56
          sm:blur-[100px]
          lg:-bottom-24
          lg:-right-20
          lg:h-72
          lg:w-72
          lg:blur-[130px]
        "
      />

      {/* Grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Noise */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,.03)_100%)]" />

      {/* Decorative Corners — only worth the visual noise once there's
          room to breathe */}

      <div className="pointer-events-none absolute left-3 top-3 hidden h-10 w-10 rounded-tl-2xl border-l border-t border-cyan-400/20 sm:block sm:h-14 sm:w-14 sm:rounded-tl-3xl lg:left-6 lg:top-6" />

      <div className="pointer-events-none absolute bottom-3 right-3 hidden h-10 w-10 rounded-br-2xl border-b border-r border-violet-400/20 sm:block sm:h-14 sm:w-14 sm:rounded-br-3xl lg:bottom-6 lg:right-6" />

      <div className="relative flex h-full flex-col justify-between p-4 sm:p-6 lg:p-8">

        {/* Header */}

        <div className="flex items-start justify-between">

          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -4, 0],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="
              rounded-2xl
              border
              border-cyan-400/20
              bg-cyan-400/10
              p-2.5
              sm:rounded-3xl
              sm:p-4
              lg:p-5
            "
          >
            <Icon className="h-5 w-5 text-cyan-400 sm:h-8 sm:w-8 lg:h-10.5 lg:w-10.5" />
          </motion.div>

          <span
            className={`
              rounded-full
              border
              px-2.5
              py-1
              text-[9px]
              font-semibold
              tracking-widest
              sm:px-4
              sm:py-2
              sm:text-xs
              sm:tracking-[0.18em]

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

          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400/90 sm:text-xs sm:tracking-[0.45em]">
            {issuer}
          </p>

          <h2 className="mt-1.5 max-w-lg text-base font-black leading-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:mt-5 lg:text-4xl xl:text-5xl">
            {title}
          </h2>

          <p className="mt-1.5 hidden max-w-md text-sm leading-7 text-slate-400 sm:mt-5 sm:block">
            This certificate recognizes successful completion of the learning
            program and validates practical knowledge and technical skills.
          </p>

          {/* Verified */}

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="
              mt-2
              inline-flex
              items-center
              gap-1.5
              rounded-xl
              border
              border-cyan-400/20
              bg-cyan-500/10
              px-2.5
              py-1.5
              backdrop-blur-xl
              sm:mt-8
              sm:gap-3
              sm:rounded-2xl
              sm:px-5
              sm:py-3
            "
          >
            <ShieldCheck className="h-3 w-3 text-cyan-400 sm:h-4.5 sm:w-4.5" />

            <span className="text-[10px] font-medium text-cyan-300 sm:text-sm">
              Verified Certificate
            </span>

          </motion.div>

        </div>

        {/* Footer */}

        <div>

          {/* Divider */}

          <div className="mb-2 h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent sm:mb-6" />

          <div className="flex items-end justify-between gap-2">

            {/* Left */}

            <div>

              <p className="text-[7px] uppercase tracking-[0.2em] text-slate-500 sm:text-[10px] sm:tracking-[0.35em]">
                Issued
              </p>

              <p className="mt-0.5 text-xs font-semibold text-white sm:mt-2 sm:text-lg">
                {year}
              </p>

            </div>

            {/* Center — decorative, only worth showing once there's room */}

            <div className="hidden items-center gap-3 md:flex">

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

              <p className="text-[7px] uppercase tracking-[0.2em] text-slate-500 sm:text-[10px] sm:tracking-[0.35em]">
                Certificate ID
              </p>

              <p className="mt-0.5 truncate font-mono text-[9px] text-slate-300 sm:mt-2 sm:text-sm">
                #{title.replace(/\s+/g, "").slice(0, 8).toUpperCase()}-{year}
              </p>

            </div>

          </div>

        </div>

        {/* Watermark — purely decorative, skip it where there's no room */}

        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  rotate: [0, 360],
                }
          }
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
            hidden
            opacity-[0.03]
            will-change-transform
            lg:block
          "
        >
          <Award
            size={220}
            className="text-white"
          />
        </motion.div>

        {/* Bottom Accent */}

        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-cyan-400 via-violet-500 to-cyan-400 sm:h-1" />

      </div>

    </div>
  );
}
