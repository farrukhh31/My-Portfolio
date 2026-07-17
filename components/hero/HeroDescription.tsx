"use client";

import { motion } from "framer-motion";
import styles from "./hero.module.css";
import { DESCRIPTION_WORDS } from "./hero.data";

const START_DELAY = 0.1;
const STEP = 0.045;

export default function HeroDescription({ start }: { start: boolean }) {
  return (
    <p className={styles.desc}>
      {DESCRIPTION_WORDS.map(([word, highlighted], i) => (
        <motion.span
          key={`${word}-${i}`}
          className={highlighted ? styles.hl : undefined}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 8 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: START_DELAY + i * STEP, ease: "easeOut" }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}
