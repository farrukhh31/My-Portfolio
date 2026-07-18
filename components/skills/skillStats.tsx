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
    <div className="mb-10 flex flex-wrap justify-center gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="glass rounded-2xl border border-white/10 px-5 py-3 text-center"
        >
          <p className="text-2xl font-black text-white">{stat.value}</p>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
