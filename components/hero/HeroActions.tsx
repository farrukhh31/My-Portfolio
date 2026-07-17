"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./hero.module.css";

type MagneticButtonProps = {
  href: string;
  download?: boolean | string;
  className: string;
  strength: number;
  children: React.ReactNode;
};

function MagneticButton({
  href,
  download,
  className,
  strength,
  children,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 20,
    mass: 0.4,
  });

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 20,
    mass: 0.4,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);

    x.set((mx - rect.width / 2) * strength * 0.18);
    y.set((my - rect.height / 2) * strength * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      style={{ x: springX, y: springY }}
      className={className}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}

export default function HeroActions() {
  return (
    <div className={styles.btnRow}>
      {/* Contact Button */}
      <MagneticButton
        href="#contact"
        className={`${styles.btn} ${styles.btnPrimary}`}
        strength={0.3}
      >
        <span className={styles.btnGlow} />
        <span className={styles.btnShimmer} />
        <span className={styles.btnLabel}>Let's Talk</span>

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </MagneticButton>

      {/* Download Resume */}
      <MagneticButton
        href="/Farrukh_Ahmad_Resume.pdf"
        download="Farrukh_Ahmad_Resume.pdf"
        className={`${styles.btn} ${styles.btnSecondary}`}
        strength={0.3}
      >
        <span className={styles.btnGlow} />
        <span className={styles.btnLabel}>Download Resume</span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
        </svg>
      </MagneticButton>
    </div>
  );
}