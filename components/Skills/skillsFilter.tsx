"use client";

import { motion } from "framer-motion";

import { CategoryFilter, Skill } from "./types";
import { CATEGORY_ORDER, categoryColor } from "./categoryTheme";

type Props = {
  skills: Skill[];
  selected: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
};

export default function SkillFilters({ skills, selected, onChange }: Props) {
  const filters: CategoryFilter[] = [
    "All",
    ...CATEGORY_ORDER.filter((cat) => skills.some((s) => s.category === cat)),
  ];

  return (
    <div className="mb-12 flex flex-wrap justify-center gap-3">
      {filters.map((filter) => {
        const count =
          filter === "All"
            ? skills.length
            : skills.filter((s) => s.category === filter).length;

        const isActive = selected === filter;
        const color = filter === "All" ? "#22d3ee" : categoryColor(filter);

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className="relative isolate overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300"
          >
            {isActive ? (
              <motion.span
                layoutId="filter-pill"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: color, boxShadow: `0 0 25px ${color}73` }}
              />
            ) : (
              <span className="glass absolute inset-0 -z-10 rounded-full border border-white/10" />
            )}

            <span
              className={`relative z-10 flex items-center gap-2 ${
                isActive ? "text-slate-950" : "text-slate-300"
              }`}
            >
              {filter}
              <span
                className={`rounded-full px-1.5 text-xs ${
                  isActive ? "bg-slate-950/20" : "bg-white/10"
                }`}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
