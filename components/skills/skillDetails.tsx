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
        className="glass relative overflow-hidden rounded-3xl p-8"
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: color }}
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.3em]" style={{ color }}>
              {skill.category}
            </p>

            <h2 className="mt-3 text-4xl font-black text-white">
              {skill.name}
            </h2>
          </div>

          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10"
            style={{ background: `${color}1a`, boxShadow: `0 0 30px ${color}40` }}
          >
            {Icon && <Icon size={30} color={color} />}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <ProficiencyRing value={skill.proficiency} color={color} />

          <div>
            <h4 className="mb-1 text-sm" style={{ color }}>
              Level
            </h4>
            <p className="text-lg text-white">{skill.level}</p>
            <p className="mt-2 text-sm text-slate-400">{skill.experience}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h4 className="mb-2 text-sm" style={{ color }}>
              Description
            </h4>
            <p className="leading-8 text-slate-400">{skill.description}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm" style={{ color }}>
              Related Projects
            </h4>
            <div className="flex flex-wrap gap-3">
              {skill.projects.map((project) => (
                <span
                  key={project}
                  className="rounded-full px-4 py-2 text-sm"
                  style={{ background: `${color}1a`, color }}
                >
                  {project}
                </span>
              ))}
            </div>
          </div>

          {skill.related.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm" style={{ color }}>
                Related Technologies
              </h4>
              <div className="flex flex-wrap gap-3">
                {skill.related.map((id) => {
                  const target = allSkills.find((s) => s.id === id);
                  if (!target) return null;

                  return (
                    <button
                      key={id}
                      onClick={() => onSelect(target)}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
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
