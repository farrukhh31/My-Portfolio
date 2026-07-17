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

interface StoryPanelProps {
  item: StoryItem;
  image?: boolean;
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

export default function StoryPanel({ item, image = false }: StoryPanelProps) {
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
    <section className="relative flex h-screen min-w-screen shrink-0 items-center justify-center">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformPerspective: 1800,
        }}
        className="
          relative h-[70vh] w-[85vw] max-w-[1300px]
          overflow-hidden rounded-[42px]
          border border-white/10
          bg-white/[0.05] backdrop-blur-3xl
          shadow-[0_40px_120px_rgba(0,0,0,.45)]
        "
      >
        {/* Mouse Glow */}
        <motion.div
          style={{ background: spotlight }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Aurora Ambient Glow */}
        <motion.div
          animate={{ x: [-80, 80, -80], y: [-40, 40, -40], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-20 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[140px]"
        />
        <motion.div
          animate={{ x: [80, -80, 80], y: [40, -40, 40], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 -bottom-20 h-[520px] w-[520px] rounded-full bg-purple-500/10 blur-[150px]"
        />

        {/* Glass Reflection */}
        <motion.div
          animate={{ x: ["-150%", "150%"] }}
          transition={{ duration: 8, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          className="
            absolute inset-y-0 w-40 -skew-x-12
            bg-gradient-to-r from-transparent via-white/10 to-transparent
            blur-xl pointer-events-none
          "
        />

        {/* Main Content */}
        <div
          className="relative z-10 grid h-full items-center gap-10 overflow-y-auto px-8 py-8 lg:grid-cols-2 lg:gap-16 lg:px-16"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ transform: "translateZ(60px)" }}
            className="flex h-full flex-col justify-center py-4"
          >
            {/* Accent Number */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.15 }}
              transition={{ duration: 1 }}
              className="block text-7xl font-black leading-none text-cyan-400 lg:text-8xl"
            >
              {item.accent}
            </motion.span>

            {/* Label */}
            <p className="mt-4 text-sm uppercase tracking-[0.5em] text-cyan-300">
              {item.title}
            </p>

            {/* Heading */}
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.1] tracking-tight text-white lg:text-5xl">
              {item.subtitle}
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 lg:text-lg">
              {item.description}
            </p>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              {item.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -5, scale: 1.08 }}
                  className="
                    rounded-full border border-white/10 bg-white/5
                    px-5 py-2.5 text-sm font-medium text-cyan-200
                    backdrop-blur-xl transition
                  "
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex h-full flex-col justify-center py-4"
          >
            {image ? (
              /* IMAGE PANEL */
              <motion.div
                style={{
                  x: smoothImageX,
                  y: smoothImageY,
                  transform: "translateZ(90px)",
                }}
                animate={{ y: [0, -14, 0], rotate: [-0.5, 0.5, -0.5] }}
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative"
              >
                {/* Animated Glow */}
                <motion.div
                  animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="
                    absolute inset-0 rounded-[40px]
                    bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-500/30
                    blur-[70px]
                  "
                />

                {/* Image Frame */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="
                    relative overflow-hidden rounded-[38px]
                    border border-white/10
                    bg-gradient-to-br from-slate-900 via-slate-950 to-black
                    p-3 shadow-[0_50px_100px_rgba(0,0,0,.5)]
                  "
                >
                  <Image
                    src="/picture.png"
                    alt="Profile"
                    width={420}
                    height={520}
                    sizes="(max-width:768px) 280px, 420px"
                    priority
                    className="rounded-[32px] object-cover select-none"
                  />

                  {/* Image Reflection */}
                  <motion.div
                    animate={{ x: ["-150%", "150%"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    className="
                      absolute inset-y-0 w-28 -skew-x-12
                      bg-gradient-to-r from-transparent via-white/25 to-transparent
                      blur-md
                    "
                  />
                </motion.div>

                {/* Status Badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="
                    absolute bottom-7 left-7
                    rounded-full border border-emerald-400/20
                    bg-black/40 px-5 py-2.5
                    text-sm font-medium text-emerald-300
                    backdrop-blur-xl
                  "
                >
                  <span className="mr-2 text-emerald-400">●</span>
                  Open to Opportunities
                </motion.div>
              </motion.div>
            ) : (
              /* CAPABILITY DASHBOARD */
              <div className="grid w-full max-w-md gap-3">
                {capabilities.map((skill, index) => {
                  const Icon = skill.icon;

                  return (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="
                        group relative overflow-hidden rounded-2xl
                        border border-white/10 bg-white/[0.04]
                        p-4 backdrop-blur-xl
                      "
                    >
                      {/* Hover Glow */}
                      <div
                        className={`
                          absolute inset-0 bg-gradient-to-br ${skill.gradient}
                          opacity-0 blur-2xl transition duration-500
                          group-hover:opacity-20
                        `}
                      />

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`
                              flex h-10 w-10 items-center justify-center
                              rounded-xl bg-gradient-to-br ${skill.gradient}
                            `}
                          >
                            <Icon size={18} className="text-white" />
                          </div>

                          <ArrowUpRight
                            size={16}
                            className="text-slate-500 transition group-hover:-translate-y-1 group-hover:text-white"
                          />
                        </div>

                        {/* Title */}
                        <h3 className="mt-3 text-base font-bold text-white">
                          {skill.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {skill.description}
                        </p>

                        {/* Progress */}
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
                              transition={{ duration: 1, delay: index * 0.15 }}
                              className={`h-full rounded-full bg-gradient-to-r ${skill.gradient}`}
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
