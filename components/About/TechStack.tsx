"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiUnity,
  SiSharp,
  SiBlender,
  SiDocker,
  SiGithubactions,
  SiLinux,
  SiGit,
  SiNginx,
  SiPython,
} from "react-icons/si";
import { IconType } from "react-icons";

type Category =
  | "All"
  | "Full Stack"
  | "Game Dev"
  | "DevOps & Automation"
  | "AI";

interface Tech {
  name: string;
  icon: IconType;
  category: Category[];
}

const techs: Tech[] = [
  { name: "React", icon: SiReact, category: ["Full Stack"] },
  { name: "Next.js", icon: SiNextdotjs, category: ["Full Stack"] },
  { name: "TypeScript", icon: SiTypescript, category: ["Full Stack", "AI"] },
  { name: "JavaScript", icon: SiJavascript, category: ["Full Stack"] },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: ["Full Stack"] },
  { name: "Node.js", icon: SiNodedotjs, category: ["Full Stack"] },
  { name: "Express", icon: SiExpress, category: ["Full Stack"] },
  { name: "MongoDB", icon: SiMongodb, category: ["Full Stack"] },
  { name: "PostgreSQL", icon: SiPostgresql, category: ["Full Stack"] },
  { name: "Unity", icon: SiUnity, category: ["Game Dev"] },
  { name: "C#", icon: SiSharp, category: ["Game Dev"] },
  { name: "Blender", icon: SiBlender, category: ["Game Dev"] },
  { name: "Docker", icon: SiDocker, category: ["DevOps & Automation"] },
  {
    name: "GitHub Actions",
    icon: SiGithubactions,
    category: ["DevOps & Automation"],
  },
  { name: "Linux", icon: SiLinux, category: ["DevOps & Automation"] },
  { name: "Nginx", icon: SiNginx, category: ["DevOps & Automation"] },
  { name: "Git", icon: SiGit, category: ["Full Stack", "DevOps & Automation"] },
  // { name: "OpenAI API", icon: SiOpenai, category: ["AI"] },
  { name: "Python", icon: SiPython, category: ["AI", "DevOps & Automation"] },
];

const categories: Category[] = [
  "All",
  "Full Stack",
  "Game Dev",
  "DevOps & Automation",
  "AI",
];

export default function TechStack() {
  const [filter, setFilter] = useState<Category>("All");

  const filtered =
    filter === "All"
      ? techs
      : techs.filter((t) => t.category.includes(filter));

  return (
    <section className="mt-24">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-3xl font-bold text-white">
            Tech Stack
          </h3>

          <p className="mt-2 text-slate-400">
            Technologies I use across full stack, game dev, DevOps and AI.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.15)]"
                  : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="flex flex-wrap gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(({ name, icon: Icon }, index) => (
            <motion.div
              layout
              key={name}
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                delay: index * 0.03,
                duration: 0.3,
              }}
              whileHover={{
                scale: 1.08,
                y: -6,
              }}
              className="group glass flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,.25)]"
            >
              <Icon
                size={24}
                className="text-cyan-400 transition group-hover:rotate-12"
              />

              <span className="font-medium">
                {name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
