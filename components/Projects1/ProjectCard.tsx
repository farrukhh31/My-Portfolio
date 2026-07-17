"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Cursor/Magnetic";

type Props = {
  project: {
    title: string;
    description: string;
    image: string;
    hoverImage?: string;
    highlight?: string;
    technologies: string[];
    github: string;
    demo: string;
    featured?: boolean;
  };
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw 0–1 position of the cursor inside the card
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Subtle 3D tilt driven by cursor position
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  });

  // Cursor-following spotlight glow
  const spotlightX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(mouseY, (v) => `${v * 100}%`);
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(480px circle at ${x} ${y}, rgba(34,211,238,0.14), transparent 42%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <Magnetic>
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]"
      >
        {/* Cursor-tracking spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlightBackground }}
        />

        {/* Index marker */}
        <span className="absolute left-6 top-6 z-20 font-mono text-sm text-white/40">
          {String(index + 1).padStart(2, "0")}
        </span>

        {project.featured && (
          <span className="absolute right-6 top-6 z-20 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-300 backdrop-blur-sm">
            Featured
          </span>
        )}

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={false}
              className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
            />
            <Image
              src={project.hoverImage ?? project.image}
              alt={`${project.title} — alternate view`}
              fill
              priority={false}
              className="absolute inset-0 object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Buttons that slide up over the image on hover */}
          <div className="absolute inset-0 z-10 flex items-end justify-end gap-3 p-6 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 text-slate-950 transition-transform duration-300 hover:scale-110"
            >
              <ExternalLink size={18} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub repository for ${project.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:border-cyan-400/50"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
              {project.title}
            </h3>
            <ArrowUpRight
              size={20}
              className="-translate-x-1 text-cyan-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </div>

          {/* Description crossfades into a highlight on hover.
              Both lines share one grid cell so the card height never jumps. */}
          <div className="mt-4 grid">
            <p className="col-start-1 row-start-1 leading-7 text-slate-400 transition-opacity duration-500 ease-out group-hover:opacity-0">
              {project.description}
            </p>
            <p className="col-start-1 row-start-1 leading-7 text-cyan-200 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
              {project.highlight ?? project.description}
            </p>
          </div>

          {/* Technologies — staggered lift on card hover */}
          <div className="mt-6 flex flex-wrap gap-3">
            {project.technologies.map((tech, i) => (
              <span
                key={tech}
                style={{ transitionDelay: `${i * 40}ms` }}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/20 group-hover:-translate-y-0.5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub repository for ${project.title}`}
              className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10"
            >
              <FaGithub size={18} />
              GitHub
            </a>
          </div>
        </div>
      </motion.article>
    </Magnetic>
  );
}
