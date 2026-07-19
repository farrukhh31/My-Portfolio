"use client";

import dynamic from "next/dynamic";

import { useWebglSupport } from "@/hooks/useWebglSupport";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { CategoryFilter, Skill } from "./types";
import { CATEGORY_ORDER, categoryColor } from "./categoryTheme";
import SkillsFallbackGrid from "./skillsFallbackGrid";

// The 3D scene touches the WebGL canvas/DOM directly, so it must never be
// part of the server-rendered HTML — next/dynamic with ssr:false handles that.
const SkillsScene = dynamic(() => import("./skillsScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
      Loading 3D skill graph…
    </div>
  ),
});

type Props = {
  skills: Skill[];
  category: CategoryFilter;
  selectedSkill: Skill;
  setSelectedSkill: (skill: Skill) => void;
};

export default function SkillGraph({
  skills,
  category,
  selectedSkill,
  setSelectedSkill,
}: Props) {
  const webglSupported = useWebglSupport();
  const reducedMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 768px)");

  const fallbackSkills =
    category === "All"
      ? skills
      : skills.filter((skill) => skill.category === category);

  const activeCategories = CATEGORY_ORDER.filter((cat) =>
    skills.some((skill) => skill.category === cat)
  );

  return (
    <div
      role="img"
      aria-label="Interactive 3D constellation of skills, grouped and color-coded by discipline"
      className="glass relative h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-xl lg:h-[700px]"
    >
      {/* ================= Background atmosphere ================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.12),transparent_70%)]" />

      <div className="pointer-events-none absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-20 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-sky-500/10 blur-[120px]" />

      {/* ================= 3D scene, or graceful fallback ================= */}

      {webglSupported ? (
        <SkillsScene
          skills={skills}
          category={category}
          selectedSkill={selectedSkill}
          onSelect={setSelectedSkill}
          reducedMotion={reducedMotion}
          allowDrag={!isCompact}
          starCount={isCompact ? 500 : 1100}
        />
      ) : (
        <div className="h-full overflow-y-auto p-6">
          <SkillsFallbackGrid
            skills={fallbackSkills}
            selectedSkill={selectedSkill}
            onSelect={setSelectedSkill}
          />
        </div>
      )}

      {/* ================= HUD chrome ================= */}

      <CornerBrackets />

      <div className="pointer-events-none absolute left-8 top-7 flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-wider text-slate-400">
        {activeCategories.map((cat) => (
          <span key={cat} className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: categoryColor(cat) }}
            />
            {cat}
          </span>
        ))}
      </div>

      {webglSupported && (
        <p className="pointer-events-none absolute bottom-5 right-5 text-[11px] text-slate-500">
          {isCompact ? "Tap a node to explore" : "Drag to rotate · Click a node to explore"}
        </p>
      )}

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
    </div>
  );
}

function CornerBrackets() {
  const common = "pointer-events-none absolute h-7 w-7 border-cyan-400/50";
  return (
    <>
      <span className={`${common} left-3 top-3 border-l-2 border-t-2`} />
      <span className={`${common} right-3 top-3 border-r-2 border-t-2`} />
      <span className={`${common} bottom-3 left-3 border-b-2 border-l-2`} />
      <span className={`${common} bottom-3 right-3 border-b-2 border-r-2`} />
    </>
  );
}
