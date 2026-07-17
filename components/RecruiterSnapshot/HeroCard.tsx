"use client";

import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function HeroCard() {
  return (
    <GlassCard className="h-full" delay={0.1}>
      <div className="flex h-full flex-col justify-between">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          Recruiter Snapshot
        </motion.div>

        {/* Main Content */}
        <div className="mt-8">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            Education
          </p>

          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-white">
            NED University of
            <br />
            Engineering & Technology
          </h2>

          <p className="mt-3 text-lg text-slate-300">
            BS Computer Science (Gaming & Animation)
          </p>

          <p className="mt-6 max-w-2xl leading-8 text-slate-400">
            Passionate about building scalable web applications,
            interactive games, and AI-powered solutions.
            I enjoy combining software engineering, creativity,
            and modern technologies to create meaningful digital
            experiences while continuously learning and solving
            real-world problems.
          </p>

        </div>

        {/* Bottom Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Location
            </p>

            <p className="mt-2 font-semibold text-white">
              Karachi, Pakistan
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Experience
            </p>

            <p className="mt-2 font-semibold text-white">
              3+ Internships
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Projects
            </p>

            <p className="mt-2 font-semibold text-white">
              20+ Projects
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Open To
            </p>

            <p className="mt-2 font-semibold text-cyan-300">
              AI • Full Stack • Game Dev
            </p>
          </div>

        </div>

      </div>
    </GlassCard>
  );
}