"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{
        y: -6,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="group relative h-24 w-40 shrink-0 overflow-hidden rounded-3xl"
    >
      {/* Animated Glow */}

      <div
        className={`
          absolute
          -inset-[2px]
          rounded-3xl
          bg-gradient-to-r
          from-cyan-500
          via-violet-500
          to-cyan-500
          blur-lg
          transition-all
          duration-500

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
          rounded-3xl
          border
          backdrop-blur-2xl

          transition-all
          duration-500

          ${
            active
              ? "border-cyan-400/50 bg-white/[0.08] shadow-[0_0_40px_rgba(34,211,238,.18)]"
              : "border-white/10 bg-white/[0.04] hover:border-cyan-400/30"
          }
        `}
      >
        {/* Image */}

        {certificate.image ? (
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Icon
              size={34}
              className="text-cyan-400"
            />
          </div>
        )}

        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Shimmer */}

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
          className="absolute top-0 h-full w-12 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Status */}

        <div className="absolute right-3 top-3">
          {completed ? (
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/15 p-1.5 backdrop-blur-xl">
              <CheckCircle2
                size={13}
                className="text-emerald-300"
              />
            </div>
          ) : (
            <div className="rounded-full border border-amber-400/30 bg-amber-400/15 p-1.5 backdrop-blur-xl">
              <Loader2
                size={13}
                className="animate-spin text-amber-300"
              />
            </div>
          )}
        </div>

        {/* Title */}

        <div className="absolute inset-x-0 bottom-0 p-3">

          <p className="line-clamp-2 text-left text-xs font-semibold leading-4 text-white">
            {certificate.title}
          </p>

          <p className="mt-1 text-left text-[10px] uppercase tracking-[0.18em] text-cyan-300">
            {certificate.issuer}
          </p>

        </div>

        {/* Active Indicator */}

        {active && (
          <>
            <motion.div
              layoutId="certificate-active"
              className="absolute inset-0 rounded-3xl border border-cyan-400/70"
            />

            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400" />
          </>
        )}
      </div>
    </motion.button>
  );
}