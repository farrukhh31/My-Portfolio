"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: Props) {
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
        duration: 0.6,
      }}
      className="mb-14"
    >
      <p
        className="
          mb-3
          text-sm
          uppercase
          tracking-[0.35em]
          text-cyan-400
        "
      >
        {eyebrow}
      </p>

      <h2
        className="
          max-w-3xl
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-bold
          leading-tight
          text-white
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-4
          sm:mt-6
          max-w-2xl
          text-base
          sm:text-lg
          leading-7
          sm:leading-8
          text-slate-400
        "
      >
        {description}
      </p>
    </motion.div>
  );
}