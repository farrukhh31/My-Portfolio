"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import { STATS } from "./hero.data";

const START_DELAY_MS = 900;
const DURATION_MS = 1400;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, shouldStart: boolean) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!shouldStart || started.current) return;

    started.current = true;

    let raf = 0;
    let startTime: number | null = null;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;

        const progress = Math.min(
          (timestamp - startTime) / DURATION_MS,
          1
        );

        setValue(Math.round(easeOutCubic(progress) * target));

        if (progress < 1) {
          raf = requestAnimationFrame(step);
        }
      };

      raf = requestAnimationFrame(step);
    }, START_DELAY_MS);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [shouldStart, target]);

  return value;
}

const ICONS: Record<string, React.ReactNode> = {
  layers: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" />
    </svg>
  ),
  swap: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  spark: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
    </svg>
  ),
};

type Stat = (typeof STATS)[number];

function StatCard({
  target,
  suffix,
  label,
  icon,
  start,
}: Stat & { start: boolean }) {
  const value = useCountUp(target, start);

  return (
    <div className={styles.stat}>
      <div className={styles.statAccent} />

      <div className={styles.statIcon}>
        {ICONS[icon]}
      </div>

      <div className={styles.statNum}>
        {value}
        {suffix}
      </div>

      <div className={styles.statLabel}>
        {label}
      </div>
    </div>
  );
}

export default function HeroStats({
  start,
}: {
  start: boolean;
}) {
  return (
    <div className={styles.stats}>
      {STATS.map((stat) => (
        <StatCard
          key={stat.id}
          {...stat}
          start={start}
        />
      ))}
    </div>
  );
}