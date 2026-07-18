"use client";

import { useState } from "react";

import SkillFilters from "./skillsFilter";
import SkillGraph from "./skillGraph";
import SkillDetails from "./skillDetails";
import SkillStats from "./skillStats";
import SkillsFeatured from "./skillsFeatured";

import { skills } from "./skillsData";
import { CategoryFilter } from "./types";

export default function Skills() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  return (
    <section id="skills" className="container-width section-padding">
      <div className="mb-12 text-center">
        <p className="uppercase tracking-[0.35em] text-cyan-400">
          Engineering Stack
        </p>

        <h2 className="mt-4 text-5xl font-black text-white">
          Interactive Skill Map
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-slate-400">
          Every technology here represents something I&apos;ve built,
          explored, or used in real-world projects — arranged as a live
          3D constellation, grouped and color-coded by discipline.
        </p>
      </div>

      <SkillStats skills={skills} />

      <SkillFilters
        skills={skills}
        selected={category}
        onChange={setCategory}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <SkillGraph
          skills={skills}
          category={category}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />

        <SkillDetails
          skill={selectedSkill}
          allSkills={skills}
          onSelect={setSelectedSkill}
        />
      </div>

      <SkillsFeatured
        skills={skills}
        selectedSkill={selectedSkill}
        onSelect={setSelectedSkill}
      />

      {/* WebGL canvases aren't crawlable or screen-reader friendly on their
          own — this keeps every skill discoverable regardless. */}
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill.id}>
            {skill.name} — {skill.category}, {skill.level}, {skill.experience}
          </li>
        ))}
      </ul>
    </section>
  );
}
