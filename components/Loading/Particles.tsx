"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Deterministic-enough pseudo-random layout (avoids hydration
// mismatches better than Math.random() would, since this only runs
// client-side after mount anyway).
function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    duration: 6 + (i % 5) * 1.6,
    delay: (i % 7) * 0.6,
  }));
}

function Particles() {
  // Fewer particles on small/low-power screens — this whole tree
  // renders during the busiest moment of the page lifecycle (initial
  // hydration), so trimming it here is where it matters most.
  const [count, setCount] = useState(18);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setCount(mq.matches ? 8 : 18);
  }, []);

  const particles = buildParticles(count);

  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
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
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
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
      ))}
    </>
  );
}

export default memo(Particles);
