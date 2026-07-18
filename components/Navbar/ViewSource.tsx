"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

/* Replace with your actual portfolio repo URL */
const PORTFOLIO_REPO_URL = "https://github.com/farrukhh31/My-Portfolio";

export default function ViewSource() {
  return (
    <motion.a
      href={PORTFOLIO_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="
        group

        flex
        items-center
        gap-2

        rounded-full

        border
        border-white/10

        bg-white/[0.04]

        px-3
        py-2

        text-sm
        text-zinc-300

        transition-all
        duration-300

        hover:border-cyan-400/40
        hover:bg-cyan-500/10
        hover:text-white

        2xl:px-4
      "
    >
      <FaGithub
        size={15}
        className="
          transition-transform
          duration-300

          group-hover:rotate-12
        "
      />
      View Source
    </motion.a>
  );
}