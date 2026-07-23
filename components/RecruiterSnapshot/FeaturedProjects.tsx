"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Play } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import GlassCard from "./GlassCard";
// ⚠️ Adjust these import paths to wherever the files actually live
// relative to this component.
import { Projects } from "../Projects/Projects-s";
import { categoryConfig } from "../Projects/project-categories";

// Uses the same real project data shown in the Projects section, so this
// stays in sync automatically. Shows up to 3 featured projects — bump the
// slice count (or remove it) if you want more cards in the grid.
const featuredProjects = Projects.filter((p) => p.featured).slice(0, 3);

export default function FeaturedProjects() {
  return (
    <GlassCard delay={0.4} className="h-full">
      <h3 className="text-2xl font-semibold text-white">Featured Projects</h3>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {featuredProjects.map((project, index) => {
          const style = categoryConfig[project.category];
          const visibleTech = project.technologies.slice(0, 3);
          const remainingTech = project.technologies.length - visibleTech.length;

          const hasGithub = Boolean(project.github && project.github !== "#");
          const hasLiveDemo = Boolean(project.demo && project.demo !== "#");
          const hasVideo = Boolean(project.video);

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              whileHover={{ y: -6 }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/6 to-white/6 backdrop-blur-xl transition-colors duration-300 ${style.cardHoverBorder} ${style.glow}`}
            >
              {/* Category accent bar — same reveal-on-hover pattern as the main project cards */}
              <div
                className={`absolute inset-x-0 top-0 z-20 h-0.75 scale-x-0 bg-linear-to-r ${style.gradientBar} transition-transform duration-500 ease-out group-hover:scale-x-100`}
              />

              {/* Action buttons — real links, sitting above the card's own
                  link layer (siblings, not nested inside it) so both work
                  without invalid nested <a> tags */}
              <div className="absolute right-3 top-3 z-30 flex gap-2">
                {hasGithub && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source code for ${project.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-slate-200 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-slate-950/80"
                  >
                    <FaGithub size={14} />
                  </a>
                )}

                {hasLiveDemo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${project.title}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-slate-950 shadow-lg transition-transform duration-300 hover:scale-110 ${style.button}`}
                  >
                    <ExternalLink size={14} />
                  </a>
                ) : hasVideo ? (
                  <a
                    href={project.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch demo of ${project.title}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-slate-950 shadow-lg transition-transform duration-300 hover:scale-110 ${style.button}`}
                  >
                    <Play size={13} fill="currentColor" className="ml-0.5" />
                  </a>
                ) : null}
              </div>

              {/* Everything below routes to the project section on click —
                  the whole card is the primary action, buttons above are
                  the secondary ones */}
              <Link
                href={`/#${project.slug}`}
                scroll
                className="flex h-full flex-col"
              >
                {/* Thumbnail — fixed height, same across every card */}
                <div className="relative h-32 sm:h-36 shrink-0 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {project.featured && (
                    <span className="absolute left-3 top-3 rounded-full border border-amber-300/40 bg-linear-to-r from-amber-300/20 to-yellow-200/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-amber-200 backdrop-blur-sm">
                      Featured
                    </span>
                  )}

                  <span
                    className={`absolute left-3 bottom-3 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-wide backdrop-blur-sm ${style.badgeBorder} ${style.badgeBg} ${style.text}`}
                  >
                    <span className={`h-1 w-1 rounded-full ${style.dot}`} />
                    {style.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  
                  <h4
                    className={`line-clamp-2 min-h-14 text-lg font-semibold text-white transition-colors duration-300 ${style.groupHoverText}`}
                  >
                    {project.title}
                  </h4>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {visibleTech.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.chipBorder} ${style.chipBg} ${style.text}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {remainingTech > 0 && (
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-500">
                        +{remainingTech}
                      </span>
                    )}
                  </div>

                  <div
                    className={`mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium transition-all duration-300 group-hover:gap-2.5 ${style.text}`}
                  >
                    View Project
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}