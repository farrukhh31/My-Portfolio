"use client";

import { useMemo } from "react";
import { Skill, PlacedSkill, SkillCategory } from "./types";
import { CATEGORY_ORDER, categoryColor } from "./categoryTheme";

const RING_BASE_RADIUS = 2.0;
const RING_GAP = 0.78;

export interface SkillRing {
  category: SkillCategory;
  radius: number;
  y: number;
  color: string;
}

// Small deterministic hash so the same skill always lands at the same
// "organic" jitter instead of re-randomizing on every render.
function seedFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 997;
  }
  return hash / 997;
}

export function useSkillPositions(skills: Skill[]) {
  return useMemo(() => {
    const byCategory = new Map<SkillCategory, Skill[]>();
    for (const skill of skills) {
      const list = byCategory.get(skill.category) ?? [];
      list.push(skill);
      byCategory.set(skill.category, list);
    }

    const activeCategories = CATEGORY_ORDER.filter((category) =>
      byCategory.has(category)
    );
    const ringCount = activeCategories.length;

    const rings: SkillRing[] = [];
    const placed: PlacedSkill[] = [];

    activeCategories.forEach((category, ringIndex) => {
      const members = byCategory.get(category) ?? [];
      const radius = RING_BASE_RADIUS + ringIndex * RING_GAP;
      const y = (ringIndex - (ringCount - 1) / 2) * 1.65;
      const color = categoryColor(category);
      const phase = ringIndex * 0.9;

      rings.push({ category, radius, y, color });

      members.forEach((skill, i) => {
        const angle = (i / members.length) * Math.PI * 2 + phase;
        const jitter = (seedFor(skill.id) - 0.5) * 0.6;

        placed.push({
          ...skill,
          color,
          position: [
            Math.cos(angle) * radius,
            y + jitter,
            Math.sin(angle) * radius,
          ],
        });
      });
    });

    const positionMap = new Map<string, [number, number, number]>();
    placed.forEach((skill) => positionMap.set(skill.id, skill.position));

    return { placed, rings, positionMap };
  }, [skills]);
}
