"use client";

import { motion } from "framer-motion";

import type { Certificate } from "./types";
import CertificateThumbnail from "./certificateThumbnail";

type Props = {
  certificates: Certificate[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function CertificateStrip({
  certificates,
  activeIndex,
  onSelect,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        mt-6
        flex
        justify-center
        sm:mt-10
      "
    >
      <div
        className="
          flex
          max-w-full
          gap-3
          overflow-x-auto
          rounded-2xl
          border
          border-white/10
          bg-white/3
          p-3
          backdrop-blur-xl
          sm:gap-5
          sm:rounded-3xl
          sm:p-4

          scrollbar-hide
        "
      >
        {certificates.map((certificate, index) => (
          <CertificateThumbnail
            key={certificate.id}
            certificate={certificate}
            active={index === activeIndex}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </motion.div>
  );
}
