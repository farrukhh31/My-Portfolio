"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import ScrollProgress from "./ScrollProgress";
import AuroraBackground from "./AuroraBg";
import ScrollSpotlight from "./Spotlight";
import ParallaxCard from "./ParallaxCard";
import ActiveCard from "./ActiveCard";

import HeroCard from "./HeroCard";
import StatusCard from "./StatusCard";
import CGPACard from "./CGPACard";
import FeaturedProjects from "./FeaturedProjects";
import TechCard from "./TechCard";
import StatsCard from "./StatsCard";
import CTASection from "./CTASection";

export default function RecruiterSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds
  const heroY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const statusY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const cgpaY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const projectY = useTransform(scrollYProgress, [0, 1], [55, -55]);

  const techY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const statsY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const ctaY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section
      ref={sectionRef}
      id="Recruiter"
      className="
        relative
        min-h-screen
        overflow-hidden
        px-5
        py-10
        md:px-10
        lg:px-16
      "
    >
      {/* Background */}
      <ScrollProgress />
      <AuroraBackground />

      {/* Mouse Spotlight */}
      <ScrollSpotlight />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          space-y-6
        "
      >
        {/* Top Row */}
        <div
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >
          <div className="lg:col-span-2">
            <ParallaxCard y={heroY}>
               <ActiveCard>
        <HeroCard />
    </ActiveCard>
            </ParallaxCard>
          </div>

          <div className="flex flex-col gap-6">
            <ParallaxCard y={statusY} delay={0.1}>
              <ActiveCard>
        <StatusCard/>
    </ActiveCard>
            </ParallaxCard>

            <ParallaxCard y={cgpaY} delay={0.2}>
              <ActiveCard>
        <CGPACard />
    </ActiveCard>
            </ParallaxCard>
          </div>
        </div>

        {/* Projects */}
        <div
          className="
            grid
            gap-6
            lg:grid-cols-3
          "
        >
          <div className="lg:col-span-2">
            <ParallaxCard y={projectY} delay={0.15}>
              <ActiveCard>
        <FeaturedProjects/>
    </ActiveCard>
            </ParallaxCard>
          </div>

          <ParallaxCard y={techY} delay={0.25}>
            <ActiveCard>
        <TechCard />
    </ActiveCard>
          </ParallaxCard>
        </div>

        {/* Stats */}
        <ParallaxCard y={statsY} delay={0.3}>
          <ActiveCard>
        <StatsCard />
    </ActiveCard>
        </ParallaxCard>

        {/* CTA */}
        <ParallaxCard y={ctaY} delay={0.4}>
          <ActiveCard>
        <CTASection />
    </ActiveCard>
        </ParallaxCard>
      </div>
    </section>
  );
}