"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.97,
        filter: "blur(12px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
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
      whileHover={{
        borderColor: "rgba(34,211,238,.22)",
        boxShadow:
          "0 25px 90px rgba(0,0,0,.45), 0 0 45px rgba(34,211,238,.12)",
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[30px]

        border
        border-white/10

        bg-white/[0.04]

        backdrop-blur-[30px]

        shadow-[0_20px_70px_rgba(0,0,0,.45)]

        transition-all
        duration-500

        p-6

        ${className}
      `}
    >
      {/* Animated Border */}
      <motion.div
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-0
          rounded-[30px]
          opacity-60
          p-[1px]
          bg-[linear-gradient(120deg,rgba(34,211,238,.45),rgba(255,255,255,.05),rgba(59,130,246,.4),rgba(255,255,255,.05),rgba(34,211,238,.45))]
          bg-[length:250%_250%]
        "
      >
        <div className="h-full w-full rounded-[29px] bg-[#07111f]/70 backdrop-blur-[30px]" />
      </motion.div>

      {/* Frosted Glass */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-br
          from-white/[0.12]
          via-white/[0.03]
          to-transparent
        "
      />

      {/* Inner Border */}
      <div
        className="
          absolute
          inset-px
          rounded-[29px]
          border
          border-white/5
        "
      />

      {/* Aurora Left */}
      <motion.div
        animate={{
          x: [-40, 25, -40],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-36
          -left-36
          h-80
          w-80
          rounded-full
          bg-cyan-400/18
          blur-[100px]
        "
      />

      {/* Aurora Right */}
      <motion.div
        animate={{
          x: [30, -25, 30],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-36
          -right-36
          h-80
          w-80
          rounded-full
          bg-blue-500/15
          blur-[100px]
        "
      />

      {/* Ambient Breathing Glow */}
      <motion.div
        animate={{
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute
          inset-0
          bg-cyan-400/5
        "
      />

      {/* Moving Glass Reflection */}
      <motion.div
        animate={{
          x: ["-140%", "150%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          top-0
          h-full
          w-1/2

          rotate-12

          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent

          blur-2xl
        "
      />

      {/* Top Highlight */}
      <div
        className="
          absolute
          left-8
          right-8
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-white/70
          to-transparent
        "
      />

      {/* Noise Texture */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          mix-blend-overlay
          [background-image:radial-gradient(rgba(255,255,255,.9)_0.7px,transparent_0.7px)]
          [background-size:8px_8px]
        "
      />

      {/* Hover Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-[30px]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-cyan-400/5
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}