"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* Avoid hydration mismatch: next-themes only knows the real
     theme after mount (it reads localStorage on the client). */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="
          h-9
          w-16

          rounded-full

          border
          border-white/10

          bg-white/4
        "
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark and light mode"
      onClick={toggle}
      className="
        group

        relative

        flex
        h-9
        w-16
        items-center

        rounded-full
        border
        border-white/10

        bg-white/4

        px-1

        transition-colors
        duration-300

        hover:border-purple-500/40
        hover:bg-purple-500/10

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-400/60
      "
    >
      {/* Track glow */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0

          rounded-full

          opacity-0

          shadow-[0_0_20px_rgba(34,211,238,.35)]

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      {/* Sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="
          relative
          z-10

          flex
          h-7
          w-7
          items-center
          justify-center

          rounded-full

          bg-linear-to-br
          from-purple-500
          via-indigo-500
          to-cyan-500

          text-white

          shadow-[0_0_15px_rgba(139,92,246,0.45)]
        "
        style={{ marginLeft: isDark ? 0 : "auto" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Moon size={14} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Sun size={14} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}