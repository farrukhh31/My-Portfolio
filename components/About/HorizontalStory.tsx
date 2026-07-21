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
import { useIsCompact, usePrefersReducedMotion } from "./useMediaQuery";

export default function HorizontalStory() {
  const isCompact = useIsCompact();
  const reduceMotion = usePrefersReducedMotion();

  // Phones & tablets (and anyone with reduced-motion on) get a native,
  // swipeable, snap-scrolling story instead of the scroll-jacked desktop
  // version — no sticky-position quirks with mobile browser chrome, no
  // huge artificial scroll distance, and it costs far less to render.
  const useNativeCarousel = isCompact || reduceMotion;

  if (useNativeCarousel) {
    return <StackedStory />;
  }

  return <PinnedStory />;
}

/* -------------------------------------------------------------------- */
/*  Mobile / tablet / reduced-motion: horizontally swipeable, snap-based */
/* -------------------------------------------------------------------- */
function StackedStory() {
  return (
    <section className="relative">
      <div
        className="
          flex snap-x snap-mandatory overflow-x-auto scroll-smooth
          [-webkit-overflow-scrolling:touch]
          scrollbar-none [&::-webkit-scrollbar]:hidden
        "
      >
        {story.map((item, index) => (
          <div key={item.id} className="w-full shrink-0 snap-center">
            <StoryPanel item={item} image={index === 0} variant="stacked" />
          </div>
        ))}
      </div>

      {/* Swipe indicator */}
      <div className="mt-2 flex justify-center gap-2">
        {story.map((s) => (
          <div
            key={s.id}
            className="h-1.5 w-6 rounded-full bg-white/15"
          />
        ))}
      </div>
      <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-slate-500">
        Swipe to explore
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  Desktop: pinned, scroll-linked horizontal story                      */
/* -------------------------------------------------------------------- */
function PinnedStory() {
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

    // Debounced resize handling — avoids thrashing layout on every pixel
    // during a drag-resize.
    let frame: number;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateWidth);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  const translateX = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  const x = useSpring(translateX, {
    stiffness: 100,
    damping: 30,
    mass: 0.3,
  });

  // Scroll distance scales with the number of panels so pacing stays
  // consistent if panels are added or removed.
  const scrollHeight = `${(story.length + 1) * 100}vh`;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Progress Bar */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="
            absolute top-0 left-0 z-50 h-1 w-full origin-left
            bg-linear-to-r from-cyan-400 via-sky-400 to-purple-500
          "
        />

        {/* Horizontal Panels */}
        <motion.div
          ref={trackRef}
          style={{ x, willChange: "transform" }}
          className="flex h-screen"
        >
          {story.map((item, index) => (
            <StoryPanel
              key={item.id}
              item={item}
              image={index === 0}
              variant="pinned"
            />
          ))}
        </motion.div>

        {/* Bottom Indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          {story.map((s) => (
            <div key={s.id} className="h-2 w-10 rounded-full bg-white/15" />
          ))}
        </div>

      </div>
    </section>
  );
}
