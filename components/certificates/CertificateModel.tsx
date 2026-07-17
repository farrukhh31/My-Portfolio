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
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl"
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
            className="fixed left-1/2 top-1/2 z-[110] w-[95%] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_30px_100px_rgba(0,0,0,.55)]"
          >
            {/* Glow */}

            <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px]" />

            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-violet-600/10 blur-[120px]" />

            {/* Header */}

            <div className="relative flex items-center justify-between border-b border-white/10 px-7 py-5">

              <div>

                <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">
                  {issuer}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {title}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {year}
                </p>

              </div>

              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
              >
                <X size={18} />
              </button>

            </div>

            {/* Content */}

            <div className="relative p-8">
              {status === "completed" ? (
                <div className="space-y-6">

                  <div className="overflow-hidden rounded-2xl border border-white/10">

                    <iframe
                      src={certificate}
                      className="h-[70vh] w-full bg-white"
                    />

                  </div>

                  <div className="flex justify-end">

                    <a
                      href={certificate}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
                    >
                      <ExternalLink size={18} />
                      Open Full Certificate
                    </a>

                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center py-16 text-center">

                  <div className="rounded-full border border-amber-500/20 bg-amber-500/10 p-6">
                    <Lock className="h-12 w-12 text-amber-400" />
                  </div>

                  <h3 className="mt-8 text-3xl font-bold text-white">
                    Certificate In Progress
                  </h3>

                  <p className="mt-5 max-w-xl leading-8 text-slate-400">
                    This certification is currently being completed.
                    <br />
                    Once it has been successfully finished, the official
                    certificate will be uploaded here.
                  </p>

                  <div className="mt-10 flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-3">

                    <Award
                      size={18}
                      className="text-cyan-400"
                    />

                    <span className="text-sm text-cyan-300">
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