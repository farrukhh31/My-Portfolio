"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <AnimatePresence>

      {show && (
        <motion.button
          onClick={scrollTop}
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.7,
            y: 30,
          }}
          whileHover={{
            scale: 1.1,
            y: -5,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
          fixed
          bottom-8
          right-8
          z-[999]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-cyan-400/20
          bg-slate-900/80
          backdrop-blur-xl
          shadow-[0_0_35px_rgba(34,211,238,.25)]
          transition
          "
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ArrowUp
              size={22}
              className="text-cyan-300"
            />
          </motion.div>

          {/* Glow */}

          <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />
        </motion.button>
      )}

    </AnimatePresence>
  );
}