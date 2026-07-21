"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import styles from "./hero.module.css";
import { useHeroPointer } from "../../hooks/useHeroPointer";
import { ORBIT_RADII, TECH_LIST } from "./hero.data";

type OrbitedBadge = {
  name: string;
  color: string;
  icon?: LucideIcon;
  orbitIndex: 0 | 1 | 2;
  x: number;
  y: number;
  delay: number;
};

function layoutBadges(): OrbitedBadge[] {
  return TECH_LIST.map((tech, i) => {
    const orbitIndex = (i % 3) as 0 | 1 | 2;
    const itemsInOrbit = TECH_LIST.filter((_, j) => j % 3 === orbitIndex);
    const idxInOrbit = itemsInOrbit.indexOf(tech);
    const angle = (idxInOrbit / itemsInOrbit.length) * Math.PI * 2;
    const r = ORBIT_RADII[orbitIndex];

    return {
      name: tech.name,
      color: tech.color,
      icon: tech.icon,
      orbitIndex,
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      delay: idxInOrbit * 0.4,
    };
  });
}

export default function OrbVisual() {
  const badges = useMemo(layoutBadges, []);

  const wrapRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const { x: pointerX, y: pointerY } = useHeroPointer();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 14 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 14 });

  const [sphereLightBackground, setSphereLightBackground] = useState<string | undefined>(undefined);

  // Touch/coarse-pointer devices (phones, tablets) have no meaningful hover
  // position and no benefit from the 3D tilt — skip the work entirely there.
  const [enableTilt, setEnableTilt] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnableTilt(mq.matches);
    const onChange = () => setEnableTilt(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Reading layout (getBoundingClientRect) here in an effect — rather than
  // during render — avoids forcing a synchronous reflow on every pointer move.
  useEffect(() => {
    if (!enableTilt || (!pointerX && !pointerY)) return;

    if (wrapRef.current) {
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const relX = (pointerX - cx) / rect.width;
      const relY = (pointerY - cy) / rect.height;
      rotateY.set(relX * 14);
      rotateX.set(-relY * 14);
    }

    if (sphereRef.current) {
      const sr = sphereRef.current.getBoundingClientRect();
      const lx = ((pointerX - sr.left) / sr.width) * 100;
      const ly = ((pointerY - sr.top) / sr.height) * 100;
      setSphereLightBackground(
        `radial-gradient(circle at ${lx}% ${ly}%, rgba(255,255,255,.22), rgba(59,130,246,.10) 35%, transparent 70%)`
      );
    }
  }, [pointerX, pointerY, enableTilt, rotateX, rotateY]);

  return (
    <div className={styles.colRight}>
      <motion.div
        ref={wrapRef}
        className={styles.orbWrap}
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
      >
        <div className={`${styles.orbit} ${styles.orbit1}`}>
          {badges
            .filter((b) => b.orbitIndex === 0)
            .map((b) => (
              <OrbitBadge key={b.name} badge={b} />
            ))}
        </div>
        <div className={`${styles.orbit} ${styles.orbit2}`}>
          {badges
            .filter((b) => b.orbitIndex === 1)
            .map((b) => (
              <OrbitBadge key={b.name} badge={b} />
            ))}
        </div>
        <div className={`${styles.orbit} ${styles.orbit3}`}>
          {badges
            .filter((b) => b.orbitIndex === 2)
            .map((b) => (
              <OrbitBadge key={b.name} badge={b} />
            ))}
        </div>

        <div className={styles.glowMain} />

        <div className={styles.sphere} ref={sphereRef}>
          <div className={styles.sphereGrad} />
          <div className={styles.sphereLight} style={{ background: sphereLightBackground }} />
          <div className={styles.reflect1} />
          <div className={styles.reflect2} />
          <div className={styles.ringInner} />
          <div className={styles.core} />
          <div className={styles.tinyCore} />
        </div>
      </motion.div>
    </div>
  );
}

function OrbitBadge({ badge }: { badge: OrbitedBadge }) {
  const Icon = badge.icon;
  return (
    <div
      className={styles.badge}
      style={{
        left: `calc(50% + ${badge.x}%)`,
        top: `calc(50% + ${badge.y}%)`,
        color: badge.color,
        animationDelay: `${badge.delay}s`,
      }}
      title={badge.name}
    >
      {Icon ? <Icon size={20} strokeWidth={1.75} /> : badge.name}
    </div>
  );
}
