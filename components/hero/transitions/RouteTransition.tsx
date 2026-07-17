"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import styles from "./transitions.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Place once in the root layout, wrapping `{children}`. Next's App
 * Router keeps layouts mounted across navigations, so this reads the
 * current pathname and keys a motion.div on it — that's what gives
 * AnimatePresence something to exit/enter on every route change.
 *
 * `initial={false}` skips the entrance animation on the very first
 * page load (the Hero's own intro curtain already owns that moment);
 * every navigation after that gets the fade+blur transition.
 */
export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className={styles.routeTransition}
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
