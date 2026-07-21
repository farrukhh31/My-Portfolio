"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Mail, MapPin, Copy, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SocialLinks from "./SocialLinks";

const infos = [
  {
    icon: Mail,
    title: "Email",
    value: "afarrukh553@gmail.com",
    href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=afarrukh553@gmail.com&su=Portfolio%20Inquiry%20for%20Farrukh%20Ahmad",
    copyValue: "afarrukh553@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Karachi, Pakistan",
  },
];

export default function ContactCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  });

  const spotlightX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(mouseY, (v) => `${v * 100}%`);
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(480px circle at ${x} ${y}, rgba(34,211,238,0.14), transparent 42%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  async function handleCopy(title: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedTitle(title);
      setTimeout(() => setCopiedTitle(null), 2000);
    } catch {
      // Clipboard API unavailable — the link itself still works.
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/20 sm:rounded-3xl sm:p-8"
    >
      {/* Cursor-tracking spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />

      {/* Beveled inner highlight — reads as a glass edge catching light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.12), transparent 40%)",
        }}
      />

      {/* Content sits on its own raised Z layer so it visibly separates
          from the glass backing as the card tilts */}
      <div className="relative z-10" style={{ transform: "translateZ(24px)" }}>
        <h3 className="text-2xl font-bold sm:text-3xl">Contact Information</h3>

        <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          Feel free to reach out for internships, collaborations, freelance
          opportunities, or simply to connect.
        </p>

        {/* Contact Details */}
        <div className="mt-7 space-y-5 sm:mt-10 sm:space-y-6">
          {infos.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ x: 8 }}
              className="flex items-center gap-3 sm:gap-5"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.4)] sm:h-14 sm:w-14 sm:rounded-2xl"
                style={{ transform: "translateZ(18px)" }}
              >
                <item.icon size={20} className="sm:hidden" />
                <item.icon size={24} className="hidden sm:block" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-400">{item.title}</p>

                {item.href ? (
                  <a
                    href={item.href}
                    className="wrap-break-word font-medium transition hover:text-cyan-400"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="wrap-break-word font-medium">{item.value}</p>
                )}
              </div>

              {item.copyValue && (
                <button
                  type="button"
                  onClick={() => handleCopy(item.title, item.copyValue!)}
                  aria-label={`Copy ${item.title.toLowerCase()}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors duration-200 hover:border-cyan-400/40 hover:text-cyan-300 sm:h-9 sm:w-9"
                >
                  {copiedTitle === item.title ? (
                    <Check size={15} className="text-green-400" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.a
          href="https://wa.me/923022295712"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{ z: 20 }}
          className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-green-500/20 bg-linear-to-r from-green-500/10 to-emerald-500/10 px-4 py-4 transition-all duration-300 hover:border-green-400 hover:shadow-[0_0_35px_rgba(34,197,94,.25)] sm:mt-8 sm:gap-4 sm:px-6 sm:py-5"
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/15 sm:h-14 sm:w-14 sm:rounded-2xl">
              <FaWhatsapp size={22} className="text-green-400 sm:hidden" />
              <FaWhatsapp size={30} className="hidden text-green-400 sm:block" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs text-slate-400 sm:text-sm">
                Prefer a quick conversation?
              </p>
              <p className="truncate text-sm font-semibold text-white sm:text-base">
                Message me on WhatsApp
              </p>
            </div>
          </div>

          <motion.span
            whileHover={{ x: 5 }}
            className="shrink-0 text-xl text-green-400 sm:text-2xl"
          >
            →
          </motion.span>
        </motion.a>

        <SocialLinks />
      </div>
    </motion.div>
  );
}
