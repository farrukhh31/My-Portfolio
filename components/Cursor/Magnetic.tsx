"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function Magnetic({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x);
  const springY = useSpring(y);

  function move(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const mx =
      e.clientX -
      rect.left -
      rect.width / 2;

    const my =
      e.clientY -
      rect.top -
      rect.height / 2;

    x.set(mx * 0.25);
    y.set(my * 0.25);
  }

  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </motion.div>
  );
}