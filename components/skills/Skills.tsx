"use client";

import { useState } from "react";

import SkillFilters from "./skillsFilter";
import SkillGraph from "./skillGraph";
import SkillDetails from "./skillDetails";

import { skills } from "./skillsData";
import { SkillCategory } from "./types";

export default function Skills() {
  const [category, setCategory] =
    useState<SkillCategory>("All");

  const [selectedSkill, setSelectedSkill] =
    useState(skills[0]);

  return (
    <section
      id="skills"
      className="container-width section-padding"
    >
      <div className="mb-16 text-center">

        <p className="uppercase tracking-[0.35em] text-cyan-400">
          Engineering Stack
        </p>

        <h2 className="mt-4 text-5xl font-black">
          Interactive Skill Map
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-slate-400">
          Every technology here represents
          something I've built, explored,
          or used in real-world projects.
        </p>

      </div>

      <SkillFilters
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
        />

      </div>

    </section>
  );
}