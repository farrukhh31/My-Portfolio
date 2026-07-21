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
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = {
  skill: Skill;
  selected: boolean;
  onSelect: () => void;
};

export default function SkillCard({ skill, selected, onSelect }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const color = categoryColor(skill.category);
  const Icon = iconMap[skill.icon as keyof typeof iconMap];

  // Coarse pointers (touch) can't hover, and pointermove-while-dragging
  // fights the browser's own scroll/tap handling — skip the 3D tilt there
  // so taps land instantly instead of feeling laggy.
  const isTouch = useMediaQuery("(pointer: coarse)");

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
    if (isTouch) return;
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
      style={isTouch ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={isTouch ? undefined : { scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`glass group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 sm:p-6 ${
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

      <span className="relative flex items-center gap-3 sm:gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12"
          style={{ background: `${color}1a`, boxShadow: `0 0 30px ${color}40` }}
        >
          {Icon && <Icon size={22} color={color} />}
        </span>

        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-white sm:text-base">
            {skill.name}
          </span>
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 sm:text-xs">
            {skill.category}
          </span>
        </span>
      </span>

      <span className="relative mt-4 block sm:mt-5">
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
        <span className="mt-2 block text-[11px] text-slate-400 sm:text-xs">
          {skill.level} · {skill.experience}
        </span>
      </span>
    </motion.button>
  );
}
