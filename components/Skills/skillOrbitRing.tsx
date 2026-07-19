"use client";

type Props = {
  radius: number;
  y: number;
  color: string;
};

export default function SkillOrbitRing({ radius, y, color }: Props) {
  return (
    <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.22} />
    </mesh>
  );
}
