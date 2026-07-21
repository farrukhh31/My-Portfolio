"use client";

import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

import { CategoryFilter, PlacedSkill, Skill } from "./types";
import { useSkillPositions } from "./useSkillPositions";
import SkillOrb from "./skillOrb";
import SkillOrbitRing from "./skillOrbitRing";
import SkillEdge from "./skillEdge";

type Quality = "low" | "medium" | "high";

type Props = {
  skills: Skill[];
  category: CategoryFilter;
  selectedSkill: Skill;
  onSelect: (skill: Skill) => void;
  reducedMotion: boolean;
  allowDrag: boolean;
  starCount: number;
  // Controls DPR ceiling and whether the postprocessing pass runs at all —
  // phones and tablets skip the most expensive work to stay smooth.
  quality: Quality;
};

const DPR_BY_QUALITY: Record<Quality, [number, number]> = {
  low: [1, 1],
  medium: [1, 1.5],
  high: [1, 2],
};

// Gently re-centers the orbit target on whichever skill is selected, so the
// whole constellation gives a subtle "focus" nudge instead of a hard cut.
function CameraRig({
  target,
  reducedMotion,
}: {
  target: [number, number, number];
  reducedMotion: boolean;
}) {
  const controls = useThree((state) => state.controls) as unknown as {
    target: THREE.Vector3;
    update: () => void;
  } | null;
  const scratch = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!controls) return;
    scratch.set(target[0] * 0.3, target[1] * 0.3, target[2] * 0.3);
    controls.target.lerp(scratch, reducedMotion ? 1 : Math.min(1, delta * 2));
    controls.update();
  });

  return null;
}

export default function SkillsScene({
  skills,
  category,
  selectedSkill,
  onSelect,
  reducedMotion,
  allowDrag,
  starCount,
  quality,
}: Props) {
  const { placed, rings, positionMap } = useSkillPositions(skills);

  const selected: PlacedSkill =
    placed.find((skill) => skill.id === selectedSkill.id) ?? placed[0];

  if (!selected) return null;

  const bloomEnabled = !reducedMotion && quality !== "low";

  return (
    <Canvas
      dpr={DPR_BY_QUALITY[quality]}
      camera={{ position: [0, 2, 13.5], fov: 34 }}
      gl={{
        alpha: true,
        antialias: quality !== "low",
        powerPreference: "high-performance",
      }}
      // Lets three.js quietly drop resolution under load instead of
      // stalling — keeps interaction responsive on weaker devices.
      performance={{ min: 0.5 }}
      style={{ touchAction: allowDrag ? "none" : "pan-y" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[8, 6, 8]} intensity={1.3} color="#22d3ee" />
      <pointLight position={[-8, -4, -6]} intensity={0.9} color="#a78bfa" />

      <Suspense fallback={null}>
        <Stars
          radius={60}
          depth={40}
          count={starCount}
          factor={2}
          fade
          speed={reducedMotion ? 0 : 0.6}
        />

        {rings.map((ring) => (
          <SkillOrbitRing
            key={ring.category}
            radius={ring.radius}
            y={ring.y}
            color={ring.color}
          />
        ))}

        {selected.related.map((id) => {
          const target = positionMap.get(id);
          if (!target) return null;
          return (
            <SkillEdge
              key={id}
              start={selected.position}
              end={target}
              color={selected.color}
              reducedMotion={reducedMotion}
            />
          );
        })}

        {placed.map((skill) => (
          <SkillOrb
            key={skill.id}
            skill={skill}
            selected={skill.id === selectedSkill.id}
            dimmed={category !== "All" && skill.category !== category}
            reducedMotion={reducedMotion}
            onSelect={onSelect}
          />
        ))}
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate={allowDrag}
        enableZoom
        minDistance={8}
        maxDistance={20}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.08}
      />

      <CameraRig target={selected.position} reducedMotion={reducedMotion} />

      {bloomEnabled && (
        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={quality === "high" ? 1.35 : 0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Preload all />
    </Canvas>
  );
}
