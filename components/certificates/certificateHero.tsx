"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

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
    if (!ref.current || shouldReduceMotion) return;

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
    <div className="relative flex justify-center px-10 sm:px-12 lg:px-0">

      {/* Background Glow */}

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.12, 1],
                opacity: [0.35, 0.7, 0.35],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-70
          w-70
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500/15
          blur-[90px]
          transform-gpu
          will-change-transform
          sm:h-105
          sm:w-105
          sm:blur-[130px]
          lg:h-162.5
          lg:w-162.5
          lg:blur-[180px]
        "
      />

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.3, 0.15],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-0
          right-4
          h-45
          w-45
          rounded-full
          bg-violet-600/15
          blur-[80px]
          transform-gpu
          will-change-transform
          sm:right-10
          sm:h-70
          sm:w-70
          sm:blur-[110px]
          lg:h-100
          lg:w-100
          lg:blur-[150px]
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
        aria-label="Previous certificate"
        className="
          absolute
          left-0
          top-1/2
          z-30
          -translate-y-1/2
          rounded-full
          border
          border-white/10
          bg-slate-900/70
          p-2.5
          backdrop-blur-xl
          transition
          hover:border-cyan-400
          sm:p-3
          lg:-translate-x-1/2
          lg:p-4
        "
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
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
        aria-label="Next certificate"
        className="
          absolute
          right-0
          top-1/2
          z-30
          -translate-y-1/2
          rounded-full
          border
          border-white/10
          bg-slate-900/70
          p-2.5
          backdrop-blur-xl
          transition
          hover:border-cyan-400
          sm:p-3
          lg:translate-x-1/2
          lg:p-4
        "
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.button>

      {/* Hero Card */}

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -10, 0],
              }
        }
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
          max-w-162.5
          transform-gpu
          will-change-transform
        "
      >
        {/* Animated Glow Border */}

        <div
          className="
            absolute
            -inset-0.5
            rounded-3xl
            bg-linear-to-r
            from-cyan-500
            via-violet-500
            to-cyan-500
            opacity-0
            blur-xl
            transition-all
            duration-500
            group-hover:opacity-70
            sm:rounded-[38px]
          "
        />

        {/* Glass Card */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[22px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            shadow-[0_20px_60px_rgba(0,0,0,.4)]
            sm:rounded-[36px]
            sm:shadow-[0_35px_90px_rgba(0,0,0,.45)]
          "
        >
          {/* Animated Grid */}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Reflection */}

          {!shouldReduceMotion && (
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
                w-24
                rotate-12
                bg-linear-to-r
                from-transparent
                via-white/15
                to-transparent
                will-change-transform
                sm:w-40
              "
            />
          )}

          {/* Certificate */}

          <div
            className="
              relative
              aspect-[1.414/1]
              overflow-hidden
              rounded-2xl
              m-2.5
              border
              border-white/10
              sm:m-5
              sm:rounded-[28px]
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
                  p-3
                "
              >
                <div
                  className="
                    rounded-xl
                    border
                    border-amber-400/30
                    bg-amber-500/10
                    px-3
                    py-2
                    text-center
                    sm:rounded-2xl
                    sm:px-6
                    sm:py-4
                  "
                >
                  <p className="text-xs font-semibold text-amber-300 sm:text-lg">
                    🚧 Certificate In Progress
                  </p>

                  <p className="mt-1 hidden text-sm text-slate-300 sm:mt-2 sm:block">
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
              h-0.5
              w-full
              bg-linear-to-r
              from-cyan-400
              via-violet-500
              to-cyan-400
              sm:h-0.75
            "
          />
        </div>

      </motion.div>

    </div>
  );
}
