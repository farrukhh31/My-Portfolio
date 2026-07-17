"use client";

import {
  MotionValue,
  useMotionValueEvent,
  useVelocity,
} from "framer-motion";
import {
  useRef,
  useState,
  useEffect,
} from "react";

export type PathPoint = {
  x: number;
  y: number;
};

type OrbPosition = {
  x: number;
  y: number;
  angle: number;
};

export default function useOrbPosition(
  progress: MotionValue<number>,
  milestoneCount: number = 6
) {
  const pathRef = useRef<SVGPathElement>(null);

  const velocity = useVelocity(progress);

  const [position, setPosition] =
    useState<OrbPosition>({
      x: 50,
      y: 20,
      angle: 0,
    });

  const [pathLength, setPathLength] =
    useState(0);

  const [milestones, setMilestones] =
    useState<PathPoint[]>([]);

  useEffect(() => {
    if (!pathRef.current) return;

    const length =
      pathRef.current.getTotalLength();

    setPathLength(length);

    const points: PathPoint[] = [];

    for (let i = 0; i < milestoneCount; i++) {

      const point =
        pathRef.current.getPointAtLength(
          (i / (milestoneCount - 1)) *
            length
        );

      points.push({
        x: point.x,
        y: point.y,
      });
    }

    setMilestones(points);

  }, [milestoneCount]);

  useMotionValueEvent(
    progress,
    "change",
    latest => {

      if (!pathRef.current) return;

      const length =
        pathRef.current.getTotalLength();

      const current =
        pathRef.current.getPointAtLength(
          latest * length
        );

      const next =
        pathRef.current.getPointAtLength(
          Math.min(
            latest * length + 1,
            length
          )
        );

      const angle =
        Math.atan2(
          next.y - current.y,
          next.x - current.x
        ) *
        (180 / Math.PI);

      setPosition({
        x: current.x,
        y: current.y,
        angle,
      });

    }
  );

  return {
    pathRef,
    position,
    velocity,
    pathLength,
    milestones,
  };
}