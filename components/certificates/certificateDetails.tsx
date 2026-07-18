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
          h-[480px]
          sm:h-[520px]
          lg:h-[560px]
          flex-col
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

        <div className="relative flex h-full flex-col">

          {/* Status */}

          <div className="flex shrink-0 items-center justify-between">

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
              shrink-0
              line-clamp-2
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
              shrink-0
              line-clamp-1
              text-cyan-300
            "
          >
            {certificate.issuer}
          </p>

          {/* Scrollable middle: description, skills, progress, credential —
              content length varies per certificate, so this region absorbs
              that difference instead of resizing the card itself. */}

          <div className="mt-6 flex-1 overflow-y-auto pr-1 scrollbar-hide">

            {/* Description */}

            <p
              className="
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

          </div>

          {/* Button — pinned to the bottom, outside the scroll area, so it
              never moves regardless of how much content is above it. */}

          <div className="mt-6 shrink-0">

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

              </button>

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

      {/* Certificate viewer, rendered directly into document.body via a
          portal. This is what a plain `fixed inset-0` here would NOT
          achieve on its own: this component (and the hero card next to
          it) sit inside motion.div ancestors that animate `transform`
          (x, rotateX, rotateY). Any transformed ancestor becomes a new
          containing block for its fixed-position descendants, so a
          modal rendered in place here would end up clipped/positioned
          relative to that animated card instead of the viewport. The
          portal sidesteps that entirely. */}

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
                  z-[100]
                  flex
                  items-center
                  justify-center
                  bg-slate-950/80
                  p-4
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
                    rounded-[28px]
                    border
                    border-white/10
                    bg-slate-900
                    shadow-[0_35px_90px_rgba(0,0,0,.5)]
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
                      px-6
                      py-4
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