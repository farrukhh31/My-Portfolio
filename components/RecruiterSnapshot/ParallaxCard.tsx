"use client";

import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  y: MotionValue<number>;
  delay?: number;
}

export default function ParallaxCard({
  children,
  y,
  delay = 0,
}: Props) {
  return (
    <motion.div
      style={{ y }}
      initial={{
        opacity: 0,
        scale: 0.96,
        filter: "blur(12px)",
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.8,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}