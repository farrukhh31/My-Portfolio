"use client";

import { motion } from "framer-motion";
import { Skill } from "./types";

type Props = {
  skills: Skill[];
  selectedSkill: Skill;
};

export default function SkillConnections({
  skills,
  selectedSkill,
}: Props) {
  const selected = skills.find((s) => s.id === selectedSkill.id);

  if (!selected) return null;

  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      preserveAspectRatio="none"
    >
      {selected.related.map((id) => {
        const target = skills.find((s) => s.id === id);

        if (!target) return null;

        return (
          <g key={id}>
            {/* Line */}

            <motion.line
              x1={`${selected.x}%`}
              y1={`${selected.y}%`}
              x2={`${target.x}%`}
              y2={`${target.y}%`}
              stroke="#22d3ee"
              strokeWidth="2"
              strokeOpacity=".4"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: .8,
              }}
            />

            {/* Pulse */}

            <motion.circle
              r="4"
              fill="#22d3ee"
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path={`M ${selected.x} ${selected.y} L ${target.x} ${target.y}`}
              />
            </motion.circle>
          </g>
        );
      })}
    </svg>
  );
}