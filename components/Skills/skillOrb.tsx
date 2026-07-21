"use client";

import { memo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, useCursor } from "@react-three/drei";
import * as THREE from "three";

import { PlacedSkill } from "./types";

type Props = {
  skill: PlacedSkill;
  selected: boolean;
  dimmed: boolean;
  reducedMotion: boolean;
  onSelect: (skill: PlacedSkill) => void;
};

function SkillOrb({
  skill,
  selected,
  dimmed,
  reducedMotion,
  onSelect,
}: Props) {
  const gemRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (gemRef.current) gemRef.current.rotation.y += delta * 0.35;
    if (shellRef.current) shellRef.current.rotation.y -= delta * 0.22;
  });

  const scale = selected ? 1.25 : hovered ? 1.12 : 1;
  const baseGlow = 0.35 + skill.proficiency / 250;
  const emissiveIntensity = selected ? 1.5 : hovered ? 1.0 : baseGlow;
  const fade = dimmed ? 0.32 : 1;

  return (
    <group position={skill.position}>
      <Float
        floatIntensity={reducedMotion ? 0 : 1.1}
        rotationIntensity={reducedMotion ? 0 : 0.35}
        speed={reducedMotion ? 0 : 1.4}
      >
        <group
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skill);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          {/* generous invisible hit target — sized past the gem itself so
              it's easy to aim with a mouse and forgiving enough for a
              fingertip on touch screens */}
          <mesh>
            <sphereGeometry args={[1.05, 8, 8]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          {/* Real DOM label — inherits the site's own fonts, no extra
              network round-trip for a remote glyph atlas. pointer-events
              is off so clicks fall through to the gem underneath. */}
          <Html position={[0, 0.95, 0]} center distanceFactor={7} zIndexRange={[10, 0]}>
            <span
              style={{
                pointerEvents: "none",
                whiteSpace: "nowrap",
                fontSize: "13px",
                fontWeight: 600,
                color: "#e2e8f0",
                opacity: fade,
                textShadow: "0 0 6px #020617, 0 0 10px #020617",
              }}
            >
              {skill.name}
            </span>
          </Html>

          {/* soft halo */}
          <mesh scale={scale * 1.6}>
            <sphereGeometry args={[0.55, 16, 16]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={(selected ? 0.2 : hovered ? 0.13 : 0.06) * fade}
              depthWrite={false}
            />
          </mesh>

          {/* faceted wireframe shell */}
          <mesh ref={shellRef} scale={scale * 1.12}>
            <icosahedronGeometry args={[0.55, 1]} />
            <meshBasicMaterial
              color={skill.color}
              wireframe
              transparent
              opacity={(selected ? 0.7 : 0.3) * fade}
            />
          </mesh>

          {/* core gem */}
          <mesh ref={gemRef} scale={scale}>
            <icosahedronGeometry args={[0.55, 1]} />
            <meshPhysicalMaterial
              color={skill.color}
              emissive={skill.color}
              emissiveIntensity={emissiveIntensity * fade}
              roughness={0.25}
              metalness={0.35}
              clearcoat={1}
              clearcoatRoughness={0.15}
              transparent
              opacity={dimmed ? 0.45 : 1}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default memo(SkillOrb);
