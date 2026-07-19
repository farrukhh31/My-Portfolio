import { SkillCategory } from "./types";

// Rendering order also doubles as ring order in the 3D graph (innermost
// ring first). Keeping one ordered list means the filter bar, the legend,
// and the scene layout can never fall out of sync with each other.
export const CATEGORY_ORDER: SkillCategory[] = [
  "Frontend",
  "Languages",
  "Backend",
  "Database",
  "DevOps",
  "Game Development",
  "AI",
];

export const CATEGORY_THEME: Record<SkillCategory, { color: string; glow: string }> = {
  Frontend: { color: "#22d3ee", glow: "rgba(34,211,238,.45)" },
  Languages: { color: "#a78bfa", glow: "rgba(167,139,250,.45)" },
  Backend: { color: "#34d399", glow: "rgba(52,211,153,.45)" },
  Database: { color: "#fbbf24", glow: "rgba(251,191,36,.45)" },
  DevOps: { color: "#38bdf8", glow: "rgba(56,189,248,.45)" },
  "Game Development": { color: "#f472b6", glow: "rgba(244,114,182,.45)" },
  AI: { color: "#f87171", glow: "rgba(248,113,113,.45)" },
};

export function categoryColor(category: SkillCategory): string {
  return CATEGORY_THEME[category]?.color ?? "#22d3ee";
}
