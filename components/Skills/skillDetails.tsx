"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Skill } from "./types";
import { iconMap } from "./iconMap";
import { categoryColor } from "./categoryTheme";

type Props = {
  skill: Skill;
  allSkills: Skill[];
  onSelect: (skill: Skill) => void;
};

function ProficiencyRing({ value, color }: { value: number; color: string }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 84 84" className="h-20 w-20 -rotate-90">
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth="7"
        />
        <motion.circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
        {value}%
      </span>
    </div>
  );
}

export default function SkillDetails({ skill, allSkills, onSelect }: Props) {
  const Icon = iconMap[skill.icon as keyof typeof iconMap];
  const color = categoryColor(skill.category);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={skill.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35 }}
        className="glass relative overflow-hidden rounded-2xl p-5 sm:rounded-3xl sm:p-8"
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: color }}
        />

        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <p
              className="truncate text-xs uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.3em]"
              style={{ color }}
            >
              {skill.category}
            </p>

            <h2 className="mt-2 truncate text-2xl font-black text-white sm:mt-3 sm:text-4xl">
              {skill.name}
            </h2>
          </div>

          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 sm:h-16 sm:w-16 sm:rounded-2xl"
            style={{ background: `${color}1a`, boxShadow: `0 0 30px ${color}40` }}
          >
            {Icon && <Icon size={22} color={color} />}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 sm:mt-8 sm:gap-6">
          <ProficiencyRing value={skill.proficiency} color={color} />

          <div>
            <h4 className="mb-1 text-xs sm:text-sm" style={{ color }}>
              Level
            </h4>
            <p className="text-base text-white sm:text-lg">{skill.level}</p>
            <p className="mt-1 text-xs text-slate-400 sm:mt-2 sm:text-sm">{skill.experience}</p>
          </div>
        </div>

        <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
          <div>
            <h4 className="mb-2 text-xs sm:text-sm" style={{ color }}>
              Description
            </h4>
            <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {skill.description}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs sm:text-sm" style={{ color }}>
              Related Projects
            </h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {skill.projects.map((project) => (
                <span
                  key={project}
                  className="rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
                  style={{ background: `${color}1a`, color }}
                >
                  {project}
                </span>
              ))}
            </div>
          </div>

          {skill.related.length > 0 && (
            <div>
              <h4 className="mb-3 text-xs sm:text-sm" style={{ color }}>
                Related Technologies
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skill.related.map((id) => {
                  const target = allSkills.find((s) => s.id === id);
                  if (!target) return null;

                  return (
                    <button
                      key={id}
                      onClick={() => onSelect(target)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:border-white/30 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
                    >
                      {target.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
