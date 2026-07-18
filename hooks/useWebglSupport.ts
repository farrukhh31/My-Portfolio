"use client";

import { useEffect, useState } from "react";

/**
 * Detects whether the current browser can actually create a WebGL context.
 * Starts optimistic (true) so server-rendered markup and the 3D scene are
 * not fought over during hydration; flips to false shortly after mount on
 * the rare device/browser that can't do WebGL, so a 2D fallback can render
 * instead of a blank canvas.
 */
export function useWebglSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
