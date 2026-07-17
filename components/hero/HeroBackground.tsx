"use client";

import { useEffect, useId, useState } from "react";
import styles from "./hero.module.css";
import { useHeroPointer } from "../../hooks/useHeroPointer";
import { PARTICLE_COLORS } from "./hero.data";

type Particle = {
  id: number;
  size: number;
  left: string;
  top: string;
  color: string;
  opacity: number;
  duration: string;
  delay: string;
  driftX: string;
};

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => {
    const size = Math.random() * 4 + 2;
    return {
      id,
      size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      opacity: Number((Math.random() * 0.4 + 0.25).toFixed(2)),
      duration: `${(Math.random() * 8 + 8).toFixed(1)}s`,
      delay: `${(Math.random() * 6).toFixed(1)}s`,
      driftX: `${(Math.random() * 40 - 20).toFixed(0)}px`,
    };
  });
}

export default function HeroBackground() {
  const { x, y } = useHeroPointer();
  const noiseFilterId = useId();

  // Generated client-side only — Math.random() would mismatch SSR output.
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 14 : 30;
    setParticles(makeParticles(count));
  }, []);

  const spotlightBackground =
    x || y
      ? `radial-gradient(450px circle at ${x}px ${y}px, rgba(59,130,246,.16), rgba(34,211,238,.10) 30%, rgba(139,92,246,.06) 55%, transparent 75%)`
      : undefined;

  return (
    <>
      <div className={styles.bgBase} />

      <div className={styles.aurora} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
        <div className={styles.blobCore} />
      </div>

      <div className={styles.gridLayer} aria-hidden="true">
        <div className={styles.gridMove} />
        <div className={styles.gridFade} />
      </div>

      <div className={styles.particles} aria-hidden="true">
        {particles?.map((p) => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              background: p.color,
              opacity: p.opacity,
              // @ts-expect-error -- custom property consumed by hero.module.css
              "--drift-x": p.driftX,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className={styles.spotlight} style={{ background: spotlightBackground }} aria-hidden="true" />

      <svg className={styles.srOnly} aria-hidden="true">
        <filter id={noiseFilterId}>
          <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={3} stitchTiles="stitch" />
        </filter>
      </svg>
      <div className={styles.noise} style={{ filter: `url(#${noiseFilterId})` }} aria-hidden="true" />

      <div className={styles.bottomGlow} aria-hidden="true" />
    </>
  );
}
