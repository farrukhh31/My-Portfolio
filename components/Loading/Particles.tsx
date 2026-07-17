"use client";

import { motion } from "framer-motion";

const particles = [...Array(18)];

export default function Particles() {
  return (
    <>
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const delay = Math.random() * 4;

        return (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.6, 1.2, 0.6],
              y: [0, -30, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            className="
              absolute

              h-1.5
              w-1.5

              rounded-full

              bg-cyan-300

              shadow-[0_0_12px_rgba(34,211,238,.8)]
            "
          />
        );
      })}
    </>
  );
}