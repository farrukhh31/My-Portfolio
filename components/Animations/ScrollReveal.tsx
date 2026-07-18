"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}


export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 60,
  className = "",
}: RevealProps) {

  return (
    <motion.div
      className={className}

      initial={{
        opacity: 0,
        y,
        filter: "blur(12px)",
      }}

      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}

      viewport={{
        once: true,
        amount: 0.2,
      }}

      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}