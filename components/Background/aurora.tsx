"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Aurora() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 80, -80, 0],
                y: [0, -40, 40, 0],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        pointer-events-none
        absolute
        left-[-15%]
        top-[-10%]
        h-55
        w-55
        rounded-full
        bg-cyan-500/20
        blur-[60px]
        -z-20
        transform-gpu
        will-change-transform
        sm:h-80
        sm:w-[320px]
        sm:blur-[100px]
        lg:h-125
        lg:w-125
        lg:blur-[140px]
        "
      />

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -100, 70, 0],
                y: [0, 40, -40, 0],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        pointer-events-none
        absolute
        right-[-15%]
        bottom-[-10%]
        h-55
        w-55
        rounded-full
        bg-violet-500/20
        blur-[65px]
        -z-20
        transform-gpu
        will-change-transform
        sm:h-80
        sm:w-80
        sm:blur-[105px]
        lg:h-125
        lg:w-125
        lg:blur-[150px]
        "
      />
    </>
  );
}