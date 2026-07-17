"use client";

import { SkillCategory } from "./types";

const filters: SkillCategory[] = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Game Development",
];

type Props = {
  selected: SkillCategory;
  onChange: (category: SkillCategory) => void;
};

export default function SkillFilters({
  selected,
  onChange,
}: Props) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`rounded-full px-6 py-3 transition-all duration-300 ${
            selected === filter
              ? "bg-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(34,211,238,.45)]"
              : "glass border border-white/10 hover:border-cyan-400/40"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}