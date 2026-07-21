"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineDownload } from "react-icons/hi";

import { socials } from "./footerData";

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: HiOutlineMail,
  download: HiOutlineDownload,
};

function SocialButton({
  name,
  href,
  accent,
  Icon,
  download,
}: {
  name: string;
  href: string;
  accent: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  download?: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={hover ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-slate-900/90 px-2.5 py-1 text-xs text-slate-300 backdrop-blur-md"
      >
        {name}
      </motion.span>

      <motion.a
        href={href}
        // The download attribute pulls the file straight to disk instead
        // of navigating — so it must NOT be paired with target="_blank"
        // (that would open a tab first). Every other link still opens
        // in a new tab as before.
        {...(download
          ? { download }
          : { target: "_blank", rel: "noopener noreferrer" })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileHover={{
          y: -8,
          scale: 1.12,
        }}
        whileTap={{ scale: 0.95 }}
        style={
          {
            "--accent": accent,
          } as React.CSSProperties
        }
        className="group glass relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 hover:border-(--accent)/50 sm:h-14 sm:w-14"
      >
        <Icon
          size={19}
          className="relative z-10 text-slate-300 transition-colors duration-300 group-hover:text-(--accent) sm:hidden"
        />
        <Icon
          size={22}
          className="relative z-10 hidden text-slate-300 transition-colors duration-300 group-hover:text-(--accent) sm:block"
        />

        {/* Glow that ramps in on hover, colored per-platform */}
        <motion.div
          animate={{ opacity: hover ? 0.55 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-full blur-lg"
          style={{ background: accent }}
        />
      </motion.a>
    </div>
  );
}

export default function FooterSocials() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 sm:gap-6">
      {socials.map((s) => (
        <SocialButton
          key={s.name}
          name={s.name}
          href={s.href}
          accent={s.accent}
          Icon={iconMap[s.icon as keyof typeof iconMap]}
          download={s.download}
        />
      ))}
    </div>
  );
}
