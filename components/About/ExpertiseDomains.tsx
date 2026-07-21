"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Boxes,
  Gamepad2,
  Globe,
  Layers,
  ServerCog,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useState } from "react";

interface Domain {
  id: string;
  label: string;
  shortLabel: string;
  icon: typeof Globe;
  headline: string;
  description: string;
  features: string[];
  stack: string[];
  metric: { value: string; label: string };
}

const domains: Domain[] = [
  {
    id: "fullstack",
    label: "Full Stack Development",
    shortLabel: "Full Stack",
    icon: Globe,
    headline: "End-to-end web applications",
    description:
      "I design and ship complete products — responsive frontends, type-safe APIs, and databases that hold up under real traffic. Comfortable owning a feature from Figma to production.",
    features: [
      "Component-driven UIs with React & Next.js",
      "REST / GraphQL APIs with Node.js & Express",
      "Schema design with MongoDB & PostgreSQL",
      "Auth, caching, and performance optimization",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    metric: { value: "5+", label: "Full stack projects shipped" },
  },
  {
    id: "gamedev",
    label: "Game Development",
    shortLabel: "Game Dev",
    icon: Gamepad2,
    headline: "Interactive & immersive experiences",
    description:
      "Specializing in Gaming & Animation, I build gameplay systems in Unity — from mechanics and physics to UI and animation state machines that make a game feel responsive.",
    features: [
      "Gameplay systems & mechanics in Unity (C#)",
      "Animation state machines & character controllers",
      "Physics-based interactions and level design",
      "Performance profiling for smooth frame rates",
    ],
    stack: ["Unity", "C#", "Blender", "Animation Rigging"],
    metric: { value: "10+", label: "Playable game builds" },
  },
  {
    id: "devops",
    label: "DevOps & Automation",
    shortLabel: "DevOps",
    icon: ServerCog,
    headline: "Automated, reliable delivery",
    description:
      "I like removing manual steps from the path to production — containerizing apps, wiring up CI/CD, and scripting the boring parts so deployments become routine, not risky.",
    features: [
      "Containerization with Docker & Docker Compose",
      "CI/CD pipelines with GitHub Actions",
      "Linux server administration & shell scripting",
      "Monitoring, logging, and automated workflows",
    ],
    stack: ["Docker", "GitHub Actions", "Linux", "Bash", "Nginx"],
    metric: { value: "3+", label: "Automated workflows built" },
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    shortLabel: "AI / ML",
    icon: Bot,
    headline: "Practical, applied AI",
    description:
      "I integrate AI where it adds real value — LLM-powered features, intelligent automation, and tools that use APIs like OpenAI/Anthropic to make products smarter, not just flashier.",
    features: [
      "LLM integration (OpenAI, Anthropic APIs)",
      "Prompt engineering for reliable outputs",
      "AI-assisted automation & internal tools",
      "Exploring ML fundamentals & applied use cases",
    ],
    stack: ["OpenAI API", "Python", "LangChain-style tooling", "Automation"],
    metric: { value: "AI-first", label: "Approach to new builds" },
  },
];

export default function ExpertiseDomains() {
  const [active, setActive] = useState(domains[0].id);
  const current = domains.find((d) => d.id === active) ?? domains[0];

  return (
    <section className="mt-28">

      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            What I Do
          </p>

          <h3 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            Four disciplines,
            <br className="hidden md:block" />
            <span className="text-gradient"> one engineer.</span>
          </h3>
        </div>

        <p className="max-w-md text-sm text-slate-400 sm:text-base">
          Pick a field to see how I actually work in it — the tools,
          the habits, and what I focus on delivering.
        </p>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6 sm:gap-3">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isActive = domain.id === active;

          return (
            <button
              key={domain.id}
              onClick={() => setActive(domain.id)}
              className={`
                group relative flex items-center gap-2 rounded-2xl border px-3.5 py-2.5
                transition-all duration-300 sm:gap-3 sm:px-5 sm:py-3
                ${
                  isActive
                    ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_35px_rgba(34,211,238,.2)]"
                    : "border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/5"
                }
              `}
            >
              <Icon
                size={18}
                className={
                  isActive
                    ? "text-cyan-400"
                    : "text-slate-500 group-hover:text-slate-300"
                }
              />

              <span
                className={`text-sm font-semibold ${
                  isActive ? "text-white" : "text-slate-400"
                }`}
              >
                <span className="hidden sm:inline">{domain.label}</span>
                <span className="sm:hidden">{domain.shortLabel}</span>
              </span>

              {isActive && (
              <motion.div
                layoutId="expertise-underline"
                className="absolute -bottom-6.25 left-0 h-0.5 w-full bg-linear-to-r from-cyan-400 to-purple-500"
              />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl sm:mt-10 sm:rounded-4xl sm:p-8 md:p-12">

        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-[60px] sm:h-72 sm:w-72 sm:blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/10 blur-[60px] sm:h-72 sm:w-72 sm:blur-[100px]" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 grid gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          >
            {/* Left: description + features */}
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 sm:mb-6 sm:h-14 sm:w-14">
                <current.icon size={24} className="text-cyan-400 sm:hidden" />
                <current.icon size={28} className="hidden text-cyan-400 sm:block" />
              </div>

              <h4 className="text-2xl font-bold sm:text-3xl">
                {current.headline}
              </h4>

              <p className="mt-4 max-w-xl leading-7 text-slate-400 sm:mt-5 sm:leading-8">
                {current.description}
              </p>

              <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                {current.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <Sparkles
                      size={16}
                      className="mt-1 shrink-0 text-cyan-400"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: stack + metric */}
            <div className="flex flex-col justify-between gap-8">
              <div className="rounded-3xl border border-white/10 bg-white/3 p-6">
                <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-slate-500">
                  <Layers size={14} className="text-cyan-400" />
                  Tools I reach for
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {current.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-400/20 bg-linear-to-br from-cyan-400/10 to-purple-500/10 p-6">
                <p className="text-4xl font-black text-white">
                  {current.metric.value}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                  <Workflow size={14} className="text-cyan-400" />
                  {current.metric.label}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Boxes size={14} />
                <span>
                  {domains.findIndex((d) => d.id === current.id) + 1} of{" "}
                  {domains.length} disciplines
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
