"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import useMouse from "./useMouse";

export default function Cursor() {
  const { x, y } = useMouse();

  // Only render the custom cursor on devices with a real mouse/trackpad.
  // Without this, phones and tablets would show the dot permanently
  // glued to the top-left corner, since touch never fires mousemove.
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setShowCursor(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => setShowCursor(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const dotX = useSpring(x, { stiffness: 700, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 700, damping: 40, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 180, damping: 18 });
  const ringY = useSpring(y, { stiffness: 180, damping: 18 });

  if (!showCursor) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-9999
        h-5
        w-5
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-cyan-400
        shadow-[0_0_25px_rgba(34,211,238,.8)]
        mix-blend-screen
        "
      />

      {/* Outer Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-9998
        h-12
        w-12
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border
        border-cyan-400/40
        "
      />
    </>
  );
}
