"use client";

import { motion } from "framer-motion";
import { Skill } from "./types";
import { iconMap } from "./iconMap";

type Props = {
  skill: Skill;
  selected: boolean;
  onClick: () => void;
};

export default function SkillNode({
  skill,
  selected,
  onClick,
}: Props) {
  const Icon = iconMap[skill.icon as keyof typeof iconMap];

  return (
    <motion.button
      aria-label={skill.name}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: selected ? 1.15 : 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: {
          duration: 0.5,
        },
        scale: {
          type: "spring",
          stiffness: 250,
          damping: 18,
        },
        y: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.25,
      }}
      whileTap={{
        scale: 0.95,
      }}
      style={{
        left: `${skill.x}%`,
        top: `${skill.y}%`,
      }}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
    >
      {/* Glow */}
      <motion.div
        animate={{
          scale: selected ? [1, 1.4, 1] : 1,
          opacity: selected ? [0.5, 1, 0.5] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute inset-0 rounded-full bg-cyan-400 blur-xl"
      />

      {/* Main Node */}
      <div
        className={`
          relative flex h-16 w-16 items-center justify-center rounded-full
          border backdrop-blur-xl transition-all duration-300

          ${
            selected
              ? "border-cyan-400 bg-cyan-400/20 shadow-[0_0_45px_rgba(34,211,238,.75)]"
              : "border-white/10 bg-slate-900/70 hover:border-cyan-400/50 hover:bg-slate-800/80"
          }
        `}
      >
        <Icon
          size={28}
          className={`transition-transform duration-300 ${
            selected
              ? "text-cyan-300"
              : "text-slate-300 group-hover:text-cyan-300"
          } group-hover:scale-110`}
        />
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-sm text-white backdrop-blur-xl"
      >
        {skill.name}
      </motion.div>
    </motion.button>
  );
}