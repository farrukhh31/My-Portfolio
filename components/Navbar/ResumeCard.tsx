"use client";

import { FileText, Download, Eye } from "lucide-react";

export default function ResumeCard({ open }: { open?: boolean }) {
  return (
    <div
      className={`
        absolute
        right-0
        top-14
        z-50
        w-64

        rounded-2xl
        border border-white/10
        bg-black/70
        backdrop-blur-xl
        shadow-2xl

        p-4

        translate-y-2

        group-hover:opacity-100
        group-hover:visible
        group-hover:pointer-events-auto
        group-hover:translate-y-0

        group-focus-within:opacity-100
        group-focus-within:visible
        group-focus-within:pointer-events-auto
        group-focus-within:translate-y-0

        transition-all
        duration-200
        ease-out

        ${
          open
            ? "opacity-100 visible pointer-events-auto translate-y-0"
            : "opacity-0 invisible pointer-events-none"
        }
      `}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-white
            text-black
          "
        >
          <FileText size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            Resume
          </h3>

          <p className="text-xs text-white/30">
            Full Stack Dev • Game Developer • AI
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href="/Farrukh_Ahmad_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2

            rounded-xl
            border
            border-white/10
            bg-white/10

            py-2

            text-xs
            text-white

            transition
            hover:bg-white/20
          "
        >
          <Eye size={14} />
          View
        </a>

        <a
          href="/Farrukh_Ahmad_Resume.pdf"
          download="Farrukh_Ahmad_Resume.pdf"
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2

            rounded-xl
            bg-white
            py-2

            text-xs
            text-black

            transition
            hover:scale-105
          "
        >
          <Download size={14} />
          Download
        </a>
      </div>
    </div>
  );
}