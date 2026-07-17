"use client";

import { useEffect, useState } from "react";

export default function useMouse() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function move(e: MouseEvent) {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    }

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, []);

  return mouse;
}