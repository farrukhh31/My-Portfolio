"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import CertificateCard from "./certificateCard";
import type { Certificate } from "./types";

type Props = {
  certificates: Certificate[];
};

export default function CertificateCarousel({
  certificates,
}: Props) {
  const [current, setCurrent] = useState(0);

  const previous = () =>
    setCurrent((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1
    );

  const next = () =>
    setCurrent((prev) =>
      prev === certificates.length - 1 ? 0 : prev + 1
    );

  const getIndex = (offset: number) => {
    return (
      (current + offset + certificates.length) %
      certificates.length
    );
  };

  const left = certificates[getIndex(-1)];
  const center = certificates[current];
  const right = certificates[getIndex(1)];

  return (
    <div className="relative mx-auto flex max-w-7xl items-center justify-center py-16">

      {/* Left Arrow */}

      <button
        onClick={previous}
        className="absolute left-4 z-30 rounded-full border border-white/10 bg-slate-900/70 p-3 backdrop-blur transition hover:scale-110"
      >
        <ChevronLeft className="text-cyan-400" />
      </button>

      <div className="relative flex h-[520px] w-full items-center justify-center overflow-visible">

        {/* LEFT */}

        <motion.div
          key={left.id}
          animate={{
            x: -260,
            scale: 0.82,
            rotate: -14,
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
              if (info.offset.x > 120) previous();
              if (info.offset.x < -120) next();
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
            className="z-20"
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
            x: 260,
            scale: 0.82,
            rotate: 14,
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
        className="absolute right-4 z-30 rounded-full border border-white/10 bg-slate-900/70 p-3 backdrop-blur transition hover:scale-110"
      >
        <ChevronRight className="text-cyan-400" />
      </button>

      {/* Progress Dots */}

      <div className="absolute -bottom-3 flex gap-3">
        {certificates.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i
                ? "w-10 bg-cyan-400"
                : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>

    </div>
  );
}