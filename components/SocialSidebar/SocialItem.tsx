"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SocialLink } from "./Sociallinks";

interface SocialItemProps {
  item: SocialLink;
  open: boolean;
  index: number;
}

export default function SocialItem({
  item,
  open,
  index,
}: SocialItemProps) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
      }}
    >
      <Link
        href={item.href}
        target="_blank"
        className="group relative flex items-center"
      >
        {/* Main Button */}

        <motion.div
          whileHover={{
            x: 5,
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="
          flex
          w-full
          items-center
          gap-4
          rounded-xl
          px-4
          py-3
          transition-all
          duration-300
          hover:bg-cyan-500/10
          "
        >
          {/* Icon */}

          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-cyan-400/20
            bg-slate-800/70
            transition-all
            duration-300
            group-hover:border-cyan-300
            group-hover:shadow-[0_0_20px_rgba(34,211,238,.6)]
            "
          >
            <Icon
              size={20}
              className="
              text-cyan-300
              transition-all
              duration-300
              group-hover:text-white
              group-hover:rotate-12
              "
            />
          </div>

          {/* Label */}

          <motion.span
            animate={{
              opacity: open ? 1 : 0,
              x: open ? 0 : -15,
            }}
            transition={{
              duration: .25,
            }}
            className="
            whitespace-nowrap
            font-medium
            text-white
            "
          >
            {item.name}
          </motion.span>
        </motion.div>

        {/* Tooltip */}

        {!open && (
          <span
            className="
            pointer-events-none
            absolute
            left-16
            rounded-lg
            border
            border-cyan-400/20
            bg-slate-900
            px-3
            py-1.5
            text-sm
            text-white
            opacity-0
            shadow-lg
            transition-all
            duration-300
            group-hover:translate-x-2
            group-hover:opacity-100
            "
          >
            {item.name}
          </span>
        )}
      </Link>
    </motion.div>
  );
}