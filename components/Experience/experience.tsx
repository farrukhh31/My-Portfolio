

"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { experience } from "./ExperiencedData";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 30%"],
  });

  const spineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const dotTop = useTransform(scrollYProgress, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section id="experience" className="container-width section-padding overflow-hidden">
      <div className="mb-10 text-center sm:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.35em] text-cyan-400"
        >
          Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl"
        >
          My Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl px-2 text-sm text-slate-400 sm:px-0 sm:text-base"
        >
          My academic and professional journey through software engineering, game
          development and DevOps.
        </motion.p>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto max-w-5xl pl-10 sm:pl-14 md:pl-16"
      >
        {/* Static faint track */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-cyan-400/10" />

        {/* Scroll-filled progress spine */}
        <motion.div
          style={{ scaleY: spineScale, transformOrigin: "top" }}
          className="absolute left-0 top-0 h-full w-0.5 bg-linear-to-b from-cyan-400 via-cyan-300 to-fuchsia-400 shadow-[0_0_12px_rgba(34,211,238,.6)]"
        />

        {/* Traveling glow that tracks how far you've scrolled through the timeline */}
        <motion.div
          style={{ top: dotTop, opacity: dotOpacity }}
          className="pointer-events-none absolute left-0 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="block h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_rgba(34,211,238,.55)]" />
        </motion.div>

        {experience.map((item, index) => (
          <div key={item.id} className="mb-8 last:mb-0 sm:mb-12">
            <ExperienceCard item={item} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}