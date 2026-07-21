"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, ArrowUpRight, Play } from "lucide-react";
import Magnetic from "@/components/Cursor/Magnetic";
import VideoModal from "./VideoModal";
import { categoryConfig } from "./project-categories";
import type { Project } from "./Projects-s";

type Props = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const style = categoryConfig[project.category];
  const hasVideo = Boolean(project.video);
  const hasLiveDemo = Boolean(project.demo && project.demo !== "#");
  const hasGithub = Boolean(project.github && project.github !== "#");

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

  // Cursor-following spotlight glow, tinted per category
  const spotlightX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(mouseY, (v) => `${v * 100}%`);
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(480px circle at ${x} ${y}, ${style.spotlight}, transparent 42%)`
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

  const videoLabel = project.videoLabel ?? "Watch Demo";

  return (
    <>
      <Magnetic>
        <motion.article
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-300 ${style.cardHoverBorder} ${style.glow}`}
        >
          {/* Category-colored top edge — reveals on hover, the card's discipline "handle" */}
          <div
            className={`absolute inset-x-0 top-0 z-20 h-0.75 scale-x-0 bg-linear-to-r ${style.gradientBar} transition-transform duration-500 ease-out group-hover:scale-x-100`}
          />

          {/* Cursor-tracking spotlight */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlightBackground }}
          />

          {/* Index marker */}
          <span className="absolute left-4 top-4 sm:left-6 sm:top-6 z-20 font-mono text-sm text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 flex flex-wrap items-center justify-end gap-2">
            {project.featured && (
              <span className="rounded-full border border-amber-300/40 bg-linear-to-r from-amber-300/20 to-yellow-200/10 px-3 py-1 text-xs font-medium tracking-wide text-amber-200 backdrop-blur-sm">
                Featured
              </span>
            )}
            <span
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-sm ${style.badgeBorder} ${style.badgeBg} ${style.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {style.label}
            </span>
          </div>

          {/* Image */}
          <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
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

            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {/* Center play button overlay for video projects — reads instantly as "watch, don't click through" */}
            {hasVideo && (
              <button
                onClick={() => setVideoOpen(true)}
                aria-label={`${videoLabel}: ${project.title}`}
                className="absolute inset-0 z-10 flex items-center justify-center opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full ${style.button} shadow-lg`}
                >
                  <Play size={24} fill="currentColor" className="ml-0.5" />
                </motion.span>
              </button>
            )}

            {/* Small icon buttons that slide up over the image on hover */}
            <div className="absolute inset-0 z-10 flex items-end justify-end gap-3 p-4 sm:p-6 opacity-100 translate-y-0 transition-all duration-300 md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0">
              {hasLiveDemo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                  className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full text-slate-950 transition-transform duration-300 hover:scale-110 ${style.button}`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View GitHub repository for ${project.title}`}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:border-white/50"
                >
                  <FaGithub size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-5 sm:p-6 md:p-8">
            <div className="flex items-center gap-2">
              <h3 className={`text-xl sm:text-2xl font-bold text-white transition-colors duration-300 ${style.groupHoverText}`}>
                {project.title}
              </h3>
              <ArrowUpRight
                size={20}
                className={`-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${style.text}`}
              />
            </div>

            {/* Description crossfades into a highlight on hover.
                Both lines share one grid cell so the card height never jumps. */}
            <div className="mt-4 grid">
              <p className="col-start-1 row-start-1 leading-7 text-slate-400 transition-opacity duration-500 ease-out group-hover:opacity-0">
                {project.description}
              </p>
              <p className={`col-start-1 row-start-1 leading-7 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 ${style.text}`}>
                {project.highlight ?? project.description}
              </p>
            </div>

            {/* Technologies — staggered lift on card hover */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.technologies.map((tech, i) => (
                <span
                  key={tech}
                  style={{ transitionDelay: `${i * 40}ms` }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 group-hover:-translate-y-0.5 ${style.chipBorder} ${style.chipBg} ${style.text} ${style.chipHoverBorder} ${style.chipHoverBg}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Primary actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              {hasVideo ? (
                <button
                  onClick={() => setVideoOpen(true)}
                  className={`flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-all duration-300 hover:scale-105 ${style.button} ${style.buttonGlow}`}
                >
                  <Play size={18} fill="currentColor" />
                  {videoLabel}
                </button>
              ) : hasLiveDemo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                  className={`flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-all duration-300 hover:scale-105 ${style.button} ${style.buttonGlow}`}
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              ) : null}

              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View GitHub repository for ${project.title}`}
                  className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <FaGithub size={18} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.article>
      </Magnetic>

      {hasVideo && (
        <VideoModal
          isOpen={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoUrl={project.video!}
          title={project.title}
        />
      )}
    </>
  );
}
