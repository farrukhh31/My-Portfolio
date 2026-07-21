"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CertificateCard from "./certificateCard";
import type { Certificate } from "./types";

type Props = {
  certificates: Certificate[];
};

function useCarouselMetrics() {
  const [metrics, setMetrics] = useState({
    offset: 260,
    scale: 0.82,
  });

  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setMetrics({ offset: 90, scale: 0.72 });
      } else if (width < 1024) {
        setMetrics({ offset: 170, scale: 0.78 });
      } else {
        setMetrics({ offset: 260, scale: 0.82 });
      }
    };

    compute();

    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return metrics;
}

export default function CertificateCarousel({
  certificates,
}: Props) {
  const [current, setCurrent] = useState(0);
  const { offset, scale } = useCarouselMetrics();
  const shouldReduceMotion = useReducedMotion();

  const previous = () =>
    setCurrent((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1
    );

  const next = () =>
    setCurrent((prev) =>
      prev === certificates.length - 1 ? 0 : prev + 1
    );

  const getIndex = (offsetIndex: number) => {
    return (
      (current + offsetIndex + certificates.length) %
      certificates.length
    );
  };

  const left = certificates[getIndex(-1)];
  const center = certificates[current];
  const right = certificates[getIndex(1)];

  return (
    <div className="relative mx-auto flex max-w-7xl items-center justify-center px-12 py-10 sm:px-16 sm:py-16">

      {/* Left Arrow */}

      <button
        onClick={previous}
        aria-label="Previous certificate"
        className="absolute left-1 z-30 rounded-full border border-white/10 bg-slate-900/70 p-2 backdrop-blur transition hover:scale-110 sm:left-4 sm:p-3"
      >
        <ChevronLeft className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5" />
      </button>

      <div className="relative flex h-75 w-full items-center justify-center overflow-visible sm:h-105 lg:h-130">

        {/* LEFT */}

        <motion.div
          key={left.id}
          animate={{
            x: -offset,
            scale,
            rotate: shouldReduceMotion ? 0 : -14,
            opacity: 0.45,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 22,
          }}
          className="absolute"
        >
          <CertificateCard
            certificate={left}
          />
        </motion.div>

        {/* CENTER */}

        <AnimatePresence mode="wait">

          <motion.div
            key={center.id}
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) previous();
              if (info.offset.x < -100) next();
            }}
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 22,
            }}
            className="z-20 touch-pan-y"
          >
            <CertificateCard
              certificate={center}
              active
            />
          </motion.div>

        </AnimatePresence>

        {/* RIGHT */}

        <motion.div
          key={right.id}
          animate={{
            x: offset,
            scale,
            rotate: shouldReduceMotion ? 0 : 14,
            opacity: 0.45,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 22,
          }}
          className="absolute"
        >
          <CertificateCard
            certificate={right}
          />
        </motion.div>

      </div>

      {/* Right Arrow */}

      <button
        onClick={next}
        aria-label="Next certificate"
        className="absolute right-1 z-30 rounded-full border border-white/10 bg-slate-900/70 p-2 backdrop-blur transition hover:scale-110 sm:right-4 sm:p-3"
      >
        <ChevronRight className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5" />
      </button>

      {/* Progress Dots */}

      <div className="absolute -bottom-1 flex gap-2 sm:-bottom-3 sm:gap-3">
        {certificates.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to certificate ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
              current === i
                ? "w-8 bg-cyan-400 sm:w-10"
                : "w-1.5 bg-white/20 sm:w-2"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
