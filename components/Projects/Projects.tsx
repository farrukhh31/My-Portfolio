"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Projects } from "./Projects-s";
import {
  categoryConfig,
  categoryOrder,
  ProjectCategory,
} from "./project-categories";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

type Filter = "all" | ProjectCategory;

export default function Projectss() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? Projects
        : Projects.filter((project) => project.category === filter),
    [filter]
  );

  const availableCategories = useMemo(
    () => categoryOrder.filter((cat) => Projects.some((p) => p.category === cat)),
    []
  );

  return (
    <section id="projects" className="container-width section-padding">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <p className="uppercase tracking-[0.35em] text-cyan-400">
          Portfolio
        </p>

        <h2 className="mt-4 text-5xl font-black">Featured Projects</h2>

        <p className="mx-auto mt-6 max-w-3xl text-slate-400">
          A selection of web applications, games, infrastructure, and AI
          systems spanning full-stack development, DevOps, and interactive
          technologies. Projects without a public build link to a recorded
          walkthrough instead.
        </p>
      </motion.div>

      <motion.div
        className="mb-14 flex flex-wrap items-center justify-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <FilterPill
          label="All"
          count={Projects.length}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />

        {availableCategories.map((cat) => (
          <FilterPill
            key={cat}
            label={categoryConfig[cat].label}
            count={Projects.filter((p) => p.category === cat).length}
            active={filter === cat}
            dotClass={categoryConfig[cat].dot}
            onClick={() => setFilter(cat)}
          />
        ))}
      </motion.div>

      <motion.div
        className="grid gap-10 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              layout
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No projects in this category yet.
        </p>
      )}
    </section>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
  dotClass,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  dotClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
        active
          ? "border-white/20 text-white"
          : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
      }`}
    >
      {active && (
        <motion.span
          layoutId="active-filter-pill"
          className="absolute inset-0 rounded-full bg-white/10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {dotClass && (
          <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
        )}
        {label}
        <span className="text-xs text-slate-500">{count}</span>
      </span>
    </button>
  );
}