"use client";

import { motion } from "framer-motion";

export default function CertificateSkeleton() {
  return (
    <div className="grid gap-8 sm:gap-10 items-center lg:grid-cols-[1.35fr_.9fr]">

      {/* Preview Skeleton */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          relative
          h-70
          overflow-hidden
          rounded-[22px]
          border
          border-white/10
          bg-white/3
          sm:h-95
          sm:rounded-[36px]
          lg:h-120
        "
      >
        <div className="absolute inset-0 animate-pulse bg-white/3" />

        <div
          className="
            absolute
            inset-0
            -translate-x-full
            animate-[shimmer_2s_linear_infinite]
            bg-linear-to-r
            from-transparent
            via-white/10
            to-transparent
          "
        />
      </motion.div>

      {/* Details Skeleton */}

      <div
        className="
          rounded-[22px]
          border
          border-white/10
          bg-white/3
          p-5
          sm:rounded-[30px]
          sm:p-8
        "
      >
        <div className="h-5 w-32 animate-pulse rounded bg-white/10 sm:h-6 sm:w-40" />

        <div className="mt-4 h-8 w-full max-w-[18rem] animate-pulse rounded bg-white/10 sm:mt-5 sm:h-10 sm:max-w-[18rem]" />

        <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/10 sm:mt-4 sm:h-5" />

        <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-white/10 sm:h-5" />

        <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
                h-8
                w-20
                animate-pulse
                rounded-full
                bg-white/10
                sm:h-9
                sm:w-24
              "
            />
          ))}
        </div>

        <div className="mt-10 h-11 w-36 animate-pulse rounded-xl bg-white/10 sm:mt-12 sm:h-12 sm:w-44" />
      </div>
    </div>
  );
}
