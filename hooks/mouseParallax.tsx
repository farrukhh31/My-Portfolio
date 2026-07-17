"use client";

import { useEffect, useState } from "react";

export function useMouseParallax() {
  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / 45;
      const y = (e.clientY - window.innerHeight / 2) / 45;

      setRotate({
        x,
        y,
      });
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return rotate;
}