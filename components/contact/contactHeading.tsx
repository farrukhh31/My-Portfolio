"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactHeading() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        staggerChildren: 0.12,
      }}
      className="mx-auto max-w-3xl text-center"
    >

      <motion.p
        variants={fadeUp}
        className="mb-5 uppercase tracking-[0.35em] text-cyan-400"
      >
        Contact
      </motion.p>


      <motion.h2
        variants={fadeUp}
        className="text-5xl font-black md:text-6xl"
      >
        Let's Build Something
        <span className="text-gradient">
          {" "}Amazing.
        </span>
      </motion.h2>


      <motion.p
        variants={fadeUp}
        className="
          mx-auto
          mt-8
          max-w-2xl
          text-lg
          leading-8
          text-slate-400
        "
      >
        Whether you have an internship opportunity, freelance project,
        collaboration, or simply want to connect, I'd love to hear from you.
      </motion.p>

    </motion.div>
  );
}