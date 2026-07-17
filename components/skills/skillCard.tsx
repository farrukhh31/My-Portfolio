"use client";

import { motion } from "framer-motion";

type Skill = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type Props = {
  title: string;
  skills: Skill[];
};

export default function SkillCard({ title, skills }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        rotateX: 3,
        rotateY: -3,
      }}
      transition={{ duration: 0.4 }}
      className="glass rounded-3xl border border-white/10 p-8 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,.18)]"
    >
      <h3 className="mb-8 text-2xl font-bold text-white">
        {title}
      </h3>

      <div className="space-y-5">
        {skills.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="group flex items-center gap-4 rounded-xl p-2 transition hover:bg-white/5"
          >
            <Icon
              size={24}
              className="text-cyan-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />

            <span className="text-slate-300">
              {name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}