"use client";

import { motion } from "framer-motion";

export default function ContactHeading() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="mb-5 uppercase tracking-[0.35em] text-cyan-400">
        Contact
      </p>

      <h2 className="text-5xl font-black md:text-6xl">
        Let's Build Something
        <span className="text-gradient"> Amazing.</span>
      </h2>

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
        Whether you have an internship opportunity,
        freelance project, collaboration, or simply
        want to connect, I'd love to hear from you.
      </p>
    </motion.div>
  );
}