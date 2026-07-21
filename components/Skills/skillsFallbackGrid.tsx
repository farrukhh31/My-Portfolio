"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Skill } from "./types";
import SkillCard from "./skillCard";

type Props = {
  skills: Skill[];
  selectedSkill: Skill;
  onSelect: (skill: Skill) => void;
};

export default function SkillsFallbackGrid({
  skills,
  selectedSkill,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
          >
            <SkillCard
              skill={skill}
              selected={skill.id === selectedSkill.id}
              onSelect={() => onSelect(skill)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {skills.length === 0 && (
        <p className="col-span-full py-16 text-center text-slate-500">
          No skills found in this category.
        </p>
      )}
    </div>
  );
}
