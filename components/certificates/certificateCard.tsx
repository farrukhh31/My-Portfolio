"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Gamepad2,
  GraduationCap,
  Loader2,
} from "lucide-react";

import type { Certificate } from "./types";

type Props = {
  certificate: Certificate;
  active?: boolean;
};

const icons = {
  "game-dev": Gamepad2,
  ai: BrainCircuit,
  "web-dev": GraduationCap,
};

export default function CertificateCard({
  certificate,
  active = false,
}: Props) {
  const Icon = icons[certificate.category];
  const completed = certificate.status === "completed";

  return (
    <div
      className={`
        relative
        w-[340px]
        overflow-hidden
        rounded-[32px]
        border
        backdrop-blur-2xl
        transition-all
        duration-500

        ${
          active
            ? "border-cyan-400/40 bg-white/[0.06] shadow-[0_0_60px_rgba(34,211,238,.18)]"
            : "border-white/10 bg-white/[0.03] opacity-70"
        }
      `}
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-500/10" />

      <div className="relative p-7">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">

            <Icon
              size={30}
              className="text-cyan-400"
            />

          </div>

          {completed ? (
            <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <CheckCircle2 size={14} />
              Completed
            </span>
          ) : (
            <span className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
              <Loader2
                size={14}
                className="animate-spin"
              />
              In Progress
            </span>
          )}
        </div>

        {/* Title */}

        <h3 className="mt-8 text-2xl font-bold leading-tight text-white">
          {certificate.title}
        </h3>

        <p className="mt-2 text-slate-400">
          {certificate.issuer}
        </p>

        {/* Description */}

        {certificate.description && (
          <p className="mt-5 text-sm leading-7 text-slate-400">
            {certificate.description}
          </p>
        )}

        {/* Skills */}

        <div className="mt-7 flex flex-wrap gap-2">

          {certificate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
            >
              {skill}
            </span>
          ))}

        </div>

        {/* Progress */}

        {!completed && typeof certificate.progress === "number" && (

          <div className="mt-8">

            <div className="h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                style={{
                  width: `${certificate.progress}%`,
                }}
              />

            </div>

            <div className="mt-2 flex justify-between text-xs">

              <span className="text-slate-500">
                Progress
              </span>

              <span className="text-cyan-300">
                {certificate.progress}%
              </span>

            </div>

          </div>

        )}

        {/* Footer */}

        <div className="mt-10 flex items-center justify-between">

          <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400">
            {completed
              ? certificate.year
              : certificate.expectedCompletion}
          </span>

          {completed ? (

            <Link
              href={certificate.pdf ?? "#"}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              View

              <ArrowUpRight size={16} />

            </Link>

          ) : (

            <span className="text-sm text-amber-300">
              Ongoing
            </span>

          )}

        </div>

      </div>

    </div>
  );
}