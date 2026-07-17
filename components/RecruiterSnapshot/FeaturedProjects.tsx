"use client";

import GlassCard from "./GlassCard";
import { recruiterData } from "./data";
import { motion } from "framer-motion";

export default function FeaturedProjects() {
  const { projects } = recruiterData;

  return (
    <GlassCard delay={0.4} className="h-full">

      <h3
        className="
          text-2xl
          font-semibold
          text-white
        "
      >
        Featured Projects
      </h3>


      <div
        className="
          mt-6
          grid
          gap-5
          md:grid-cols-3
        "
      >

        {projects.map((project, index) => (

          <motion.div
            key={project.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3 + index * 0.15,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
            "
          >

            <h4
              className="
                text-lg
                font-semibold
                text-cyan-300
              "
            >
              {project.title}
            </h4>


            <p
              className="
                mt-3
                text-sm
                leading-relaxed
                text-gray-300
              "
            >
              {project.description}
            </p>


            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-2
              "
            >

              {project.tech.map((tech) => (

                <span
                  key={tech}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-3
                    py-1
                    text-xs
                    text-gray-300
                  "
                >
                  {tech}
                </span>

              ))}

            </div>


          </motion.div>

        ))}

      </div>

    </GlassCard>
  );
}