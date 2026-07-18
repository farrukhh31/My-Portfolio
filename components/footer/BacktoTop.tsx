"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

const SIZE = 56; // px, matches h-14 w-14
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DEFAULT_BOTTOM = 32; // px, matches the old bottom-8
const FOOTER_CLEARANCE = 24; // px gap kept above the footer's top edge

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Scroll progress drives the ring around the button.
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  const dashOffset = useTransform(smoothProgress, (v) => CIRCUMFERENCE * (1 - v));

  // Subtle magnetic pull toward the cursor while hovering nearby.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 250, damping: 18 });
  const springY = useSpring(my, { stiffness: 250, damping: 18 });

  // Vertical dock offset: normally sits at DEFAULT_BOTTOM, but rides up to
  // stay clear of the footer (and its social row) once the footer scrolls
  // into view, instead of overlapping it.
  const bottomOffset = useMotionValue(DEFAULT_BOTTOM);
  const springBottom = useSpring(bottomOffset, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.getElementById("footer");

    let raf = 0;

    function update() {
      raf = 0;

      // Visible once the hero section has scrolled out of view. Falls
      // back to a viewport-height threshold if no #hero element exists.
      const heroBottom = hero
        ? hero.getBoundingClientRect().bottom
        : window.innerHeight * 0.8;
      setShow(heroBottom <= 0 || (!hero && window.scrollY > heroBottom));

      // Stay docked above the footer's top edge once it enters view,
      // rather than floating over its content at a fixed distance.
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const overlap = window.innerHeight - footerTop;
        bottomOffset.set(
          overlap > 0 ? overlap + FOOTER_CLEARANCE : DEFAULT_BOTTOM
        );
      }
    }

    function onScrollOrResize() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [bottomOffset]);

  function handlePointerMove(e: React.MouseEvent) {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) * 0.35);
    my.set((e.clientY - cy) * 0.35);
  }

  function resetPointer() {
    setHover(false);
    mx.set(0);
    my.set(0);
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 30 }}
          style={{ bottom: springBottom }}
          className="fixed right-5 z-[999] sm:right-8"
          onMouseMove={handlePointerMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={resetPointer}
        >
          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={hover ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap rounded-md border border-white/10 bg-slate-900/90 px-2.5 py-1 text-xs text-slate-300 backdrop-blur-md"
          >
            Back to top
          </motion.span>

          <motion.button
            ref={btnRef}
            onClick={scrollTop}
            aria-label="Back to top"
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.92 }}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 bg-slate-900/80 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,.25)] transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(34,211,238,.4)]"
          >
            {/* Scroll-progress ring */}
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute inset-0 -rotate-90"
            >
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={STROKE}
              />
              <motion.circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="url(#backToTopGradient)"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                style={{ strokeDashoffset: dashOffset }}
              />
              <defs>
                <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp
                size={20}
                className="relative z-10 text-cyan-300 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </motion.div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 