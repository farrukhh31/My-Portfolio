"use client";

import { useEffect, useState } from "react";

export default function useActiveCard(
  ref: React.RefObject<HTMLElement | null>
) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function update() {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const center = window.innerHeight / 2;

      const cardCenter = rect.top + rect.height / 2;

      const distance = Math.abs(center - cardCenter);

      setActive(distance < rect.height * 0.45);
    }

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return active;
}