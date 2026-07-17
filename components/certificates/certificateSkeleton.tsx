"use client";

import { motion } from "framer-motion";

export default function CertificateSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_.9fr] items-center">

      {/* Preview Skeleton */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          relative
          h-[480px]
          overflow-hidden
          rounded-[36px]
          border
          border-white/10
          bg-white/[0.03]
        "
      >
        <div className="absolute inset-0 animate-pulse bg-white/[0.03]" />

        <div
          className="
            absolute
            inset-0
            -translate-x-full
            animate-[shimmer_2s_linear_infinite]
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
          "
        />
      </motion.div>

      {/* Details Skeleton */}

      <div
        className="
          rounded-[30px]
          border
          border-white/10
          bg-white/[0.03]
          p-8
        "
      >
        <div className="h-6 w-40 animate-pulse rounded bg-white/10" />

        <div className="mt-5 h-10 w-72 animate-pulse rounded bg-white/10" />

        <div className="mt-4 h-5 w-full animate-pulse rounded bg-white/10" />

        <div className="mt-2 h-5 w-4/5 animate-pulse rounded bg-white/10" />

        <div className="mt-10 flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
                h-9
                w-24
                animate-pulse
                rounded-full
                bg-white/10
              "
            />
          ))}
        </div>

        <div className="mt-12 h-12 w-44 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}