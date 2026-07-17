"use client";

import GlassCard from "./GlassCard";
import AnimatedCounter from "./AnimatedCounter";
import { recruiterData } from "./data";
import { motion } from "framer-motion";

export default function CGPACard() {
  const { cgpa } = recruiterData;

  return (
    <GlassCard delay={0.3}>

      <div className="flex items-center justify-between">

        <div>
          <h3
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            {cgpa.label}
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-400
            "
          >
            {cgpa.description}
          </p>
        </div>


        <motion.div
          initial={{
            rotate: -20,
            opacity: 0,
          }}
          animate={{
            rotate: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            border
            border-cyan-400/30
            bg-cyan-400/10
          "
        >

          <span
            className="
              text-2xl
              font-bold
              text-cyan-300
            "
          >
            <AnimatedCounter value={cgpa.value} />
          </span>

        </motion.div>

      </div>


      {/* Progress bar */}
      <div className="mt-6">

        <div
          className="
            h-3
            overflow-hidden
            rounded-full
            bg-white/10
          "
        >

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${(cgpa.value / 4) * 100}%`,
            }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
            "
          />

        </div>


        <div
          className="
            mt-2
            flex
            justify-between
            text-xs
            text-gray-400
          "
        >
          <span>Academic Performance</span>
          <span>4.0 Scale</span>
        </div>

      </div>


    </GlassCard>
  );
}