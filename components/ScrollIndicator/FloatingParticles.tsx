"use client";

import { motion } from "framer-motion";

const particles = [
  {
    id: 1,
    left: "42%",
    top: "8%",
    size: 5,
    duration: 6,
    delay: 0,
  },
  {
    id: 2,
    left: "58%",
    top: "22%",
    size: 3,
    duration: 5,
    delay: 1,
  },
  {
    id: 3,
    left: "38%",
    top: "38%",
    size: 4,
    duration: 7,
    delay: 2,
  },
  {
    id: 4,
    left: "60%",
    top: "55%",
    size: 6,
    duration: 6,
    delay: 0.5,
  },
  {
    id: 5,
    left: "45%",
    top: "72%",
    size: 4,
    duration: 8,
    delay: 2,
  },
  {
    id: 6,
    left: "55%",
    top: "88%",
    size: 5,
    duration: 7,
    delay: 1,
  },
];

export default function FloatingParticles() {
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0.15, 0.7, 0.15],

            x: [0, 10, -8, 0],

            y: [0, -15, 10, 0],

            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          className="
            absolute
            rounded-full
            bg-cyan-300
            blur-[1px]
            shadow-[0_0_12px_rgba(34,211,238,.9)]
            pointer-events-none
          "
        />
      ))}
    </>
  );
}