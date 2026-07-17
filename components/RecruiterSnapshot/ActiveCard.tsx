"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import useActiveCard from "./useActiveCard";

interface Props {
  children: ReactNode;
}

export default function ActiveCard({
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const active = useActiveCard(ref);

  return (
    <motion.div
      ref={ref}
      animate={{
        scale: active ? 1.02 : 1,

        borderColor: active
          ? "rgba(34,211,238,.35)"
          : "rgba(255,255,255,.08)",

        boxShadow: active
          ? "0 25px 90px rgba(34,211,238,.18)"
          : "0 20px 70px rgba(0,0,0,.35)",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 22,
      }}
      className="rounded-[30px]"
    >
      {children}
    </motion.div>
  );
}