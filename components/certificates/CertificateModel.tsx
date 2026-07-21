"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  Lock,
  X,
} from "lucide-react";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;

  title: string;
  issuer: string;
  year: string;

  status: "completed" | "progress";

  certificate?: string;
}

export default function CertificateModal({
  open,
  onClose,
  title,
  issuer,
  year,
  status,
  certificate,
}: CertificateModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/70 backdrop-blur-xl"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 40,
            }}
            transition={{
              duration: .35,
            }}
            className="fixed left-1/2 top-1/2 z-110 max-h-[90vh] w-[92%] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:rounded-3xl"
          >
            {/* Glow */}

            <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-[90px] sm:h-56 sm:w-56 sm:blur-[120px]" />

            <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-violet-600/10 blur-[90px] sm:h-56 sm:w-56 sm:blur-[120px]" />

            {/* Header */}

            <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-7 sm:py-5">

              <div className="min-w-0">

                <p className="truncate text-[10px] uppercase tracking-[0.25em] text-cyan-400 sm:text-xs sm:tracking-[0.35em]">
                  {issuer}
                </p>

                <h2 className="mt-1 truncate text-lg font-bold text-white sm:mt-2 sm:text-2xl">
                  {title}
                </h2>

                <p className="mt-0.5 text-xs text-slate-400 sm:mt-1 sm:text-sm">
                  {year}
                </p>

              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
              >
                <X size={18} />
              </button>

            </div>

            {/* Content */}

            <div className="relative max-h-[calc(90vh-90px)] overflow-y-auto p-4 sm:p-8">
              {status === "completed" ? (
                <div className="space-y-4 sm:space-y-6">

                  <div className="overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl">

                    <iframe
                      src={certificate}
                      title={`${title} certificate`}
                      className="h-[55vh] w-full bg-white sm:h-[70vh]"
                    />

                  </div>

                  <div className="flex justify-end">

                    <a
                      href={certificate}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 sm:px-5 sm:py-3 sm:text-base"
                    >
                      <ExternalLink size={16} className="sm:hidden" />
                      <ExternalLink size={18} className="hidden sm:block" />
                      Open Full Certificate
                    </a>

                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center py-10 text-center sm:py-16">

                  <div className="rounded-full border border-amber-500/20 bg-amber-500/10 p-4 sm:p-6">
                    <Lock className="h-8 w-8 text-amber-400 sm:h-12 sm:w-12" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white sm:mt-8 sm:text-3xl">
                    Certificate In Progress
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:mt-5 sm:text-base sm:leading-8">
                    This certification is currently being completed.
                    <br />
                    Once it has been successfully finished, the official
                    certificate will be uploaded here.
                  </p>

                  <div className="mt-6 flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2.5 sm:mt-10 sm:gap-3 sm:px-5 sm:py-3">

                    <Award
                      size={16}
                      className="text-cyan-400 sm:hidden"
                    />
                    <Award
                      size={18}
                      className="hidden text-cyan-400 sm:block"
                    />

                    <span className="text-xs text-cyan-300 sm:text-sm">
                      More certifications are coming soon.
                    </span>

                  </div>

                </div>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
