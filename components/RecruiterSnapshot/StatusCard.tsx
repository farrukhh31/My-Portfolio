"use client";

import GlassCard from "./GlassCard";
import { recruiterData } from "./data";
import { motion } from "framer-motion";

export default function StatusCard() {
  const { status } = recruiterData;

  return (
    <GlassCard delay={0.2} className="h-full">

      <h3
        className="
          text-xl
          font-semibold
          text-white
        "
      >
        {status.title}
      </h3>


      <div className="mt-5 space-y-4">

        {status.items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3 + index * 0.1,
            }}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
            "
          >

            <span
              className="
                text-sm
                text-gray-400
              "
            >
              {item.label}
            </span>


            <span
              className="
                text-sm
                font-medium
                text-cyan-300
              "
            >
              {item.value}
            </span>

          </motion.div>
        ))}

      </div>

    </GlassCard>
  );
}