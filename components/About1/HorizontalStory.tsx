"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import StoryPanel from "./StoryPanel";
import { story } from "./StoryData";

export default function HorizontalStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateWidth = () => {
      if (!trackRef.current) return;

      const totalWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      setMaxScroll(totalWidth - viewportWidth);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -maxScroll]
  );

  const x = useSpring(translateX, {
    stiffness: 80,
    damping: 25,
    mass: 0.4,
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Progress Bar */}
        <motion.div
          style={{
            scaleX: scrollYProgress,
          }}
          className="
            absolute
            top-0
            left-0
            z-50
            h-1
            w-full
            origin-left
            bg-gradient-to-r
            from-cyan-400
            via-sky-400
            to-purple-500
          "
        />

        {/* Horizontal Panels */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-screen"
        >
          {story.map((item, index) => (
            <StoryPanel
              key={item.id}
              item={item}
              image={index === 0}
            />
          ))}
        </motion.div>

        {/* Bottom Indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          {story.map((_, i) => (
            <div
              key={i}
              className="h-2 w-10 rounded-full bg-white/15"
            />
          ))}
        </div>

      </div>
    </section>
  );
}