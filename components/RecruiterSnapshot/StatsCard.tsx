"use client";

import GlassCard from "./GlassCard";
import AnimatedCounter from "./AnimatedCounter";
import { recruiterData } from "./data";
import { motion } from "framer-motion";

export default function StatsCard() {
  const { stats } = recruiterData;

  return (
    <GlassCard delay={0.5}>

      <h3
        className="
          text-xl
          sm:text-2xl
          font-semibold
          text-white
        "
      >
        Development Stats
      </h3>


      <div
        className="
          mt-5
          sm:mt-6
          grid
          grid-cols-2
          gap-3
          sm:gap-4
          md:grid-cols-4
        "
      >

        {stats.map((stat, index) => (

          <motion.div
            key={stat.label}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.3 + index * 0.1,
            }}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-4
              sm:p-5
              text-center
            "
          >

            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
            />


            <p
              className="
                mt-2
                text-sm
                text-gray-400
              "
            >
              {stat.label}
            </p>


          </motion.div>

        ))}

      </div>


    </GlassCard>
  );
}