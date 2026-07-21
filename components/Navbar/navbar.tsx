"use client";

import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { Command, Download, Menu, X } from "lucide-react";

import MouseSpotlight from "./Spotlight";
import CommandPalette from "./commandPalette";
import ResumeCard from "./ResumeCard";
import LiveClock from "./LiveClock";
import ThemeToggle from "./ThemeToggle";
import ViewSource from "./ViewSource";

const navItems = [
  { name: "Recruiter", id: "Recruiter" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [palette, setPalette] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* Scroll Percentage */

  const { scrollYProgress } = useScroll();

  const [scrollPercent, setScrollPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setScrollPercent(Math.round(value * 100));
  });

  /* Active Section */

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* Keyboard Shortcuts */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette(true);
      }

      if (e.key === "Escape") {
        setPalette(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  /* Close Mobile Menu On Outside Click */

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActive(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileOpen(false);
  };

  return (
    <>
      <MouseSpotlight />

      <motion.nav
        ref={menuRef}
        initial={{ y: -80, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.6 }}
        className="
          fixed
          top-5
          left-1/2
          z-50

          w-[95%]
          max-w-350

          rounded-3xl

          border
          border-white/10

          bg-[#09090f]/75

          backdrop-blur-2xl

          shadow-[0_20px_80px_rgba(0,0,0,0.45)]

          overflow-x-clip

          px-4
          py-3

          lg:px-6
        "
      >
        <div className="flex items-center justify-between">
          {/* Logo */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection("hero")}
            className="flex shrink-0 items-center gap-3 cursor-pointer"
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center

                rounded-2xl

                bg-linear-to-br
                from-purple-500
                via-indigo-500
                to-cyan-500

                text-lg
                font-bold
                text-white

                shadow-[0_0_30px_rgba(139,92,246,0.45)]
              "
            >
              F
            </div>

            <div className="hidden sm:block">
              <h2 className="font-semibold text-white">Farrukh</h2>

              <p className="text-xs text-zinc-400">
                Full Stack Dev • AI • Game Dev
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}

          <div className="relative hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={active === item.id ? "page" : undefined}
                className="
                  relative
                  rounded-full
                  px-4
                  py-2

                  text-sm
                  font-medium

                  text-zinc-400

                  transition-colors

                  hover:text-white
                "
              >
                {active === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 35,
                    }}
                    className="
                      absolute
                      inset-0

                      rounded-full

                      border
                      border-purple-400/20

                      bg-linear-to-r
                      from-purple-500/20
                      via-indigo-500/20
                      to-cyan-500/20

                      shadow-[0_0_30px_rgba(139,92,246,0.30)]
                    "
                  />
                )}

                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Right Side */}

          <div className="hidden items-center gap-1.5 lg:flex xl:gap-2 2xl:gap-3">
            <div className="shrink-0">
              <LiveClock />
            </div>

            <div className="shrink-0">
              <ViewSource />
            </div>

            <div className="shrink-0">
              <ThemeToggle />
            </div>

            <div className="relative shrink-0 group">
              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2

                  rounded-full

                  bg-linear-to-r
                  from-purple-600
                  to-indigo-600

                  px-4
                  py-2

                  text-sm
                  font-medium
                  text-white

                  shadow-[0_0_25px_rgba(139,92,246,.35)]

                  transition

                  hover:scale-105
                "
              >
                <Download size={16} />
                Resume
              </button>

              <ResumeCard />
            </div>

            {/* Ctrl + K */}

            <button
              type="button"
              onClick={() => setPalette(true)}
              className="
                group

                flex
                shrink-0
                items-center
                gap-2

                rounded-full

                border
                border-white/10

                bg-white/4

                px-3
                py-2

                text-sm
                text-zinc-300

                transition-all
                duration-300

                hover:border-purple-500/40
                hover:bg-purple-500/10
                hover:text-white

                2xl:px-4
              "
            >
              <Command
                size={15}
                className="
                  transition-transform
                  duration-300

                  group-hover:rotate-12
                "
              />
              <span className="hidden 2xl:inline">Ctrl + K</span>
            </button>

            {/* Scroll Percentage */}

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
                hidden
                shrink-0

                rounded-full

                border
                border-white/10

                bg-white/4

                px-3
                py-2

                text-xs
                font-semibold

                text-zinc-400

                2xl:block
              "
            >
              {scrollPercent}%
            </motion.div>
          </div>

          {/* Mobile Button */}

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
              rounded-xl
              p-2

              text-white

              transition

              hover:bg-white/10

              lg:hidden
            "
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="
                mt-5

                overflow-hidden

                border-t
                border-white/10

                pt-5

                lg:hidden
              "
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={active === item.id ? "page" : undefined}
                    className={`
                      rounded-xl

                      px-4
                      py-3

                      text-left
                      text-sm

                      transition-all

                      ${
                        active === item.id
                          ? "bg-purple-500/20 text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                ))}

                <div className="mt-4 flex items-center justify-between gap-3">
                  <LiveClock />

                  <div className="flex items-center gap-3">
                    <ViewSource />
                    <ThemeToggle />
                  </div>
                </div>

                <button
                  type="button"
                  className="
                    mt-4

                    flex
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    bg-linear-to-r
                    from-purple-600
                    to-indigo-600

                    py-3

                    text-white

                    transition

                    hover:scale-[1.02]
                  "
                >
                  <Download size={18} />
                  Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Command Palette */}

      <AnimatePresence>
        {palette && (
          <CommandPalette open={palette} onClose={() => setPalette(false)} />
        )}
      </AnimatePresence>
    </>
  );
}