export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Game Development"
  | "AI";

// The filter bar can show "All"; an individual skill never belongs to "All".
export type CategoryFilter = SkillCategory | "All";

export type SkillLevel = "Advanced" | "Strong" | "Comfortable";

export interface Skill {
  id: string;

  name: string;

  icon: string;

  category: SkillCategory;

  level: SkillLevel;

  // 0-100. Drives the radial meter in the details panel and the
  // emissive/glow strength of the skill's node in the 3D graph.
  proficiency: number;

  experience: string;

  description: string;

  projects: string[];

  related: string[];
}

// A skill positioned in 3D space, produced by useSkillPositions.
export interface PlacedSkill extends Skill {
  position: [number, number, number];
  color: string;
}