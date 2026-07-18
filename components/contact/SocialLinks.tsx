"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/farrukhh31",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/farrukh-ahmed-248356246/",
  },
  {
    name: "Email",
    icon: Mail,
    href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=afarrukh553@gmail.com&su=Portfolio%20Inquiry%20for%20Farrukh%20Ahmad",
  },
];

export default function SocialLinks() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="mt-10 flex gap-5">
      {socials.map(({ name, icon: Icon, href }, i) => (
        <div key={name} className="relative">
          <AnimatePresence>
            {hovered === i && (
              <motion.span
                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
              >
                {name}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ y: -6, scale: 1.1 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-cyan-400/40"
          >
            <Icon size={22} />
          </motion.a>
        </div>
      ))}
    </div>
  );
}
