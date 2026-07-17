"use client";

import { useScroll, useSpring } from "framer-motion";

import { sections } from "./section";
import useActiveSection from "./ActiveSection";
import useOrbPosition from "./useOrbPosition";

import ScrollPath from "./ScrollPath";
import ScrollOrb from "./ScrollOrb";
import Milestone from "./Milestone";
import FloatingParticles from "./FloatingParticles";

// import FloatingParticles from "./FloatingParticles";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.35,
  });

  const activeSection = useActiveSection();

  const {
    pathRef,
    position,
    velocity,
    pathLength,
  } = useOrbPosition(progress);

  return (
    <aside
      className="
      fixed
      left-8
      top-1/2
      z-50
      hidden
      h-[75vh]
      w-24
      -translate-y-1/2
      lg:block
      "
    >
      {/* Glass Background */}

      <div
        className="
        absolute
        inset-0
        rounded-full
        border
        border-white/5
        bg-slate-900/20
        backdrop-blur-xl
        "
      />

      {/* Animated Path */}

      <ScrollPath
        progress={progress}
        pathRef={pathRef}
        pathLength={pathLength}
      />

      <ScrollPath
    progress={progress}
    pathRef={pathRef}
    pathLength={pathLength}
/>

<FloatingParticles />

<ScrollOrb
    position={position}
    velocity={velocity}
/>

      {/* Orb */}

      <ScrollOrb
        position={position}
        velocity={velocity}
      />

      {/* Milestones */}

      {sections.map((section, index) => (
        <Milestone
          key={section.id}
          label={section.label}
          top={
            (index /
              (sections.length - 1)) *
            100
          }
          active={
            activeSection === section.id
          }
          onClick={() => {

            document
              .getElementById(section.id)
              ?.scrollIntoView({

                behavior: "smooth",

                block: "start",

              });

          }}
        />
      ))}

      {/* Top Glow */}

      <div
        className="
        absolute
        left-1/2
        top-0
        h-24
        w-24
        -translate-x-1/2
        rounded-full
        bg-cyan-400/10
        blur-3xl
        "
      />

      {/* Bottom Glow */}

      <div
        className="
        absolute
        bottom-0
        left-1/2
        h-24
        w-24
        -translate-x-1/2
        rounded-full
        bg-cyan-400/10
        blur-3xl
        "
      />
    </aside>
  );
}