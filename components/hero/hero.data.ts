export const ROLES = [
  "Full Stack Developer",
  "AI Engineer",
  "Frontend Developer",
  "Backend Developer",
  "DevOps & Automation",
  "Game Developer",
  "AR/VR Developer",
  "Python Developer",
  "Creative Developer",
] as const;

/** [word, isHighlighted] — mirrors the original word-by-word reveal. */
export const DESCRIPTION_WORDS: Array<[string, boolean]> = [
  ["I", false],
  ["build", false],
  ["intelligent,", true],
  ["scalable,", true],
  ["and", false],
  ["immersive", true],
  ["digital", false],
  ["experiences—from", false],
  ["modern", false],
  ["web", true],
  ["applications", true],
  ["and", false],
  ["AI-powered", true],
  ["solutions", true],
  ["to", false],
  ["game", true],
  ["development,", true],
  ["AR/VR,", true],
  ["and", false],
  ["DevOps", true],
  ["automation.", true],
];

export const STATS = [
  {
    id: "projects",
    target: 8,
    suffix: "+",
    label: "Projects",
    icon: "layers",
  },
  {
    id: "technologies",
    target: 20,
    suffix: "+",
    label: "Technologies",
    icon: "swap",
  },
  {
    id: "years",
    target: 3,
    suffix: "+",
    label: "Years learning",
    icon: "spark",
  },
] as const;

import type { LucideIcon } from "lucide-react";
import {
  Gamepad2,
  Globe,
  Code2,
  Layers,
  Workflow,
  Glasses,
  Terminal,
  Sparkles,
  Server,
  MonitorSmartphone,
  BrainCircuit,
} from "lucide-react";

export type TechItem = {
  name: string;
  color: string;
  icon?: LucideIcon;
};

export const TECH_LIST: TechItem[] = [
  // stack — text badges (brand names read better as text than as a generic glyph)
  { name: "React", color: "#61DAFB" },
  { name: "Next", color: "#ffffff" },
  { name: "TS", color: "#3178C6" },
  { name: "Node", color: "#5FA04E" },
  { name: "Docker", color: "#2496ED" },
  { name: "Unity", color: "#ffffff" },
  { name: "Motion", color: "#818cf8" },
  { name: "GitHub", color: "#ffffff" },
  // skills / domains — icon badges
  { name: "Gaming", color: "#f472b6", icon: Gamepad2 },
  { name: "Web Dev", color: "#22d3ee", icon: Globe },
  { name: "Software Dev", color: "#a78bfa", icon: Code2 },
  { name: "Full Stack Dev", color: "#34d399", icon: Layers },
  { name: "DevOps & Automation", color: "#fb923c", icon: Workflow },
  { name: "AR/VR", color: "#e879f9", icon: Glasses },
  { name: "Python", color: "#facc15", icon: Terminal },
  { name: "Gen AI", color: "#38bdf8", icon: Sparkles },
  { name: "Backend Dev", color: "#4ade80", icon: Server },
  { name: "Frontend Dev", color: "#60a5fa", icon: MonitorSmartphone },
  { name: "AI", color: "#c084fc", icon: BrainCircuit },
];

export const ORBIT_RADII = [140, 200, 260] as const;

export const PARTICLE_COLORS = ["#22d3ee", "#3b82f6", "#8b5cf6"];
