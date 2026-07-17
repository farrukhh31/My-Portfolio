"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { Skill, SkillCategory } from "./types";
import SkillNode from "./skillNode";
import SkillConnections from "./skillConnection";
import useParallax from "@/hooks/useParallax";

type Props = {
  skills: Skill[];
  selectedSkill: Skill;
  setSelectedSkill: (skill: Skill) => void;
  category: SkillCategory;
};

export default function SkillGraph({
  skills,
  selectedSkill,
  setSelectedSkill,
  category,
}: Props) {
  const offset = useParallax();

  const filtered =
    category === "All"
      ? skills
      : skills.filter((skill) => skill.category === category);

  // Generate stars only once
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <motion.div
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 25,
      }}
      className="glass relative h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-xl lg:h-[700px]"
    >
      {/* ================= Background ================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.12),transparent_70%)]" />

      {/* ================= Animated Nebula ================= */}

      <motion.div
        animate={{
          x: [-30, 30, -30],
          y: [0, 25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [20, -20, 20],
          y: [20, -20, 20],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-10 top-20 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-sky-500/10 blur-[120px]"
      />

      {/* ================= Stars ================= */}

      {stars.map((star) => (
        <motion.div
          key={star.id}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          className="absolute rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,.8)]"
        />
      ))}

      {/* ================= Connection Lines ================= */}

      <SkillConnections
        skills={filtered}
        selectedSkill={selectedSkill}
      />

      {/* ================= Skill Nodes ================= */}

      {filtered.map((skill) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          selected={selectedSkill.id === skill.id}
          onClick={() => setSelectedSkill(skill)}
        />
      ))}

      {/* ================= Empty State ================= */}

      {filtered.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-slate-500">
            No skills found in this category.
          </p>
        </div>
      )}

      {/* ================= Bottom Glow ================= */}

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
    </motion.div>
  );
}