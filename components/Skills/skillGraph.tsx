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

  // Three device tiers instead of one binary "compact" flag, so tablets get
  // their own middle ground rather than being lumped in with phones.
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");

  // Rendering budget scales down on smaller/less powerful tiers so the
  // scene stays smooth instead of dropping frames on phones and tablets.
  const quality: "low" | "medium" | "high" = isMobile
    ? "low"
    : isTablet
    ? "medium"
    : "high";
  const starCount = isMobile ? 350 : isTablet ? 650 : 1100;

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
      className="glass relative h-105 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl sm:h-130 md:rounded-3xl lg:h-162.5 xl:h-175"
    >
      {/* ================= Background atmosphere ================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.12),transparent_70%)]" />

      <div className="pointer-events-none absolute left-4 top-4 h-40 w-40 rounded-full bg-cyan-500/10 blur-[80px] sm:left-10 sm:top-10 sm:h-72 sm:w-72 sm:blur-[120px]" />
      <div className="pointer-events-none absolute right-4 top-8 h-44 w-44 rounded-full bg-violet-500/10 blur-[90px] sm:right-10 sm:top-20 sm:h-80 sm:w-80 sm:blur-[140px]" />
      <div className="pointer-events-none absolute bottom-4 left-1/3 h-36 w-36 rounded-full bg-sky-500/10 blur-[80px] sm:bottom-10 sm:h-64 sm:w-64 sm:blur-[120px]" />

      {/* ================= 3D scene, or graceful fallback ================= */}

      {webglSupported ? (
        <SkillsScene
          skills={skills}
          category={category}
          selectedSkill={selectedSkill}
          onSelect={setSelectedSkill}
          reducedMotion={reducedMotion}
          allowDrag={!isMobile}
          starCount={starCount}
          quality={quality}
        />
      ) : (
        <div
          className="h-full overflow-y-auto overscroll-contain p-3 sm:p-6"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <SkillsFallbackGrid
            skills={fallbackSkills}
            selectedSkill={selectedSkill}
            onSelect={setSelectedSkill}
          />
        </div>
      )}

      {/* ================= HUD chrome ================= */}

      <CornerBrackets />

      <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-x-3 gap-y-1.5 text-[9px] uppercase tracking-wider text-slate-400 sm:left-8 sm:top-7 sm:gap-x-4 sm:gap-y-2 sm:text-[11px]">
        {activeCategories.map((cat) => (
          <span key={cat} className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: categoryColor(cat) }}
            />
            {cat}
          </span>
        ))}
      </div>

      {webglSupported && (
        <p className="pointer-events-none absolute bottom-3 right-3 text-[9px] text-slate-500 sm:bottom-5 sm:right-5 sm:text-[11px]">
          {isMobile ? "Tap a node to explore" : "Drag to rotate · Click a node to explore"}
        </p>
      )}

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[80px] sm:h-48 sm:w-48 sm:blur-[120px]" />
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
