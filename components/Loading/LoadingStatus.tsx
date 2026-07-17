"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LOADING_MESSAGES } from "./loadingData";

type Props = {
  progress: number;
};

export default function LoadingStatus({ progress }: Props) {
  const index = Math.min(
    Math.round((progress / 100) * LOADING_MESSAGES.length),
    LOADING_MESSAGES.length - 1
  );

  return (
    <div className="mt-10 h-7 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{
            opacity: 0,
            y: 18,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -18,
            filter: "blur(8px)",
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            text-center
            text-sm
            tracking-[0.35em]
            uppercase
            text-white/65
          "
        >
          {LOADING_MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}