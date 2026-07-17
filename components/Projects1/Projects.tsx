"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Projects } from "./Projects-s";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Projectss() {
  return (
    <section id="projects" className="container-width section-padding">
      <motion.div
        className="mb-16 text-center"
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
          A selection of web applications, games, and software projects
          showcasing my experience in full-stack development, DevOps, and
          interactive technologies.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-10 lg:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {Projects.map((project, index) => (
          <motion.div key={project.title} variants={itemVariants}>
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
