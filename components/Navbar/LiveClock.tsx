"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

export default function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString("en-PK", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 22,
      }}
      className="
        group
        relative

        flex
        items-center
        gap-3

        overflow-hidden

        rounded-full

        border
        border-white/10

        bg-white/5

        px-4
        py-2

        backdrop-blur-xl

        transition-all
        duration-300

        hover:border-purple-500/40
        hover:bg-purple-500/10
        hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]
      "
    >
      {/* Hover Glow */}
      <div
        className="
          absolute
          inset-0

          opacity-0

          bg-linear-to-r
          from-purple-500/10
          via-transparent
          to-cyan-500/10

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      <motion.div
        animate={{
          rotate: [0, 8, 0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <Clock3
          size={16}
          className="text-cyan-400"
        />
      </motion.div>

      <span
        className="
          relative
          z-10

          font-mono
          text-sm
          font-semibold

          tracking-[0.18em]

          text-white
        "
      >
        {time}
      </span>
    </motion.div>
  );
}