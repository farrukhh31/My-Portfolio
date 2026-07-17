"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import styles from "./transitions.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Place once in the root layout, alongside <RouteTransition>. Note:
 * the App Router doesn't expose a "navigation started" event the way
 * the old Pages Router's router events did, so this animates on
 * navigation *completion* (the pathname changing) rather than
 * tracking real fetch/render time. For prefetched Next.js
 * navigations that's fast enough that a quick fill-and-fade still
 * reads as "the page just loaded," not as a fake progress bar.
 */
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
