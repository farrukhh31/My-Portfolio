"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import CertificateCover from "./CertificatesCover";
import type { Certificate } from "./types";

type Props = {
  certificate: Certificate;
  onPrevious: () => void;
  onNext: () => void;
};

export default function CertificateHero({
  certificate,
  onPrevious,
  onNext,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    {
      stiffness: 180,
      damping: 22,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    {
      stiffness: 180,
      damping: 22,
    }
  );

  function handleMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    mouseX.set(
      (e.clientX - rect.left) /
        rect.width -
        0.5
    );

    mouseY.set(
      (e.clientY - rect.top) /
        rect.height -
        0.5
    );
  }

  function reset() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="relative flex justify-center">

      {/* Background Glow */}

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[650px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500/15
          blur-[180px]
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          right-10
          h-[400px]
          w-[400px]
          rounded-full
          bg-violet-600/15
          blur-[150px]
        "
      />

      {/* Previous */}

      <motion.button
        whileHover={{
          scale: 1.08,
          x: -4,
        }}
        whileTap={{
          scale: .95,
        }}
        onClick={onPrevious}
        className="
          absolute
          left-0
          top-1/2
          z-30
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/10
          bg-slate-900/70
          p-4
          backdrop-blur-xl
          transition
          hover:border-cyan-400
        "
      >
        <ChevronLeft />
      </motion.button>

      {/* Next */}

      <motion.button
        whileHover={{
          scale: 1.08,
          x: 4,
        }}
        whileTap={{
          scale: .95,
        }}
        onClick={onNext}
        className="
          absolute
          right-0
          top-1/2
          z-30
          translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/10
          bg-slate-900/70
          p-4
          backdrop-blur-xl
          transition
          hover:border-cyan-400
        "
      >
        <ChevronRight />
      </motion.button>

      {/* Hero Card */}

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          },
        }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1400,
        }}
        className="
          group
          relative
          w-full
          max-w-[650px]
        "
      >
                {/* Animated Glow Border */}

        <div
          className="
            absolute
            -inset-[2px]
            rounded-[38px]
            bg-gradient-to-r
            from-cyan-500
            via-violet-500
            to-cyan-500
            opacity-0
            blur-xl
            transition-all
            duration-500
            group-hover:opacity-70
          "
        />

        {/* Glass Card */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-white/10
            bg-white/[0.05]
            backdrop-blur-3xl
            shadow-[0_35px_90px_rgba(0,0,0,.45)]
          "
        >
          {/* Animated Grid */}

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Reflection */}

          <motion.div
            animate={{
              x: ["-120%", "220%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              inset-y-0
              w-40
              rotate-12
              bg-gradient-to-r
              from-transparent
              via-white/15
              to-transparent
            "
          />

          {/* Certificate */}

          <div
            className="
              relative
              aspect-[1.414/1]
              overflow-hidden
              rounded-[28px]
              m-5
              border
              border-white/10
            "
          >
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                duration: 0.45,
              }}
              className="h-full w-full"
            >
              <CertificateCover
                title={certificate.title}
                issuer={certificate.issuer}
                year={certificate.year}
                category={certificate.category}
                status={certificate.status}
              />
            </motion.div>

            {/* In Progress Overlay */}

            {certificate.status === "in-progress" && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  bg-slate-950/70
                  backdrop-blur-md
                "
              >
                <div
                  className="
                    rounded-2xl
                    border
                    border-amber-400/30
                    bg-amber-500/10
                    px-6
                    py-4
                    text-center
                  "
                >
                  <p className="text-lg font-semibold text-amber-300">
                    🚧 Certificate In Progress
                  </p>

                  <p className="mt-2 text-sm text-slate-300">
                    The official certificate
                    <br />
                    will be available after completion.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Accent */}

          <div
            className="
              h-[3px]
              w-full
              bg-gradient-to-r
              from-cyan-400
              via-violet-500
              to-cyan-400
            "
          />
        </div>

      </motion.div>

    </div>
  );
}