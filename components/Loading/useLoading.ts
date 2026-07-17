"use client";

import { useEffect, useState } from "react";

const MIN_DURATION = 2500; // Minimum loading screen duration (ms)

export default function useLoading() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Skip loading on subsequent visits
    if (sessionStorage.getItem("visited")) {
      setProgress(100);
      setLoading(false);
      return;
    }

    const startTime = performance.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = performance.now() - startTime;

      // Progress based on elapsed time
      const t = Math.min(elapsed / MIN_DURATION, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);

      const value = eased * 100;

      setProgress(value);

      if (t < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // sessionStorage.setItem("visited", "true");

        // Small pause so users can actually see 100%
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return {
    loading,
    progress,
  };
}