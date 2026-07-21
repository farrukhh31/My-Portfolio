"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import styles from "./transitions.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RouteProgressBar() {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      className={styles.progressBar}
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: [1, 1, 0] }}
      transition={{
        scaleX: { duration: 0.45, ease: EASE },
        opacity: { duration: 0.65, times: [0, 0.65, 1] },
      }}
      aria-hidden="true"
    />
  );
}
