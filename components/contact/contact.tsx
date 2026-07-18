"use client";

import Container from "@/components/ui/Container";
import ContactHeading from "./contactHeading";
import ContactOrbit from "./ContactOrbit";
import ContactCard from "./contactCard";
import ContactForm from "./contactForm";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative isolate py-40">
      {/* Decorative background layer — clipped on its own so it never
          bleeds outside the section, without clipping foreground content
          like the orbiting badges below. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* 3D floor grid — a plane tilted in real perspective, fading
            upward, like a horizon line. Purely decorative. */}
        <div
          className="absolute inset-x-0 bottom-0 h-[420px]"
          style={{ perspective: "600px" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.35) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              transform: "rotateX(75deg)",
              transformOrigin: "bottom",
              maskImage: "linear-gradient(to top, black 15%, transparent 70%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 15%, transparent 70%)",
              opacity: 0.35,
            }}
          />
        </div>

        {/* Ambient drifting light */}
        <motion.div
          className="absolute left-[6%] top-[12%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[8%] h-96 w-96 rounded-full bg-violet-500/10 blur-[130px]"
          animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        <Container>
          <ContactHeading />

          <ContactOrbit />

          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            <ContactCard />
            <ContactForm />
          </div>
        </Container>
      </div>
    </section>
  );
}