"use client";

import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  MapPin,
  Briefcase,
  Download,
  Mail,
  Code,
  Share2,
} from "lucide-react";

import { useHasFinePointer } from "./useMediaQuery";

const items = [
  {
    icon: User,
    title: "Name",
    value: "Farrukh Ahmad",
  },
  {
    icon: GraduationCap,
    title: "University",
    value: "NED University",
  },
  {
    icon: Briefcase,
    title: "Role",
    value: "Full Stack Developer",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Karachi, Pakistan",
  },
];

const socials = [
  { icon: Code, href: "https://github.com/farrukhh31", label: "GitHub" },
  { icon: Share2, href: "https://www.linkedin.com/in/farrukh-ahmed-248356246/", label: "LinkedIn" },
  { icon: Mail, href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=afarrukh553@gmail.com&su=Portfolio%20Inquiry%20for%20Farrukh%20Ahmad", label: "Email" },
];

export default function ProfileCard() {
  const hasFinePointer = useHasFinePointer();

  return (
    <motion.div
      whileHover={hasFinePointer ? { y: -8 } : undefined}
      className="glass relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-[60px] sm:h-56 sm:w-56 sm:blur-[90px]" />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-xl font-bold sm:text-2xl">
          Profile
        </h3>

        <span className="flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-xs font-medium text-green-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Available for work
        </span>
      </div>

      <div className="relative z-10 mt-6 space-y-5 sm:mt-8 sm:space-y-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 sm:gap-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
              <item.icon size={18} className="text-cyan-400" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <p className="font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative z-10 my-6 h-px w-full bg-white/10 sm:my-8" />

      {/* Actions */}
      <div className="relative z-10 flex flex-wrap items-center gap-3">
        <a
          href="/Farrukh_Ahmad_Resume.pdf"
          download="Farrukh_Ahmad_Resume.pdf"
          className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-purple-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:scale-[1.03]"
        >
          <Download size={16} />
          Download Resume
        </a>

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition-colors duration-300 hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <social.icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
