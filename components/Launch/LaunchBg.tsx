"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 17) % 100,
    top: (i * 29) % 100,
    duration: 3 + (i % 5),
    delay: i * 0.08,
  }));
}

function LaunchBackground() {
  const [particleCount, setParticleCount] = useState(40);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setParticleCount(mq.matches ? 16 : 40);
  }, []);

  const particles = buildParticles(particleCount);

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Grid */}

      <div
        className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),
        linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]
        bg-size-[48px_48px]
        "
      />

      {/* Center Glow */}

      <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[90px] sm:h-175 sm:w-175 sm:blur-[180px]" />

      {/* Cyan Beam */}

      <motion.div
        animate={{
          x: [-150, 150, -150],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        left-1/4
        top-[-20%]
        h-150
        w-35
        sm:h-225
        sm:w-55
        rotate-12
        bg-cyan-400/10
        blur-[70px]
        sm:blur-[120px]
        "
      />

      {/* Purple Beam */}

      <motion.div
        animate={{
          x: [120, -120, 120],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        right-0
        bottom-[-20%]
        h-137.5
        w-35
        sm:h-212.5
        sm:w-55
        -rotate-12
        bg-violet-500/10
        blur-[70px]
        sm:blur-[120px]
        "
      />

      {/* Aurora Blob 1 */}

      <motion.div
        animate={{
          x: [-80, 100, -80],
          y: [-40, 40, -40],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        left-0
        top-0
        h-75
        w-75
        sm:h-125
        sm:w-125
        rounded-full
        bg-cyan-500/15
        blur-[90px]
        sm:blur-[180px]
        "
      />

      {/* Aurora Blob 2 */}

      <motion.div
        animate={{
          x: [80, -100, 80],
          y: [30, -30, 30],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        right-0
        bottom-0
        h-90
        w-90
        sm:h-150
        sm:w-150
        rounded-full
        bg-violet-500/15
        blur-[100px]
        sm:blur-[200px]
        "
      />

      {/* Floating Particles */}

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.8, 1],
            y: [0, -18, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          className="absolute h-1 w-1 rounded-full bg-cyan-300"
        />
      ))}

      {/* Vignette */}

      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(3,7,18,.75)_100%)]" />
    </div>
  );
}

export default memo(LaunchBackground);
