"use client";

import { motion } from "framer-motion";
import { quickLinks } from "./footerData";

export default function FooterLinks() {
  return (
    <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
      {quickLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="
            group
            relative
            text-sm
            font-medium
            tracking-wide
            text-slate-400
            transition-colors
            duration-300
            hover:text-white
          "
        >
          {link.label}

          <motion.span
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            style={{
              originX: 0,
            }}
            className="
              absolute
              -bottom-1
              left-0
              h-px
              w-full
              origin-left
              bg-gradient-to-r
              from-cyan-400
              to-violet-400
            "
          />
        </a>
      ))}
    </nav>
  );
}