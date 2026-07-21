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
      <div className="mb-8 text-center sm:mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 sm:text-sm sm:tracking-[0.35em]">
          Engineering Stack
        </p>

        <h2 className="mt-3 text-3xl font-black text-white sm:mt-4 sm:text-4xl lg:text-5xl">
          Interactive Skill Map
        </h2>

        <p className="mx-auto mt-4 max-w-3xl px-2 text-sm text-slate-400 sm:mt-6 sm:px-0 sm:text-base">
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

      {/* Below xl the detail panel gets its own full-width row instead of
          being squeezed beside the graph — keeps both legible on tablets
          and small laptops. */}
      <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-8 xl:grid-cols-[1.5fr_1fr] xl:gap-10">
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
