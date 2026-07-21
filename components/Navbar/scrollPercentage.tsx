"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollPercentage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;

      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }

      const percent = Math.min(
        100,
        Math.max(0, Math.round((scrollTop / scrollHeight) * 100))
      );

      setProgress(percent);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <motion.div
      key={progress}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="
        flex
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-white/5
        px-3
        py-1
        text-sm
        font-semibold
        text-zinc-300
        backdrop-blur-md
        min-w-15
      "
    >
      {progress}%
    </motion.div>
  );
}