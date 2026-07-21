"use client";

import { motion } from "framer-motion";

import { Skill } from "./types";

type Props = { skills: Skill[] };

export default function SkillStats({ skills }: Props) {
  const categories = new Set(skills.map((s) => s.category)).size;
  const advanced = skills.filter((s) => s.level === "Advanced").length;
  const avgProficiency = Math.round(
    skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length
  );

  const stats = [
    { label: "Technologies", value: skills.length },
    { label: "Categories", value: categories },
    { label: "Advanced level", value: advanced },
    { label: "Avg. proficiency", value: `${avgProficiency}%` },
  ];

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3 sm:mb-10 sm:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="glass rounded-xl border border-white/10 px-4 py-2.5 text-center sm:rounded-2xl sm:px-5 sm:py-3"
        >
          <p className="text-xl font-black text-white sm:text-2xl">{stat.value}</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 sm:text-xs">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
