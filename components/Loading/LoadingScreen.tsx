"use client";

import { AnimatePresence, motion } from "framer-motion";

import Aurora from "./Aurora";
import BackgroundFX from "./BgFX";
import Particles from "./Particles";
import LoadingLogo from "./LogoReveal";
import LoadingProgress from "./ProgressBar";
import LoadingStatus from "./LoadingStatus";
import useLoading from "./useLoading";

export default function LoadingScreen() {
  const { loading, progress } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(18px)",
          }}
          transition={{
            duration: 1.0,
            ease: "easeInOut",
          }}
          className="
            fixed
            inset-0
            z-99999
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[#030712]
          "
        >
          {/* Aurora */}
          <BackgroundFX />
          <Aurora />
          <Particles />

          {/* Grid */}
          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]
              bg-size-[60px_60px]
            "
          />

          {/* Noise */}
          <div
            className={`
              absolute
              inset-0
              opacity-[0.03]
              mix-blend-soft-light
              [background-image:url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Cg fill="white" fill-opacity="0.25"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3C/g%3E%3C/svg%3E')]
            `}
          />

          {/* Main Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="
              relative
              z-10

              w-105
              max-w-[92vw]

              rounded-2xl
              sm:rounded-3xl

              border
              border-white/10

              bg-white/4

              backdrop-blur-2xl

              px-6
              py-9
              sm:px-10
              sm:py-12

              shadow-[0_20px_80px_rgba(0,0,0,.45)]
            "
          >
            <div className="flex flex-col items-center">
              <LoadingLogo />

              <LoadingStatus progress={progress} />

              <LoadingProgress progress={progress} />

              <motion.div
                animate={{
                  opacity: [0.35, 1, 0.35],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  mt-6
                  sm:mt-8

                  text-[10px]
                  sm:text-[11px]

                  uppercase

                  tracking-[0.35em]
                  sm:tracking-[0.45em]

                  text-cyan-400/80
                "
              >
                React • Next.js • TypeScript
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}