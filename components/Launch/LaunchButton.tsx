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
        className="group relative mt-10 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-10 py-4 font-semibold text-white shadow-[0_0_45px_rgba(34,211,238,.3)]"
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
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </motion.button>
    </Magnetic>
  );
}