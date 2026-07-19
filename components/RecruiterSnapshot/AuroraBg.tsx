"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

export default function AuroraBackground() {
  const { scrollYProgress } = useScroll();

  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <motion.div
      style={{ y: auroraY }}
      className="absolute inset-0 overflow-hidden rounded-4xl pointer-events-none"
    >

      {/* Base Background */}
      <div className="absolute inset-0 aurora-bg-base" />


      {/* Spotlight */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.55, 0.75, 0.55],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        left-1/2
        -top-87.5
        h-237.5
        w-237.5
        -translate-x-1/2
        rounded-full
        aurora-spotlight
        blur-[240px]
        "
      />


      {/* Aurora Cyan */}
      <motion.div
        animate={{
          x: [-80, 60, -100, -80],
          y: [-40, 60, 20, -40],
          scale: [1, 1.15, 0.95, 1],
          rotate: [0, 8, -5, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -left-60
        -top-52
        h-175
        w-175
        rounded-full
        aurora-cyan
        blur-[200px]
        "
      />


      {/* Aurora Blue */}
      <motion.div
        animate={{
          x: [70, -100, 60, 70],
          y: [20, -70, 40, 20],
          scale: [1, 0.9, 1.1, 1],
          rotate: [0, -10, 8, 0],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -right-60
        top-20
        h-162.5
        w-162.5
        rounded-full
        aurora-blue
        blur-[190px]
        "
      />


      {/* Bottom Glow */}
      <motion.div
        animate={{
          x: [-60, 60, -60],
          y: [20, -40, 20],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -bottom-60
        left-1/3
        h-130
        w-130
        rounded-full
        aurora-bottom-glow
        blur-[190px]
        "
      />


      {/* Purple Accent */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        right-1/4
        top-1/3
        h-65
        w-65
        rounded-full
        aurora-purple
        blur-[140px]
        "
      />


      {/* Animated Mesh */}
      <motion.div
        animate={{
          backgroundPosition:[
            "0% 0%",
            "100% 50%",
            "50% 100%",
            "0% 0%",
          ],
        }}
        transition={{
          duration:45,
          repeat:Infinity,
          ease:"linear",
        }}
        className="absolute inset-0 aurora-mesh"
      />


      {/* Grid */}
      <motion.div
        animate={{
          backgroundPosition:[
            "0px 0px",
            "40px 40px",
          ],
        }}
        transition={{
          duration:22,
          repeat:Infinity,
          ease:"linear",
        }}
        className="absolute inset-0 aurora-grid"
      />


      {/* Noise */}
      <div className="absolute inset-0 aurora-noise" />


      {/* Stars */}
      {stars.map((star,index)=>(
        <motion.div
          key={index}
          className="absolute rounded-full aurora-star"
          style={{
            width:star.size,
            height:star.size,
            left:`${star.left}%`,
            top:`${star.top}%`,
          }}
          animate={{
            opacity:[0.2,1,0.2],
            scale:[1,1.8,1],
          }}
          transition={{
            duration:star.duration,
            delay:star.delay,
            repeat:Infinity,
          }}
        />
      ))}


      {/* Vignette */}
      <div className="absolute inset-0 aurora-vignette" />

    </motion.div>
  );
}