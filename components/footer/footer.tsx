"use client";

import { motion } from "framer-motion";

import Container from "@/components/ui/Container";

import FooterLogo from "./footerLogo";
import FooterDivider from "./footerDivider";
import FooterSocials from "./footerSocials";
import FooterCredits from "./footerCredits";
import BackToTop from "./BacktoTop";
export default function Footer() {
  return (
    <footer  id="footer" className="relative overflow-hidden py-32">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[180px]" />

      <Container>

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <FooterLogo />

          <h2 className="mt-10 text-center text-5xl font-black">
            Let's Build Something Great
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-400">
            Whether you're looking for a Full Stack Developer,
            Game Developer, intern, or collaborator,
            I'd love to hear from you.
          </p>

          <FooterSocials />

          <FooterDivider />

          <FooterCredits />

        </motion.div>

      </Container>

      <BackToTop />

    </footer>
  );
}