"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { Skill } from "./types";
import SkillCard from "./skillCard";

type Props = {
  skills: Skill[];
  selectedSkill: Skill;
  onSelect: (skill: Skill) => void;
};

export default function SkillsFeatured({ skills, selectedSkill, onSelect }: Props) {
  const top = useMemo(
    () =>
      [...skills]
        .sort((a, b) => b.proficiency - a.proficiency)
        .slice(0, 4),
    [skills]
  );

  return (
    <div className="mt-10 sm:mt-14">
      <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-slate-400 sm:mb-6 sm:text-sm sm:tracking-[0.3em]">
        Most relied-on, day to day
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {top.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <SkillCard
              skill={skill}
              selected={skill.id === selectedSkill.id}
              onSelect={() => onSelect(skill)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
