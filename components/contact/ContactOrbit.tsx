"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Code2, Gamepad2, Server, Sparkles } from "lucide-react";

const nodes = [
  { label: "Full-Stack", icon: Code2, color: "#22d3ee", angle: 0 },
  { label: "Game Dev", icon: Gamepad2, color: "#a78bfa", angle: 90 },
  { label: "DevOps", icon: Server, color: "#fbbf24", angle: 180 },
  { label: "AI / ML", icon: Sparkles, color: "#34d399", angle: 270 },
];

const RADIUS = 150;
const DURATION = 16;

function OrbitNode({
  node,
  rotation,
}: {
  node: (typeof nodes)[number];
  rotation: MotionValue<number>;
}) {
  
  const nodeAngle = useTransform(rotation, (r) => r + node.angle);

  const opacity = useTransform(nodeAngle, (deg) => {
    const depth = Math.cos((deg * Math.PI) / 180);
    const front = Math.max(depth, 0);
    return 0.05 + 0.6 * Math.pow(front, 3) + (depth < 0 ? 0.04 : 0.3 * front);
  });

  const transform = useTransform(nodeAngle, (deg) => {
    const depth = Math.cos((deg * Math.PI) / 180);
    const scale = 0.65 + 0.4 * Math.max(depth, 0);
    return `translate(-50%, -50%) rotateY(${deg}deg) translateZ(${RADIUS}px) scale(${scale})`;
  });

  const counterRotate = useTransform(nodeAngle, (deg) => -deg);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ transform, transformStyle: "preserve-3d", opacity }}
    >
      {/* Counter-rotate so the badge stays billboarded toward the viewer */}
      <motion.div
        style={{ rotateY: counterRotate }}
        className="flex flex-col items-center gap-2"
      >
        <div
          className="glass flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            borderColor: `${node.color}45`,
            boxShadow: `0 8px 28px -8px ${node.color}55, inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          <node.icon size={22} style={{ color: node.color }} />
        </div>
        <span
          className="glass whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
          style={{ borderColor: `${node.color}45`, color: node.color }}
        >
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function ContactOrbit() {
  const prefersReducedMotion = useReducedMotion();
  const rotation = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const controls = animate(rotation, 360, {
      duration: DURATION,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [prefersReducedMotion, rotation]);

  return (
    <div
      className="relative mx-auto mb-6 flex h-65 w-full max-w-md items-center justify-center sm:mb-8 sm:h-85"
      style={{ perspective: "1400px" }}
    >
      <div
        className="absolute"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          transformStyle: "preserve-3d",
        }}
      >
        {nodes.map((node) => (
          <OrbitNode key={node.label} node={node} rotation={rotation} />
        ))}
      </div>

      {/* Central core — sits outside the rotating group so it never spins */}
      <div className="glass border-gradient glow relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full text-center sm:h-36 sm:w-36">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
        </span>
        <p className="mt-2 text-xs font-semibold text-white sm:text-sm">
          Available
        </p>
        <p className="mt-0.5 max-w-24 text-[10px] leading-tight text-slate-400 sm:max-w-28 sm:text-[11px]">
          For Internships &amp; Freelance Work
        </p>
      </div>
      </div>
  );
}