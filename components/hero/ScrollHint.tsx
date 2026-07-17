"use client";

import styles from "./hero.module.css";

export default function ScrollHint() {
  return (
    <div className={styles.scrollHint}>
      <span className={styles.scrollLabel}>Scroll to explore</span>
      <div className={styles.mouse}>
        <div className={styles.wheel} />
      </div>
    </div>
  );
}
