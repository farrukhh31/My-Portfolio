"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  Gamepad2,
  GraduationCap,
  Loader2,
} from "lucide-react";

import type { Certificate } from "./types";

type Props = {
  certificate: Certificate;
  active: boolean;
  onClick: () => void;
};

const icons = {
  "game-dev": Gamepad2,
  ai: BrainCircuit,
  "web-dev": GraduationCap,
};

export default function CertificateThumbnail({
  certificate,
  active,
  onClick,
}: Props) {
  const Icon = icons[certificate.category];
  const completed = certificate.status === "completed";
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6,
              scale: 1.04,
            }
      }
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="group relative h-16 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-40 sm:rounded-3xl"
    >
      {/* Animated Glow */}

      <div
        className={`
          absolute
          -inset-0.5
          rounded-2xl
          bg-linear-to-r
          from-cyan-500
          via-violet-500
          to-cyan-500
          blur-lg
          transition-all
          duration-500
          sm:rounded-3xl

          ${
            active
              ? "opacity-70"
              : "opacity-0 group-hover:opacity-40"
          }
        `}
      />

      {/* Card */}

      <div
        className={`
          relative
          h-full
          w-full
          overflow-hidden
          rounded-2xl
          border
          backdrop-blur-2xl
          sm:rounded-3xl

          transition-all
          duration-500

          ${
            active
              ? "border-cyan-400/50 bg-white/8 shadow-[0_0_40px_rgba(34,211,238,.18)]"
              : "border-white/10 bg-white/4 hover:border-cyan-400/30"
          }
        `}
      >
        {/* Image */}

        {certificate.image ? (
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            sizes="(max-width: 640px) 112px, 160px"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            <Icon
              size={24}
              className="text-cyan-400 sm:hidden"
            />
            <Icon
              size={34}
              className="hidden text-cyan-400 sm:block"
            />
          </div>
        )}

        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

        {/* Shimmer */}

        {!shouldReduceMotion && (
          <motion.div
            initial={{
              x: "-130%",
            }}
            whileHover={{
              x: "180%",
            }}
            transition={{
              duration: 0.8,
            }}
            className="absolute top-0 h-full w-8 rotate-12 bg-linear-to-r from-transparent via-white/20 to-transparent sm:w-12"
          />
        )}

        {/* Status */}

        <div className="absolute right-1.5 top-1.5 sm:right-3 sm:top-3">
          {completed ? (
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/15 p-1 backdrop-blur-xl sm:p-1.5">
              <CheckCircle2
                size={10}
                className="text-emerald-300 sm:hidden"
              />
              <CheckCircle2
                size={13}
                className="hidden text-emerald-300 sm:block"
              />
            </div>
          ) : (
            <div className="rounded-full border border-amber-400/30 bg-amber-400/15 p-1 backdrop-blur-xl sm:p-1.5">
              <Loader2
                size={10}
                className="animate-spin text-amber-300 sm:hidden"
              />
              <Loader2
                size={13}
                className="hidden animate-spin text-amber-300 sm:block"
              />
            </div>
          )}
        </div>

        {/* Title */}

        <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-3">

          <p className="line-clamp-2 text-left text-[9px] font-semibold leading-3 text-white sm:text-xs sm:leading-4">
            {certificate.title}
          </p>

          <p className="mt-0.5 hidden text-left text-[10px] uppercase tracking-[0.18em] text-cyan-300 sm:mt-1 sm:block">
            {certificate.issuer}
          </p>

        </div>

        {/* Active Indicator */}

        {active && (
          <>
            <motion.div
              layoutId="certificate-active"
              className="absolute inset-0 rounded-2xl border border-cyan-400/70 sm:rounded-3xl"
            />

            <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-cyan-400 via-violet-500 to-cyan-400" />
          </>
        )}
      </div>
    </motion.button>
  );
}
