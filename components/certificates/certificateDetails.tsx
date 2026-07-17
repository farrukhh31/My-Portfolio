"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import type { Certificate } from "./types";

type Props = {
  certificate: Certificate;
};

export default function CertificateDetails({
  certificate,
}: Props) {
  const completed =
    certificate.status === "completed";

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.04]
        p-8
        backdrop-blur-2xl
        shadow-[0_25px_70px_rgba(0,0,0,.35)]
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-24
          -top-24
          h-60
          w-60
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
      />

      <div className="relative">

        {/* Status */}

        <div className="flex items-center justify-between">

          {completed ? (
            <span
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-400/30
                bg-emerald-400/10
                px-4
                py-2
                text-sm
                text-emerald-300
              "
            >
              <CheckCircle2 size={16} />
              Completed
            </span>
          ) : (
            <span
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-amber-400/30
                bg-amber-400/10
                px-4
                py-2
                text-sm
                text-amber-300
              "
            >
              <Loader2
                size={16}
                className="animate-spin"
              />

              In Progress
            </span>
          )}

          <div
            className="
              flex
              items-center
              gap-2
              text-slate-400
            "
          >
            <Calendar size={16} />
            {certificate.year}
          </div>

        </div>

        {/* Title */}

        <h2
          className="
            mt-8
            text-3xl
            font-bold
            leading-tight
            text-white
          "
        >
          {certificate.title}
        </h2>

        <p
          className="
            mt-2
            text-cyan-300
          "
        >
          {certificate.issuer}
        </p>

        {/* Description */}

        <p
          className="
            mt-6
            leading-7
            text-slate-400
          "
        >
          {certificate.description}
        </p>

        {/* Skills */}

        <div className="mt-8">

          <p
            className="
              mb-3
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Skills
          </p>

          <div className="flex flex-wrap gap-2">

            {certificate.skills.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-400/10
                  px-3
                  py-1.5
                  text-xs
                  text-cyan-300
                "
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* Progress */}

        {!completed &&
          certificate.progress && (

            <div className="mt-8">

              <div className="flex justify-between text-sm">

                <span className="text-slate-400">
                  Progress
                </span>

                <span className="text-cyan-300">
                  {certificate.progress}%
                </span>

              </div>

              <div
                className="
                  mt-3
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-white/10
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-amber-400
                    to-cyan-400
                  "
                  style={{
                    width:
                      `${certificate.progress}%`,
                  }}
                />
              </div>

              {certificate.expectedCompletion && (
                <p
                  className="
                    mt-3
                    text-sm
                    text-slate-500
                  "
                >
                  Expected Completion:
                  {" "}
                  {certificate.expectedCompletion}
                </p>
              )}

            </div>

          )}

        {/* Credential */}

        {certificate.credentialId && (

          <div
            className="
              mt-8
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-4
            "
          >

            <ShieldCheck
              size={20}
              className="text-cyan-400"
            />

            <div>

              <p className="text-xs text-slate-500">
                Credential ID
              </p>

              <p className="text-sm text-white">
                {certificate.credentialId}
              </p>

            </div>

          </div>

        )}

        {/* Button */}

        <div className="mt-10">

          {completed && certificate.pdf ? (

            <Link
              href={certificate.pdf}
              target="_blank"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-cyan-400
                px-6
                py-3
                font-medium
                text-slate-950
                transition
                hover:scale-105
              "
            >
              View Certificate

              <ArrowUpRight size={18} />

            </Link>

          ) : (

            <button
              disabled
              className="
                rounded-full
                border
                border-white/10
                px-6
                py-3
                text-slate-500
              "
            >
              Certificate Coming Soon
            </button>

          )}

        </div>

      </div>
    </div>
  );
}