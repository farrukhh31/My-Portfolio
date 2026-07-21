"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import Container from "@/components/ui/Container";

import FooterLogo from "./footerLogo";
import FooterDivider from "./footerDivider";
import FooterSocials from "./footerSocials";
import FooterLinks from "./footerLinks";
import FooterCredits from "./footerCredits";
import BackToTop from "./BacktoTop";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  // Ambient orbs drift gently toward the cursor — subtle, not a full
  // parallax rig. Skips entirely for reduced-motion users via CSS below.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 40, damping: 20 });
  const springY = useSpring(my, { stiffness: 40, damping: 20 });

  const orb1X = useTransform(springX, [0, 1], ["-4%", "4%"]);
  const orb1Y = useTransform(springY, [0, 1], ["-4%", "4%"]);
  const orb2X = useTransform(springX, [0, 1], ["4%", "-4%"]);
  const orb2Y = useTransform(springY, [0, 1], ["4%", "-4%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <footer
      id="footer"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-16 motion-reduce:transform-none sm:py-24 lg:py-32"
    >
      {/* Faint dot-grid, fades toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle,rgba(255,255,255,.4)_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
      />

      {/* Background glow, drifting slightly with the cursor */}
      <motion.div
        aria-hidden
        style={{ x: orb1X, y: orb1Y }}
        className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px] motion-reduce:transform-none!"
      />
      <motion.div
        aria-hidden
        style={{ x: orb2X, y: orb2Y }}
        className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[180px] motion-reduce:transform-none!"
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FooterLogo />

          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-cyan-400/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              Get In Touch
            </span>
            <span className="h-px w-8 bg-linear-to-l from-transparent to-cyan-400/60" />
          </div>

          <h2 className="mt-6 bg-[linear-gradient(110deg,#fff,45%,#a5f3fc,55%,#fff)] bg-size-[250%_100%] bg-clip-text px-2 text-center text-3xl font-black text-transparent animate-[shine_6s_linear_infinite] sm:px-0 sm:text-4xl md:text-5xl">
            Let&apos;s Build Something Great
          </h2>

          <p className="mx-auto mt-5 max-w-2xl px-2 text-center text-sm leading-6 text-slate-400 sm:mt-6 sm:px-0 sm:text-lg sm:leading-8">
            Whether you&apos;re looking for a Full Stack Developer, Game Developer, intern, or
            collaborator, I&apos;d love to hear from you.
          </p>

          <FooterSocials />

          <FooterLinks />

          <FooterDivider />

          <FooterCredits />
        </motion.div>
      </Container>

      <BackToTop />

      <style jsx global>{`
        @keyframes shine {
          to {
            background-position-x: -250%;
          }
        }
      `}</style>
    </footer>
  );
}
