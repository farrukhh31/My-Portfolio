"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1500,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  // Animate only when the component enters the viewport
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);

      // Ease Out Cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = value * eased;

      setCount(Number(current.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration, decimals]);

  return (
    <motion.span
      ref={ref}
      initial={{
        opacity: 0,
        y: 15,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        duration: 0.5,
      }}
      className="font-bold text-4xl tracking-tight"
    >
      {count}
      {suffix}
    </motion.span>
  );
}