"use client";

import { useEffect, useState } from "react";

export default function useActiveCard(
  ref: React.RefObject<HTMLElement | null>
) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // IntersectionObserver only re-runs when the intersection actually
    // changes, instead of reading layout (getBoundingClientRect) on
    // every scroll frame like the previous window-scroll-listener
    // version did. Much cheaper on mobile, especially with several
    // cards on the page at once.
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      {
        // Treat the card as "active" while it sits inside the middle
        // 20% band of the viewport.
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref]);

  return active;
}
