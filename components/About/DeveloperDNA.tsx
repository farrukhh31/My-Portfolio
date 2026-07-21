"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Rocket } from "lucide-react";

const dna = [
  {
    icon: Brain,
    title: "Think",
    description:
      "I enjoy breaking complex problems into simple, scalable solutions with clean architecture and attention to detail.",
  },
  {
    icon: Code2,
    title: "Build",
    description:
      "From full stack web applications to immersive games, AI-powered tools, and automated pipelines, I love turning ideas into products.",
  },
  {
    icon: Rocket,
    title: "Grow",
    description:
      "Technology evolves every day, and so do I. I continuously learn, experiment, and improve with every project.",
  },
];

export default function DeveloperDNA() {
  return (
    <section className="mt-16">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400 sm:text-base">
          WHO I AM
        </p>

        <h2 className="mt-4 text-3xl font-black leading-tight sm:mt-6 sm:text-5xl md:text-6xl">
          I build software where
          <br />
          <span className="text-gradient">
            engineering meets creativity.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:mt-8 sm:text-lg sm:leading-8">
          As a BS CS (Gaming & Animation student) at
          <span className="text-white">
            {" "}NED University of Engineering & Technology
          </span>,
          I enjoy combining full stack engineering, game development,
          DevOps automation, and applied AI to build meaningful digital
          experiences.
        </p>
      </motion.div>

      {/* DNA */}
      <div className="mt-12 grid gap-5 sm:mt-20 sm:gap-8 md:grid-cols-3">

        {dna.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8"
            >
              <div className="absolute inset-0 bg-linear-to-br from-cyan-400/5 via-transparent to-purple-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 sm:mb-6 sm:h-16 sm:w-16">
                  <Icon
                    size={28}
                    className="text-cyan-400 sm:hidden"
                  />
                  <Icon
                    size={32}
                    className="hidden text-cyan-400 sm:block"
                  />
                </div>

                <h3 className="text-xl font-bold sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400 sm:mt-5 sm:leading-8">
                  {item.description}
                </p>

              </div>
            </motion.div>
          );
        })}

      </div>

      {/* Footer */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        className="mt-12 flex flex-wrap justify-center gap-2.5 sm:mt-20 sm:gap-4"
      >
        {[
          "Full Stack Development",
          "Game Development",
          "DevOps & Automation",
          "AI / ML ",
          "Problem Solving",
          "Continuous Learning",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs text-cyan-300 sm:px-5 sm:py-2 sm:text-sm"
          >
            {tag}
          </span>
        ))}
      </motion.div>

    </section>
  );
}
