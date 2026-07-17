export type SkillCategory =
  | "All"
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Game Development";

export interface Skill {
  id: string;

  name: string;

  icon: string;

  category: SkillCategory;

  level: "Advanced" | "Strong" | "Comfortable";

  experience: string;

  description: string;

  projects: string[];

  related: string[];

  x: number;

  y: number;
}