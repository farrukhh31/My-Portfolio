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
        <p className="uppercase tracking-[0.35em] text-cyan-400">
          WHO I AM
        </p>

        <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
          I build software where
          <br />
          <span className="text-gradient">
            engineering meets creativity.
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
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
      <div className="mt-20 grid gap-8 md:grid-cols-3">

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
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10">

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">
                  <Icon
                    size={32}
                    className="text-cyan-400"
                  />
                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-400">
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
        className="mt-20 flex flex-wrap justify-center gap-4"
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
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300"
          >
            {tag}
          </span>
        ))}
      </motion.div>

    </section>
  );
}
