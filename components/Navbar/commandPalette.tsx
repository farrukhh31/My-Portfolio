"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command } from "cmdk";

import SearchBar from "./searchBar";
import SearchResults from "./searchResults";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({
  open,
  onClose,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Auto-dismiss the toast so it never lingers if the visitor navigates away.
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSelect = (id: string) => {
    switch (id) {
      case "about":
      case "snapshot":
      case "projects":
      case "skills":
      case "experience":
      case "contact": {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

        break;
      }

      case "resume": {
        const link = document.createElement("a");

        link.href = "/Farrukh_Ahmad_Resume.pdf";
        link.download = "Farrukh_Ahmad_Resume.pdf";
        link.click();

        break;
      }

      case "github":
        window.open(
          "https://github.com/farrukhh31",
          "_blank"
        );
        break;

      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/farrukh-ahmed-248356246/",
          "_blank"
        );
        break;

      case "email":
        navigator.clipboard.writeText(
          "afarrukh553@gmail.com"
        );
        setToast("Email copied to clipboard");
        break;

      case "sudo": {
        const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

        if (formId) {
          fetch(`https://formspree.io/f/${formId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: "Portfolio Easter Egg",
              message:
                "A visitor triggered the sudo hire easter egg in your command palette.",
              _subject: "Portfolio easter egg triggered",
              page: window.location.href,
              triggeredAt: new Date().toISOString(),
            }),
          })
            .then(async (res) => {
              if (!res.ok) {
                const body = await res.json().catch(() => null);
                console.error("Sudo notification rejected:", res.status, body);
                return;
              }

              console.log("Sudo notification sent successfully.");
            })
            .catch((err) => {
              console.error("Sudo notification network error:", err);
            });
        } else {
          console.warn(
            "NEXT_PUBLIC_FORMSPREE_FORM_ID is not set — sudo notification skipped."
          );
        }

        setToast("Access granted — welcome, recruiter 🙂");
        break;
      }
    }

    onClose();
  };

  if (!open) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/50 px-3 py-[8vh] backdrop-blur-sm sm:px-4 sm:py-24"
          style={{ WebkitOverflowScrolling: "touch" }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-2xl
              overflow-hidden
              rounded-xl
              border
              border-white/10
              bg-zinc-900/90
              shadow-2xl
              backdrop-blur-lg
              sm:rounded-2xl
              sm:backdrop-blur-2xl
            "
          >
            <Command
              shouldFilter={false}
              className="w-full"
            >
              <SearchBar
                value={search}
                onValueChange={setSearch}
              />

              <SearchResults
                search={search}
                onSelect={handleSelect}
              />
            </Command>

            <div
              className="flex items-center justify-between gap-2 border-t border-white/10 px-3 py-2.5 text-[10px] text-zinc-500 sm:px-4 sm:py-3 sm:text-xs"
              style={{
                paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))",
              }}
            >
              <span className="hidden sm:inline">↑ ↓ Navigate</span>
              <span className="sm:hidden">Tap to select</span>

              <span className="hidden sm:inline">Enter Select</span>

              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="
              fixed
              inset-x-0
              bottom-4
              z-101
              mx-auto
              w-fit
              max-w-[92vw]
              rounded-full
              border
              border-white/10
              bg-zinc-900/95
              px-4
              py-2.5
              text-sm
              text-zinc-100
              shadow-2xl
              backdrop-blur-xl
              sm:bottom-8
            "
            style={{
              marginBottom: "env(safe-area-inset-bottom)",
            }}
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}