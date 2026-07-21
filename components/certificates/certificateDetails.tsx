"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";

import type { Certificate } from "./types";

// Certificates may point at either an image (jpg/png/webp) or an actual
// PDF file. Each needs different handling to render "fit to panel"
// instead of the browser's raw default (native-resolution image, or a
// PDF viewer opening at its own arbitrary zoom level).
function isImageFile(url: string) {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(url);
}

type Props = {
  certificate: Certificate;
};

export default function CertificateDetails({
  certificate,
}: Props) {
  const completed =
    certificate.status === "completed";

  const [isOpen, setIsOpen] = useState(false);

  // While the viewer is open: lock background scroll and let Escape
  // close it, same as any modal.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="
          relative
          flex
          h-95
          sm:h-120
          lg:h-140
          flex-col
          overflow-hidden
          rounded-[22px]
          border
          border-white/10
          bg-white/4
          p-5
          backdrop-blur-2xl
          shadow-[0_15px_45px_rgba(0,0,0,.3)]
          sm:rounded-[28px]
          sm:p-6
          sm:shadow-[0_25px_70px_rgba(0,0,0,.35)]
          lg:rounded-4xl
          lg:p-8
        "
      >
        {/* Background Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-cyan-500/10
            blur-[90px]
            sm:-right-24
            sm:-top-24
            sm:h-60
            sm:w-60
            sm:blur-[120px]
          "
        />

        <div className="relative flex h-full flex-col">

          {/* Status */}

          <div className="flex shrink-0 items-center justify-between">

            {completed ? (
              <span
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-400/30
                  bg-emerald-400/10
                  px-3
                  py-1.5
                  text-xs
                  text-emerald-300
                  sm:gap-2
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                "
              >
                <CheckCircle2 size={14} className="sm:hidden" />
                <CheckCircle2 size={16} className="hidden sm:block" />
                Completed
              </span>
            ) : (
              <span
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-amber-400/30
                  bg-amber-400/10
                  px-3
                  py-1.5
                  text-xs
                  text-amber-300
                  sm:gap-2
                  sm:px-4
                  sm:py-2
                  sm:text-sm
                "
              >
                <Loader2
                  size={14}
                  className="animate-spin sm:hidden"
                />
                <Loader2
                  size={16}
                  className="hidden animate-spin sm:block"
                />

                In Progress
              </span>
            )}

            <div
              className="
                flex
                items-center
                gap-1.5
                text-sm
                text-slate-400
                sm:gap-2
                sm:text-base
              "
            >
              <Calendar size={14} className="sm:hidden" />
              <Calendar size={16} className="hidden sm:block" />
              {certificate.year}
            </div>

          </div>

          {/* Title */}

          <h2
            className="
              mt-5
              shrink-0
              line-clamp-2
              text-xl
              font-bold
              leading-tight
              text-white
              sm:mt-6
              sm:text-2xl
              lg:mt-8
              lg:text-3xl
            "
          >
            {certificate.title}
          </h2>

          <p
            className="
              mt-2
              shrink-0
              line-clamp-1
              text-sm
              text-cyan-300
              sm:text-base
            "
          >
            {certificate.issuer}
          </p>

          {/* Scrollable middle: description, skills, progress, credential —
              content length varies per certificate, so this region absorbs
              that difference instead of resizing the card itself. */}

          <div className="mt-4 flex-1 overflow-y-auto pr-1 scrollbar-hide sm:mt-6">

            {/* Description */}

            <p
              className="
                text-sm
                leading-6
                text-slate-400
                sm:text-base
                sm:leading-7
              "
            >
              {certificate.description}
            </p>

            {/* Skills */}

            <div className="mt-5 sm:mt-8">

              <p
                className="
                  mb-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                  sm:mb-3
                  sm:text-sm
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
                      px-2.5
                      py-1
                      text-[11px]
                      text-cyan-300
                      sm:px-3
                      sm:py-1.5
                      sm:text-xs
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

                <div className="mt-5 sm:mt-8">

                  <div className="flex justify-between text-xs sm:text-sm">

                    <span className="text-slate-400">
                      Progress
                    </span>

                    <span className="text-cyan-300">
                      {certificate.progress}%
                    </span>

                  </div>

                  <div
                    className="
                      mt-2
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white/10
                      sm:mt-3
                    "
                  >
                    <div
                      className="
                        h-full
                        rounded-full
                        bg-linear-to-r
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
                        mt-2
                        text-xs
                        text-slate-500
                        sm:mt-3
                        sm:text-sm
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
                  mt-5
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-3
                  sm:mt-8
                  sm:p-4
                "
              >

                <ShieldCheck
                  size={18}
                  className="shrink-0 text-cyan-400 sm:hidden"
                />
                <ShieldCheck
                  size={20}
                  className="hidden shrink-0 text-cyan-400 sm:block"
                />

                <div className="min-w-0">

                  <p className="text-xs text-slate-500">
                    Credential ID
                  </p>

                  <p className="truncate text-sm text-white">
                    {certificate.credentialId}
                  </p>

                </div>

              </div>

            )}

          </div>

          {/* Button — pinned to the bottom, outside the scroll area, so it
              never moves regardless of how much content is above it. */}

          <div className="mt-4 shrink-0 sm:mt-6">

            {completed && certificate.pdf ? (

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-cyan-400
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-950
                  transition
                  hover:scale-105
                  sm:px-6
                  sm:py-3
                  sm:text-base
                "
              >
                View Certificate

                <ArrowUpRight size={16} className="sm:hidden" />
                <ArrowUpRight size={18} className="hidden sm:block" />

              </button>

            ) : (

              <button
                disabled
                className="
                  rounded-full
                  border
                  border-white/10
                  px-5
                  py-2.5
                  text-sm
                  text-slate-500
                  sm:px-6
                  sm:py-3
                  sm:text-base
                "
              >
                Certificate Coming Soon
              </button>

            )}

          </div>

        </div>
      </div>

      {completed &&
        certificate.pdf &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsOpen(false)}
                className="
                  fixed
                  inset-0
                  z-100
                  flex
                  items-center
                  justify-center
                  bg-slate-950/80
                  p-3
                  backdrop-blur-md
                  sm:p-8
                "
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="
                    relative
                    flex
                    h-[92vh]
                    w-full
                    max-w-6xl
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-slate-900
                    shadow-[0_35px_90px_rgba(0,0,0,.5)]
                    sm:rounded-[28px]
                  "
                >
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      justify-between
                      border-b
                      border-white/10
                      px-4
                      py-3
                      sm:px-6
                      sm:py-4
                    "
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {certificate.title}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {certificate.issuer}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <a
                        href={certificate.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open in a new tab"
                        className="
                          rounded-full
                          border
                          border-white/10
                          p-2
                          text-slate-300
                          transition
                          hover:border-cyan-400/40
                          hover:text-cyan-300
                        "
                      >
                        <ArrowUpRight size={16} />
                      </a>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close"
                        className="
                          rounded-full
                          border
                          border-white/10
                          p-2
                          text-slate-300
                          transition
                          hover:border-red-400/40
                          hover:text-red-300
                        "
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden bg-slate-950">
                    {isImageFile(certificate.pdf!) ? (
                      // Images don't auto-scale in a raw <img> unless told
                      // to — object-contain fits the whole image inside
                      // the panel with no cropping and no native-resolution
                      // "zoomed in" look, regardless of the image's own
                      // dimensions.
                      <img
                        src={certificate.pdf}
                        alt={`${certificate.title} certificate`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      // PDF: append viewer hints so it opens fit-to-width
                      // with no toolbar clutter, instead of the browser's
                      // default (often 100% zoom, which overflows a panel
                      // this size).
                      <iframe
                        src={`${certificate.pdf}#view=FitH&toolbar=0`}
                        title={`${certificate.title} certificate`}
                        className="h-full w-full"
                        loading="lazy"
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
