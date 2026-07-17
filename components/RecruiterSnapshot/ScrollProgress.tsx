"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.25,
  });

  const y = useTransform(progress, [0, 1], [0, 1000]);

  return (
    <div
      className="
        hidden
        xl:flex

        fixed
        right-10
        top-1/2
        -translate-y-1/2

        h-[420px]
        w-8

        justify-center

        pointer-events-none

        z-50
      "
    >
      {/* Background Line */}
      <div
        className="
          absolute
          h-full
          w-px

          bg-white/10
        "
      />

      {/* Progress Line */}
      <motion.div
        style={{
          scaleY: progress,
          transformOrigin: "top",
        }}
        className="
          absolute
          top-0

          h-full
          w-px

          bg-gradient-to-b
          from-cyan-300
          via-cyan-400
          to-blue-500
        "
      />

      {/* Orb */}
      <motion.div
        style={{ y }}
        className="
          absolute

          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            h-5
            w-5
            rounded-full

            border
            border-cyan-300/60

            bg-cyan-300/30

            backdrop-blur-xl
          "
        />

        <motion.div
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.35, 0, 0.35],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            absolute

            h-8
            w-8

            rounded-full

            border

            border-cyan-300/40
          "
        />
      </motion.div>

      {/* Milestones */}
      {[0.2, 0.45, 0.7, 0.92].map((m, i) => (
        <div
          key={i}
          className="
            absolute

            h-2
            w-2

            rounded-full

            bg-white/25
          "
          style={{
            top: `${m * 100}%`,
          }}
        />
      ))}
    </div>
  );
}