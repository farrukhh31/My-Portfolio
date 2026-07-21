"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Code2, Gamepad2, Boxes, BrainCircuit, ArrowUpRight } from "lucide-react";

import { StoryItem } from "./StoryData";
import { useHasFinePointer, usePrefersReducedMotion } from "./useMediaQuery";

interface StoryPanelProps {
  item: StoryItem;
  image?: boolean;
  /**
   * "pinned"  -> desktop scroll-jacked horizontal panel (fixed h-screen)
   * "stacked" -> mobile/tablet friendly panel that flows with the page
   */
  variant?: "pinned" | "stacked";
}

const capabilities = [
  {
    title: "Full Stack Development",
    description: "React, Next.js & scalable applications",
    progress: 92,
    icon: Code2,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    title: "Game Development",
    description: "Unity, gameplay systems & interaction",
    progress: 86,
    icon: Gamepad2,
    gradient: "from-purple-500 to-fuchsia-500",
  },
  {
    title: "DevOps Automation",
    description: "Docker, Linux & CI/CD workflows",
    progress: 80,
    icon: Boxes,
    gradient: "from-orange-400 to-pink-500",
  },
  {
    title: "Artificial Intelligence",
    description: "GenAI & intelligent applications",
    progress: 74,
    icon: BrainCircuit,
    gradient: "from-emerald-400 to-cyan-500",
  },
];

export default function StoryPanel({
  item,
  image = false,
  variant = "pinned",
}: StoryPanelProps) {
  const hasFinePointer = useHasFinePointer();
  const reduceMotion = usePrefersReducedMotion();

  // Mouse-driven FX only make sense with a real cursor — skip entirely on
  // touch devices, both for correctness and to save a class of springs
  // updating on every pointer frame.
  const enableMouseFx = hasFinePointer && !reduceMotion;
  const enableAmbientLoops = !reduceMotion;
  const isPinned = variant === "pinned";

  /* ---------------- Mouse Spotlight ---------------- */
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothMouseX = useSpring(mouseX, { stiffness: 180, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 180, damping: 25 });

  const spotlight = useMotionTemplate`
    radial-gradient(
      280px circle at ${smoothMouseX}px ${smoothMouseY}px,
      rgba(34,211,238,0.22),
      transparent 70%
    )
  `;

  /* ---------------- 3D Tilt ---------------- */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 160, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 160, damping: 22 });

  /* ---------------- Image Parallax ---------------- */
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);

  const smoothImageX = useSpring(imageX, { stiffness: 120, damping: 20 });
  const smoothImageY = useSpring(imageY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMouseFx) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(-((y - centerY) / centerY) * 6);
    rotateY.set(((x - centerX) / centerX) * 6);

    imageX.set(((x - centerX) / centerX) * 15);
    imageY.set(((y - centerY) / centerY) * 15);
  };

  const handleMouseLeave = () => {
    mouseX.set(-500);
    mouseY.set(-500);
    rotateX.set(0);
    rotateY.set(0);
    imageX.set(0);
    imageY.set(0);
  };

  return (
    <section
      className={
        isPinned
          ? "relative flex h-screen min-w-full shrink-0 items-center justify-center px-4 sm:min-w-screen sm:px-0"
          : "relative flex w-full items-center justify-center px-4 py-10 sm:px-6"
      }
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          enableMouseFx
            ? {
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformPerspective: 1800,
              }
            : undefined
        }
        className={`
          relative w-full max-w-325 overflow-hidden rounded-[28px] sm:rounded-[42px]
          border border-white/10
          bg-white/5 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,.4)] sm:shadow-[0_40px_120px_rgba(0,0,0,.45)]
          ${isPinned ? "h-[80vh] sm:h-[75vh] lg:h-[70vh] lg:w-[85vw]" : "h-auto"}
        `}
      >
        {/* Mouse Glow — desktop only */}
        {enableMouseFx && (
          <motion.div
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0"
          />
        )}

        {/* Aurora Ambient Glow — smaller blur radius, paused when reduced-motion is on */}
        <motion.div
          animate={
            enableAmbientLoops
              ? { x: [-60, 60, -60], y: [-30, 30, -30], scale: [1, 1.15, 1] }
              : undefined
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 -top-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-[70px] sm:h-105 sm:w-105 sm:blur-[110px]"
        />
        <motion.div
          animate={
            enableAmbientLoops
              ? { x: [60, -60, 60], y: [30, -30, 30], scale: [1.1, 1, 1.1] }
              : undefined
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 -bottom-16 h-64 w-64 rounded-full bg-purple-500/10 blur-[70px] sm:h-105 sm:w-105 sm:blur-[120px]"
        />

        {/* Glass Reflection — desktop-with-mouse only, skip on touch/reduced motion */}
        {isPinned && hasFinePointer && enableAmbientLoops && (
          <motion.div
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 8, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            className="
              pointer-events-none absolute inset-y-0 w-40 -skew-x-12
              bg-linear-to-r from-transparent via-white/10 to-transparent
              blur-xl
            "
          />
        )}

        {/* Main Content */}
        <div
          className={`
            relative z-10 grid items-center gap-8 overflow-y-auto px-6 py-8
            sm:gap-10 sm:px-8
            lg:grid-cols-2 lg:gap-16 lg:px-16
            ${isPinned ? "h-full" : ""}
          `}
          style={enableMouseFx ? { transform: "translateZ(40px)" } : undefined}
        >
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7 }}
            className="flex h-full flex-col justify-center py-2 sm:py-4"
          >
            {/* Accent Number */}
            <span className="block text-5xl font-black leading-none text-cyan-400/15 sm:text-7xl lg:text-8xl">
              {item.accent}
            </span>

            {/* Label */}
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-cyan-300 sm:mt-4 sm:text-sm sm:tracking-[0.5em]">
              {item.title}
            </p>

            {/* Heading */}
            <h2 className="mt-4 max-w-xl text-3xl font-black leading-[1.15] tracking-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl">
              {item.subtitle}
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:mt-6 sm:leading-8 lg:text-lg">
              {item.description}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              {item.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={enableMouseFx ? { y: -4, scale: 1.06 } : undefined}
                  className="
                    rounded-full border border-white/10 bg-white/5
                    px-4 py-2 text-xs font-medium text-cyan-200
                    backdrop-blur-md transition sm:px-5 sm:py-2.5 sm:text-sm
                  "
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex h-full flex-col justify-center py-2 sm:py-4"
          >
            {image ? (
              /* IMAGE PANEL */
              <motion.div
                style={enableMouseFx ? { x: smoothImageX, y: smoothImageY } : undefined}
                animate={
                  enableAmbientLoops
                    ? { y: [0, -10, 0], rotate: [-0.5, 0.5, -0.5] }
                    : undefined
                }
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative mx-auto w-full max-w-70 sm:max-w-85 lg:max-w-none"
              >
                {/* Animated Glow */}
                <motion.div
                  animate={
                    enableAmbientLoops
                      ? { scale: [1, 1.1, 1], opacity: [0.35, 0.7, 0.35] }
                      : undefined
                  }
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="
                    absolute inset-0 rounded-[40px]
                    bg-linear-to-br from-cyan-400/30 via-blue-500/20 to-purple-500/30
                    blur-2xl sm:blur-[70px]
                  "
                />

                {/* Image Frame */}
                <motion.div
                  whileHover={enableMouseFx ? { scale: 1.05, rotate: 1 } : undefined}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="
                    relative overflow-hidden rounded-[28px] sm:rounded-[38px]
                    border border-white/10
                    bg-linear-to-br from-slate-900 via-slate-950 to-black
                    p-2.5 shadow-[0_30px_70px_rgba(0,0,0,.5)] sm:p-3 sm:shadow-[0_50px_100px_rgba(0,0,0,.5)]
                  "
                >
                  <Image
                    src="/picture.png"
                    alt="Profile"
                    width={420}
                    height={520}
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 420px"
                    priority
                    className="rounded-[22px] object-cover select-none sm:rounded-4xl"
                  />

                  {hasFinePointer && (
                    <motion.div
                      animate={{ x: ["-150%", "150%"] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                      className="
                        pointer-events-none absolute inset-y-0 w-28 -skew-x-12
                        bg-linear-to-r from-transparent via-white/25 to-transparent
                        blur-md
                      "
                    />
                  )}
                </motion.div>

                {/* Status Badge */}
                <motion.div
                  animate={enableAmbientLoops ? { y: [0, -4, 0] } : undefined}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="
                    absolute bottom-4 left-4
                    rounded-full border border-emerald-400/20
                    bg-black/40 px-3.5 py-2
                    text-xs font-medium text-emerald-300
                    backdrop-blur-md sm:bottom-7 sm:left-7 sm:px-5 sm:py-2.5 sm:text-sm
                  "
                >
                  <span className="mr-2 text-emerald-400">●</span>
                  Open to Opportunities
                </motion.div>
              </motion.div>
            ) : (
              /* CAPABILITY DASHBOARD */
              <div className="mx-auto grid w-full max-w-md gap-3">
                {capabilities.map((skill, index) => {
                  const Icon = skill.icon;

                  return (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.5 }}
                      whileHover={enableMouseFx ? { y: -4, scale: 1.02 } : undefined}
                      className="
                        group relative overflow-hidden rounded-2xl
                        border border-white/10 bg-white/4
                        p-4 backdrop-blur-md
                      "
                    >
                      <div
                        className={`
                          absolute inset-0 bg-linear-to-br ${skill.gradient}
                          opacity-0 blur-2xl transition duration-500
                          group-hover:opacity-20
                        `}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div
                            className={`
                              flex h-10 w-10 items-center justify-center
                              rounded-xl bg-linear-to-br ${skill.gradient}
                            `}
                          >
                            <Icon size={18} className="text-white" />
                          </div>

                          <ArrowUpRight
                            size={16}
                            className="text-slate-500 transition group-hover:-translate-y-1 group-hover:text-white"
                          />
                        </div>

                        <h3 className="mt-3 text-base font-bold text-white">
                          {skill.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {skill.description}
                        </p>

                        <div className="mt-3">
                          <div className="mb-1.5 flex justify-between text-xs text-slate-400">
                            <span>Experience</span>
                            <span>{skill.progress}%</span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.9, delay: index * 0.12 }}
                              className={`h-full rounded-full bg-linear-to-r ${skill.gradient}`}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
