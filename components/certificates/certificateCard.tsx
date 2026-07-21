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
        w-[78vw]
        max-w-75
        overflow-hidden
        rounded-3xl
        border
        backdrop-blur-2xl
        transition-all
        duration-500
        sm:w-85
        sm:max-w-none
        sm:rounded-4xl

        ${
          active
            ? "border-cyan-400/40 bg-white/6 shadow-[0_0_60px_rgba(34,211,238,.18)]"
            : "border-white/10 bg-white/3 opacity-70"
        }
      `}
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-400/10 via-transparent to-fuchsia-500/10" />

      <div className="relative p-5 sm:p-7">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 sm:h-16 sm:w-16">

            <Icon className="h-6 w-6 text-cyan-400 sm:h-8 sm:w-8" />

          </div>

          {completed ? (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300 sm:gap-2 sm:px-3 sm:text-xs">
              <CheckCircle2 size={12} className="sm:hidden" />
              <CheckCircle2 size={14} className="hidden sm:block" />
              Completed
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] text-amber-300 sm:gap-2 sm:px-3 sm:text-xs">
              <Loader2
                size={12}
                className="animate-spin sm:hidden"
              />
              <Loader2
                size={14}
                className="hidden animate-spin sm:block"
              />
              In Progress
            </span>
          )}
        </div>

        {/* Title */}

        <h3 className="mt-5 line-clamp-2 text-lg font-bold leading-tight text-white sm:mt-8 sm:text-2xl">
          {certificate.title}
        </h3>

        <p className="mt-1.5 text-sm text-slate-400 sm:mt-2 sm:text-base">
          {certificate.issuer}
        </p>

        {/* Description */}

        {certificate.description && (
          <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-400 sm:mt-5 sm:text-sm sm:leading-7">
            {certificate.description}
          </p>
        )}

        {/* Skills */}

        <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-7 sm:gap-2">

          {certificate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] text-cyan-300 sm:px-3 sm:text-xs"
            >
              {skill}
            </span>
          ))}

        </div>

        {/* Progress */}

        {!completed && typeof certificate.progress === "number" && (

          <div className="mt-5 sm:mt-8">

            <div className="h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-linear-to-r from-cyan-400 to-fuchsia-500"
                style={{
                  width: `${certificate.progress}%`,
                }}
              />

            </div>

            <div className="mt-2 flex justify-between text-[11px] sm:text-xs">

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

        <div className="mt-6 flex items-center justify-between gap-2 sm:mt-10">

          <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400 sm:px-4 sm:py-2 sm:text-sm">
            {completed
              ? certificate.year
              : certificate.expectedCompletion}
          </span>

          {completed ? (

            <Link
              href={certificate.pdf ?? "#"}
              target="_blank"
              className="flex items-center gap-1.5 rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-medium text-slate-950 transition hover:bg-cyan-400 sm:gap-2 sm:px-5 sm:py-2 sm:text-sm"
            >
              View

              <ArrowUpRight size={14} className="sm:hidden" />
              <ArrowUpRight size={16} className="hidden sm:block" />

            </Link>

          ) : (

            <span className="text-xs text-amber-300 sm:text-sm">
              Ongoing
            </span>

          )}

        </div>

      </div>

    </div>
  );
}
