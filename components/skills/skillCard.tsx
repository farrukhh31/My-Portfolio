"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { Skill } from "./types";
import { iconMap } from "./iconMap";
import { categoryColor } from "./categoryTheme";

type Props = {
  skill: Skill;
  selected: boolean;
  onSelect: () => void;
};

export default function SkillCard({ skill, selected, onSelect }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const color = categoryColor(skill.category);
  const Icon = iconMap[skill.icon as keyof typeof iconMap];

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), {
    stiffness: 220,
    damping: 22,
  });

  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glowBackground = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, ${color}33, transparent 70%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    px.set((event.clientX - bounds.left) / bounds.width);
    py.set((event.clientY - bounds.top) / bounds.height);
  }

  function handlePointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onSelect}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`glass group relative w-full overflow-hidden rounded-2xl border p-6 text-left transition-colors duration-300 ${
        selected
          ? "border-white/30"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <motion.span
        aria-hidden
        style={{ background: glowBackground }}
        className="pointer-events-none absolute inset-0"
      />

      <span className="relative flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${color}1a`, boxShadow: `0 0 30px ${color}40` }}
        >
          {Icon && <Icon size={24} color={color} />}
        </span>

        <span className="min-w-0">
          <span className="block truncate font-semibold text-white">
            {skill.name}
          </span>
          <span className="block text-xs uppercase tracking-wider text-slate-400">
            {skill.category}
          </span>
        </span>
      </span>

      <span className="relative mt-5 block">
        <span className="block h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block h-full rounded-full"
            style={{ background: color }}
          />
        </span>
        <span className="mt-2 block text-xs text-slate-400">
          {skill.level} · {skill.experience}
        </span>
      </span>
    </motion.button>
  );
}
