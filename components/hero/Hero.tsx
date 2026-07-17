"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./hero.module.css";
import { useHeroPointerTracker } from "@/hooks/useHeroPointer";
import HeroIntro from "./HeroIntro";
import HeroBackground from "./HeroBackground";
import GreetingPill from "./GreetingPill";
import RoleRotator from "./RoleRotator";
import HeroDescription from "./HeroDescription";
import HeroActions from "./HeroActions";
import HeroStats from "./HeroStats";
import OrbVisual from "./OrbVisual";
import ScrollHint from "./ScrollHint";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Reveal({
  delay,
  show,
  children,
  className,
}: {
  delay: number;
  show: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export type HeroProps = {
  name?: string;
};

export default function Hero({ name = "Farrukh Ahmad" }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroPointerTracker(sectionRef);

  const [introDone, setIntroDone] = useState(false);

  const nameParts = name.split(" ");
  const firstNames = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts.slice(-1);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <h1 className={styles.srOnly}>
        Hero introduction for {name}, full stack and creative developer
      </h1>

      <HeroIntro onComplete={() => setIntroDone(true)} />
      <HeroBackground />

      <div className={styles.wrap}>
        <div className={styles.grid2}>
          <div className={styles.colLeft}>
            <Reveal delay={0.05} show={introDone}>
              <GreetingPill name={name} />
            </Reveal>

            <Reveal delay={0.15} show={introDone}>
              <h2 className={styles.name}>
                {firstNames} <span className={styles.grad}>{lastName}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.25} show={introDone}>
              <RoleRotator />
            </Reveal>

            <Reveal delay={0.35} show={introDone}>
              <HeroDescription start={introDone} />
            </Reveal>

            <Reveal delay={0.45} show={introDone}>
              <HeroActions />
            </Reveal>

            <Reveal delay={0.55} show={introDone}>
              <HeroStats start={introDone} />
            </Reveal>
          </div>

          <Reveal delay={0.2} show={introDone}>
            <OrbVisual />
          </Reveal>
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}
