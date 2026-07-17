"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Counter() {
  const progress = useMotionValue(0);

  const smoothProgress = useSpring(progress, {
    stiffness: 60,
    damping: 18,
  });

  const rounded = useTransform(smoothProgress, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    progress.set(100);
  }, [progress]);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Counter */}

      <motion.span className="text-6xl font-black tracking-tight text-white">
        {rounded}
      </motion.span>

      {/* Percentage */}

      <p className="uppercase tracking-[0.45em] text-cyan-400">
        Loading Portfolio
      </p>
    </div>
  );
}