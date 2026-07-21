"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import type { ExperienceItem } from "./ExperiencedData";

type Props = {
  item: ExperienceItem;
  index: number;
};

export default function ExperienceCard({ item, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.4 });

  // Cursor-driven 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 22 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip the 3D tilt math on touch/coarse-pointer devices — it only
    // adds jank there since there's no persistent hover to animate.
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Tilt, capped to a subtle 6deg so it reads as premium, not gimmicky
    rotateY.set((px - 0.5) * 6);
    rotateX.set(-(py - 0.5) * 6);

    // Spotlight position for the radial glow overlay
    el.style.setProperty("--x", `${px * 100}%`);
    el.style.setProperty("--y", `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const Icon = item.type === "education" ? GraduationCap : Briefcase;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Timeline node — brightens and scales up once its card has entered view */}
      <motion.div
        animate={{
          scale: isInView ? 1.1 : 1,
          boxShadow: isInView
            ? "0 0 30px rgba(34,211,238,.55)"
            : "0 0 12px rgba(34,211,238,.15)",
        }}
        transition={{ duration: 0.5 }}
        className="absolute -left-10 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900 sm:-left-12 sm:top-6 sm:h-10 sm:w-10 md:-left-14 md:h-12 md:w-12"
      >
        <Icon size={16} className="text-cyan-400 sm:h-4.5 sm:w-4.5" />
      </motion.div>

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
        className="group"
      >
        <motion.div
          style={{ rotateX: springRotateX, rotateY: springRotateY }}
          className="glass relative overflow-hidden rounded-2xl p-5 transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,.2)] sm:rounded-3xl sm:p-6 md:p-8"
        >
          {/* Cursor-tracking spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(500px circle at var(--x) var(--y), rgba(34,211,238,.12), transparent 45%)",
            }}
          />

          {item.current && (
            <span className="relative mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 sm:absolute sm:right-6 sm:top-6 sm:mb-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              Currently here
            </span>
          )}

          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 sm:text-sm">
            {item.year}
          </span>

          <h3 className="mt-3 text-xl font-bold sm:text-2xl">{item.role}</h3>

          <h4 className="mt-2 text-base text-slate-300 sm:text-lg">{item.company}</h4>

          <p className="mt-4 text-sm leading-6 text-slate-400 sm:mt-5 sm:text-base sm:leading-7">
            {item.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
            {item.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300 transition-colors duration-200 hover:border-cyan-400/50 hover:bg-cyan-400/20 sm:px-4 sm:py-2 sm:text-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}