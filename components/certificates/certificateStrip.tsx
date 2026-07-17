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
        mt-10
        flex
        justify-center
      "
    >
      <div
        className="
          flex
          max-w-full
          gap-5
          overflow-x-auto
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-4
          backdrop-blur-xl

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