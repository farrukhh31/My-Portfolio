"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./heroIntro.module.css";

const COUNT_DURATION_MS = 1100;
const BAR_COUNT = 4;
const BAR_STAGGER = 0.07;
const BAR_DURATION = 0.7;
const EASE = [0.76, 0, 0.24, 1] as const;

export default function HeroIntro({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wiping, setWiping] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onComplete();
      setMounted(false);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const step = (ts: number) => {
      const progress = Math.min((ts - start) / COUNT_DURATION_MS, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setWiping(true);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.introRoot} style={{ pointerEvents: wiping ? "none" : "auto" }}>
      <div className={styles.introBars}>
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.introBar}
            style={{ transformOrigin: "top" }}
            initial={{ scaleY: 1 }}
            animate={wiping ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: BAR_DURATION, delay: i * BAR_STAGGER, ease: EASE }}
            onAnimationComplete={() => {
              if (wiping && i === BAR_COUNT - 1) {
                onComplete();
                setMounted(false);
              }
            }}
          />
        ))}
      </div>

      <motion.div
        className={styles.introCenter}
        animate={{ opacity: wiping ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.introCounter}>
          {count}
          <span className={styles.introPercent}>%</span>
        </div>
        <div className={styles.introBarTrack}>
          <div className={styles.introBarFill} style={{ width: `${count}%` }} />
        </div>
      </motion.div>
    </div>
  );
}
