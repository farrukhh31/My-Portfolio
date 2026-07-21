"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/Cursor/Magnetic";

export default function LaunchButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Magnetic>
      <motion.button
        onClick={onClick}
        whileTap={{
          scale: .95,
        }}
        className="group relative mt-8 overflow-hidden rounded-full bg-linear-to-r from-cyan-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_45px_rgba(34,211,238,.3)] sm:mt-10 sm:px-10 sm:py-4 sm:text-base"
      >
        <span className="relative z-10 flex items-center gap-3">
          Enter Portfolio

          <motion.div
            whileHover={{
              x: 5,
            }}
          >
            <ArrowRight size={20} />
          </motion.div>
        </span>

        <motion.div
          animate={{
            x: [
              "-100%",
              "100%",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
        />
      </motion.button>
    </Magnetic>
  );
}