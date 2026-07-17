"use client";

import { motion } from "framer-motion";
import { HiChevronLeft } from "react-icons/hi2";

interface ToggleButtonProps {
  open: boolean;
  onClick: () => void;
}

export default function ToggleButton({
  open,
  onClick,
}: ToggleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className="
        absolute
        -left-5
        top-8
        z-50
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-cyan-400/30
        bg-slate-900/90
        backdrop-blur-xl
        shadow-[0_0_20px_rgba(34,211,238,0.35)]
        transition-all
        duration-300
        hover:border-cyan-300
        hover:shadow-[0_0_35px_rgba(34,211,238,0.65)]
      "
    >
      <motion.div
        animate={{
          rotate: open ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
      >
        <HiChevronLeft
          size={22}
          className="text-cyan-300"
        />
      </motion.div>
    </motion.button>
  );
}