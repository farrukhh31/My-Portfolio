"use client";

import { motion } from "framer-motion";
import ActivePill from "./ActivePill";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  active: boolean;
}

export default function NavItem({
  id,
  title,
  icon: Icon,
  active,
}: NavItemProps) {
  const handleClick = () => {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
    >
      {/* Animated Active Pill */}
      {active && <ActivePill />}

      {/* Icon */}
      {Icon && (
        <motion.div
          className="relative z-10"
          animate={{
            rotate: active ? 5 : 0,
            scale: active ? 1.08 : 1,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Icon size={16} />
        </motion.div>
      )}

      {/* Title */}
      <span
        className={`relative z-10 transition-colors ${
          active
            ? "text-white"
            : "text-zinc-400 group-hover:text-white"
        }`}
      >
        {title}
      </span>
    </button>
  );
}