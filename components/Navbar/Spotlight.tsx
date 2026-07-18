"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightProps {
  className?: string;
}

export default function Spotlight({
  className = "",
}: SpotlightProps) {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);

  const background = useMotionTemplate`
    radial-gradient(
      220px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.16),
      rgba(255,255,255,0.08) 35%,
      transparent 75%
    )
  `;

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mouseX.set(-999);
        mouseY.set(-999);
      }}
      style={{
        background,
      }}
      className={`
        absolute
        inset-0
        rounded-full
        pointer-events-none
        transition-opacity
        duration-300
        ${className}
      `}
    />
  );
}