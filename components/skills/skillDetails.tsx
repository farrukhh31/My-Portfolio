"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Skill } from "./types";

type Props = {
  skill: Skill;
};

export default function SkillDetails({
  skill,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={skill.id}
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: -40,
        }}
        transition={{
          duration: .35,
        }}
        className="glass rounded-3xl p-8"
      >
        <p className="uppercase tracking-[0.3em] text-cyan-400">
          {skill.category}
        </p>

        <h2 className="mt-3 text-4xl font-black">
          {skill.name}
        </h2>

        <div className="mt-8 space-y-6">

          <div>

            <h4 className="mb-2 text-cyan-400">
              Level
            </h4>

            <p>{skill.level}</p>

          </div>

          <div>

            <h4 className="mb-2 text-cyan-400">
              Experience
            </h4>

            <p>{skill.experience}</p>

          </div>

          <div>

            <h4 className="mb-2 text-cyan-400">
              Description
            </h4>

            <p className="leading-8 text-slate-400">
              {skill.description}
            </p>

          </div>

          <div>

            <h4 className="mb-3 text-cyan-400">
              Related Projects
            </h4>

            <div className="flex flex-wrap gap-3">
              {skill.projects.map(project => (
                <span
                  key={project}
                  className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300"
                >
                  {project}
                </span>
              ))}
            </div>

          </div>

          <div>

            <h4 className="mb-3 text-cyan-400">
              Related Technologies
            </h4>

            <div className="flex flex-wrap gap-3">
              {skill.related.map(item => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>

          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  );
}