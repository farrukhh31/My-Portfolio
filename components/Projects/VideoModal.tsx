"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
};

function isDirectVideoFile(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: Props) {
  // Lock scroll + allow Escape to close while the modal is open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_0_80px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h3 className="truncate pr-4 font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close video"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {isDirectVideoFile(videoUrl) ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full"
                />
              ) : (
                <iframe
                  src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
                  title={title}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
