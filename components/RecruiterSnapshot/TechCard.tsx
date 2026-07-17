"use client";

import GlassCard from "./GlassCard";
import { recruiterData } from "./data";
import { motion } from "framer-motion";

export default function TechCard() {
  const { technologies } = recruiterData;

  return (
    <GlassCard delay={0.6}>

      <h3 className="text-2xl font-semibold text-white">
        Tech Stack
      </h3>

      <div className="mt-6 flex flex-wrap gap-3">

        {technologies.map((tech, index) => (

          <motion.div
            key={tech}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              scale: 1.08,
            }}
            className="
              rounded-xl
              border
              border-cyan-400/20
              bg-cyan-400/10
              px-4
              py-2
              text-sm
              text-cyan-200
            "
          >
            {tech}
          </motion.div>

        ))}

      </div>

    </GlassCard>
  );
}