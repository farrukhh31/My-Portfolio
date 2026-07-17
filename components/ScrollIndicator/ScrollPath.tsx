"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { RefObject } from "react";

type Props = {
  progress: MotionValue<number>;
  pathRef: RefObject<SVGPathElement | null>;
  pathLength: number;
};

const PATH = `
M50 20
C30 120,70 220,50 320
C30 420,70 520,50 620
C30 720,70 820,50 980
`;

export default function ScrollPath({
  progress,
  pathRef,
  pathLength,
}: Props) {

  // Animate the cyan path as the page scrolls
  const dashOffset = useTransform(
    progress,
    [0, 1],
    [pathLength, 0]
  );

  return (
    <svg
      className="absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Cyan Glow */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />

          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient */}
        <linearGradient
          id="pathGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="#67e8f9"
          />

          <stop
            offset="50%"
            stopColor="#22d3ee"
          />

          <stop
            offset="100%"
            stopColor="#06b6d4"
          />
        </linearGradient>
      </defs>

      {/* Background Path */}

      <path
        d={PATH}
        fill="none"
        stroke="rgba(255,255,255,.10)"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Soft Glow */}

      <path
        d={PATH}
        fill="none"
        stroke="rgba(34,211,238,.18)"
        strokeWidth={12}
        strokeLinecap="round"
      />

      {/* Animated Progress */}

      <motion.path
        ref={pathRef}
        d={PATH}
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        style={{
          strokeDashoffset: dashOffset,
          filter: "url(#glow)",
        }}
      />
    </svg>
  );
}