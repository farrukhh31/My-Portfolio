"use client";

import { motion } from "framer-motion";
import styles from "./hero.module.css";

export default function GreetingPill({ name }: { name: string }) {
  return (
    <motion.div
      className={styles.pill}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <span className={styles.wave}>👋</span>
      <span className={styles.pillText}>
        Hello, I&rsquo;m <b>{name}</b>
      </span>
      <span className={styles.divider} />
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className={styles.dotWrap}>
          <span className={styles.dotPing} />
          <span className={styles.dotCore} />
        </span>
        <span className={styles.status}>Available for work</span>
      </span>
    </motion.div>
  );
}
