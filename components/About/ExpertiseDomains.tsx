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

      <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="uppercase tracking-[0.35em] text-cyan-400">
            What I Do
          </p>

          <h3 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            Four disciplines,
            <br className="hidden md:block" />
            <span className="text-gradient"> one engineer.</span>
          </h3>
        </div>

        <p className="max-w-md text-slate-400">
          Pick a field to see how I actually work in it — the tools,
          the habits, and what I focus on delivering.
        </p>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap gap-3 border-b border-white/10 pb-6">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isActive = domain.id === active;

          return (
            <button
              key={domain.id}
              onClick={() => setActive(domain.id)}
              className={`
                group relative flex items-center gap-3 rounded-2xl border px-5 py-3
                transition-all duration-300
                ${
                  isActive
                    ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_35px_rgba(34,211,238,.2)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
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
                  className="absolute -bottom-[25px] left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 to-purple-500"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="relative mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl md:p-12">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          >
            {/* Left: description + features */}
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
                <current.icon size={28} className="text-cyan-400" />
              </div>

              <h4 className="text-3xl font-bold">
                {current.headline}
              </h4>

              <p className="mt-5 max-w-xl leading-8 text-slate-400">
                {current.description}
              </p>

              <ul className="mt-8 space-y-4">
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
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
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

              <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 p-6">
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
