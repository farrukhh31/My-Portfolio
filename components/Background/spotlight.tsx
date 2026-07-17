"use client";

import { useEffect, useState } from "react";

export default function Spotlight() {
  const [position, setPosition] = useState({
    x: -500,
    y: -500,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: `radial-gradient(
          350px circle at ${position.x}px ${position.y}px,
          rgba(34,211,238,.10),
          transparent 70%
        )`,
      }}
    />
  );
}