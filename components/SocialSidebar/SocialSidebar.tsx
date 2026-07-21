"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { socialLinks } from "./Sociallinks";
import SocialItem from "./SocialItem";
import ToggleButton from "./ToggleButton";

export default function SocialSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop — expandable rail */}
      <div
        className="
        fixed
        right-0
        top-1/2
        -translate-y-1/2
        z-999
        hidden
        lg:block
        "
      >
        <motion.div
          animate={{
            width: open ? 260 : 72,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 22,
          }}
          className="
          relative
          overflow-hidden
         rounded-l-3xl
          border
          border-cyan-400/20
          bg-slate-900/60
          backdrop-blur-2xl
          shadow-[0_0_40px_rgba(34,211,238,.15)]
          "
        >
          {/* Animated Glow */}

          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="
            absolute
            inset-0
            bg-linear-to-b
            from-cyan-500/5
            via-transparent
            to-cyan-500/5
            pointer-events-none
            "
          />

          {/* Toggle Button */}

          <ToggleButton
            open={open}
            onClick={() => setOpen(!open)}
          />

          {/* Header */}

          <div
            className="
            flex
            items-center
            justify-center
            pt-8
            pb-4
            "
          >
            {open ? (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="
                text-sm
                font-semibold
                tracking-[0.45em]
                text-cyan-300
                "
              >
                SOCIALS
              </motion.h3>
            ) : (
              <span
                className="
                text-[10px]
                tracking-[0.4em]
                text-cyan-300
                [writing-mode:vertical-rl]
                rotate-180
                "
              >
                SOCIAL
              </span>
            )}
          </div>

          {/* Divider */}

          <div className="mx-5 h-px bg-cyan-400/20" />

          {/* Links */}

          <div className="py-4 px-2 space-y-2">
            {socialLinks.map((item, index) => (
              <SocialItem
                key={item.name}
                item={item}
                index={index}
                open={open}
              />
            ))}
          </div>

          {/* Bottom Line */}

          <div className="mx-auto mb-6 mt-4 h-16 w-px bg-cyan-400/20" />
        </motion.div>
      </div>

      <div
        className="
        fixed
        inset-x-0
        bottom-4
        z-999
        flex
        justify-center
        lg:hidden
        "
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div
          className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-cyan-400/20
          bg-slate-900/80
          px-2.5
          py-2.5
          backdrop-blur-xl
          shadow-[0_0_30px_rgba(34,211,238,.15)]
          "
        >
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                aria-label={item.name}
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
                text-cyan-300
                transition-colors
                duration-200
                active:bg-cyan-500/20
                "
              >
                <Icon size={20} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}