"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  reducedMotion: boolean;
};

function bezierPoint(
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  t: number,
  target: THREE.Vector3
) {
  const inv = 1 - t;
  return target.set(
    inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
    inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y,
    inv * inv * p0.z + 2 * inv * t * p1.z + t * t * p2.z
  );
}

export default function SkillEdge({ start, end, color, reducedMotion }: Props) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  const [p0, mid, p2] = useMemo(() => {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const m = a.clone().lerp(b, 0.5);
    m.y += 0.65; // arch the arc so it reads as 3D rather than a flat spoke
    return [a, m, b];
  }, [start, end]);

  useFrame(({ clock }) => {
    if (reducedMotion || !pulseRef.current) return;
    const t = (clock.getElapsedTime() * 0.35) % 1;
    pulseRef.current.position.copy(bezierPoint(p0, mid, p2, t, scratch));
  });

  return (
    <group>
      <QuadraticBezierLine
        start={p0}
        end={p2}
        mid={mid}
        color={color}
        lineWidth={1.4}
        transparent
        opacity={0.55}
      />
      {!reducedMotion && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
    </group>
  );
}
