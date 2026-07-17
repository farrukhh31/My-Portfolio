"use client";

import { useEffect } from "react";

interface KeyboardOptions {
  onOpen: () => void;
  onClose: () => void;
}

export default function useKeyboard({
  onOpen,
  onClose,
}: KeyboardOptions) {
  useEffect(() => {
    let waitingForSecondKey = false;
    let timer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + K → Open Command Palette
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
        return;
      }

      // Escape → Close Palette
      if (e.key === "Escape") {
        onClose();
        waitingForSecondKey = false;
        return;
      }

      // Resume Shortcut (R)
      if (!e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "r") {
        const link = document.createElement("a");
        link.href = "/resume.pdf"; // Put your resume in /public/resume.pdf
        link.download = "Farrukh_Resume.pdf";
        link.click();
        return;
      }

      // First key: G
      if (!waitingForSecondKey && e.key.toLowerCase() === "g") {
        waitingForSecondKey = true;

        timer = setTimeout(() => {
          waitingForSecondKey = false;
        }, 1000);

        return;
      }

      // Second key after G
      if (waitingForSecondKey) {
        waitingForSecondKey = false;
        clearTimeout(timer);

        let section = "";

        switch (e.key.toLowerCase()) {
          case "a":
            section = "about";
            break;

          case "p":
            section = "projects";
            break;

          case "s":
            section = "skills";
            break;

          case "e":
            section = "experience";
            break;

          case "c":
            section = "contact";
            break;

          default:
            return;
        }

        const element = document.getElementById(section);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpen, onClose]);
}