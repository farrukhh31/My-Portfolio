"use client";

import { motion } from "framer-motion";

import { availability, stack, identity } from "./footerData";

export default function FooterCredits() {
  return (
    <div className="text-center">
      {/* Availability status */}
      <div className="mx-auto mb-8 flex w-fit max-w-full items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 sm:mb-10">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-xs font-medium tracking-wide text-emerald-300">
          {availability.label}
        </span>
      </div>

      <p className="text-slate-400">Built with</p>

      <div className="mt-4 flex flex-wrap justify-center gap-2.5 px-2 sm:gap-3 sm:px-0">
        {stack.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -3, borderColor: "rgba(34,211,238,.5)" }}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1.5 text-xs text-cyan-300 transition-colors sm:px-4 sm:py-2 sm:text-sm"
          >
            {tech}
          </motion.span>
        ))}
      </div>

      <p className="mt-8 px-2 text-xs text-slate-500 sm:mt-10 sm:px-0 sm:text-sm">
        © {new Date().getFullYear()} {identity.name}. Crafted with ❤️ using modern web
        technologies.
      </p>
    </div>
  );
}
