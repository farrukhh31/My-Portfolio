"use client";

import { useEffect, useState } from "react";

export default function useParallax() {
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function move(e: MouseEvent) {
      const x =
        (e.clientX / window.innerWidth - .5) * 20;

      const y =
        (e.clientY / window.innerHeight - .5) * 20;

      setOffset({
        x,
        y,
      });
    }

    window.addEventListener(
      "mousemove",
      move
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );
  }, []);

  return offset;
}