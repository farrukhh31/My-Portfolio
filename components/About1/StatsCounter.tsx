"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Projects Shipped" },
  { value: 4, suffix: "", label: "Core Disciplines" },
  { value: 20, suffix: "+", label: "Technologies Used" },
  { value: 100, suffix: "%", label: "Automated Deploys" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function StatsCounter() {
  return (
    <section className="mt-20">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-purple-500/0 opacity-0 transition duration-500 group-hover:from-cyan-400/5 group-hover:to-purple-500/5 group-hover:opacity-100" />

            <p className="relative z-10 text-4xl font-black text-gradient md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>

            <p className="relative z-10 mt-3 text-sm uppercase tracking-[0.15em] text-slate-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
