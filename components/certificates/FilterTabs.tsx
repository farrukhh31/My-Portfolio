"use client";

import { motion } from "framer-motion";
import { CertificateCategory } from "./types";

type Filter = {
  label: string;
  value: "all" | CertificateCategory;
};

const FILTERS: Filter[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Game Dev",
    value: "game-dev",
  },
  {
    label: "AI",
    value: "ai",
  },
  {
    label: "Web Dev",
    value: "web-dev",
  },
];

type Props = {
  active: "all" | CertificateCategory;
  onChange: (value: "all" | CertificateCategory) => void;
};

export default function FilterTabs({
  active,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className="relative overflow-hidden rounded-full"
          >
            {isActive && (
              <motion.div
                layoutId="certificate-filter"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
                className="absolute inset-0 rounded-full bg-cyan-400/15 border border-cyan-400/40"
              />
            )}

            <span
              className={`relative z-10 block px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? "text-cyan-300"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {filter.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}