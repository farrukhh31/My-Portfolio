"use client";

import { motion } from "framer-motion";

import { identity } from "./footerData";

export default function FooterLogo() {
  return (
    <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
      {/* Outer rotating ring, dashed for a "signal dial" feel */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-400/25"
      />

      {/* Inner counter-rotating ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-violet-400/20"
      />

      {/* Core */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,.25)]">
        <span className="text-2xl font-black text-white">{identity.initials}</span>
      </div>

      {/* Ambient pulse */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl"
      />
    </div>
  );
}
