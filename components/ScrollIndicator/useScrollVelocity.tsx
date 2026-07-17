"use client";

import { useMotionValue, useMotionValueEvent } from "framer-motion";
import { useScroll, useSpring } from "framer-motion";

export function useScrollVelocity() {
  const { scrollY } = useScroll();

  const velocity = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous !== undefined) {
      velocity.set(latest - previous);
    }
  });

  return useSpring(velocity, {
    stiffness: 200,
    damping: 30,
  });
}