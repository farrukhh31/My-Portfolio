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

        link.href = "/public/Farrukh_Ahmad_Resume.pdf";
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
        alert("Email copied to clipboard!");
        break;

      case "sudo": {
        // NEXT_PUBLIC_FORMSPREE_FORM_ID is a form endpoint id, not a secret —
        // Formspree's client-side submission model expects it to be public,
        // same as any <form action="https://formspree.io/f/...">.
        const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

        if (formId) {
          fetch(`https://formspree.io/f/${formId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              _subject: "🔓 Someone ran 'sudo hire' on your portfolio",
              message:
                "A visitor just triggered the sudo easter egg in your command palette.",
              page: window.location.href,
              triggeredAt: new Date().toISOString(),
            }),
          }).catch(() => {
            // Best-effort notification only — don't let a failed request
            // surface an error to the visitor triggering the easter egg.
          });
        }

        alert(
          "🔓 Access Granted\n\nWelcome Recruiter 🙂\n\nLet's build something amazing."
        );
        break;
      }
    }

    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-[10vh] backdrop-blur-sm sm:py-24"
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
            rounded-2xl
            border
            border-white/10
            bg-zinc-900/90
            shadow-2xl
            backdrop-blur-2xl
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

          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-zinc-500">
            <span>↑ ↓ Navigate</span>

            <span>Enter Select</span>

            <span>Esc Close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}