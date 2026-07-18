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
      className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none"
    >

      {/* Base Background */}
      <div
        className="
        absolute inset-0
        bg-[radial-gradient(circle_at_top,#e0f2fe_0%,#f8fafc_40%,#ffffff_100%)]
        dark:bg-[radial-gradient(circle_at_top,#07192d_0%,#050914_35%,#02040d_100%)]
        "
      />


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
        top-[-350px]
        h-[950px]
        w-[950px]
        -translate-x-1/2
        rounded-full
        bg-cyan-400/20
        dark:bg-cyan-400/10
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
        h-[700px]
        w-[700px]
        rounded-full
        bg-cyan-400/20
        dark:bg-cyan-400/18
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
        h-[650px]
        w-[650px]
        rounded-full
        bg-sky-500/18
        dark:bg-sky-500/14
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
        bottom-[-240px]
        left-1/3
        h-[520px]
        w-[520px]
        rounded-full
        bg-blue-500/15
        dark:bg-blue-600/12
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
        h-[260px]
        w-[260px]
        rounded-full
        bg-violet-500/10
        dark:bg-violet-500/5
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
        className="
        absolute inset-0
        opacity-[0.15]
        dark:opacity-[0.12]
        bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,.16),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(6,182,212,.14),transparent_35%)]
        "
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
        className="
        absolute inset-0
        opacity-[0.08]
        dark:opacity-[0.05]
        bg-[linear-gradient(rgba(34,211,238,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.08)_1px,transparent_1px)]
        bg-[size:40px_40px]
        "
      />


      {/* Noise */}
      <div
        className="
        absolute inset-0
        opacity-[0.02]
        dark:opacity-[0.025]
        mix-blend-overlay
        [background-image:radial-gradient(rgba(0,0,0,.5)_0.8px,transparent_0.8px)]
        dark:[background-image:radial-gradient(rgba(255,255,255,.8)_0.8px,transparent_0.8px)]
        [background-size:8px_8px]
        "
      />


      {/* Stars */}
      {stars.map((star,index)=>(
        <motion.div
          key={index}
          className="
          absolute rounded-full
          bg-sky-500
          dark:bg-cyan-300
          "
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
      <div
        className="
        absolute inset-0
        bg-[radial-gradient(circle,transparent_55%,rgba(255,255,255,.18)_100%)]
        dark:bg-[radial-gradient(circle,transparent_45%,rgba(2,4,13,.65)_100%)]
        "
      />

    </motion.div>
  );
}