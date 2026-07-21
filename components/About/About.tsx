import Reveal from "@/components/Animations/ScrollReveal";

import DeveloperDNA from "./DeveloperDNA";
import ExpertiseDomains from "./ExpertiseDomains";
import HorizontalStory from "./HorizontalStory";
import Journey from "./Journey";
import ProfileCard from "./ProfileCard";
import StatsCounter from "./StatsCounter";
import TechStack from "./TechStack";


export default function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 lg:py-32"
    >

      {/* Section Header */}
      <Reveal>

        <div className="container-width mb-12 sm:mb-16 lg:mb-20">

          <p className="text-sm text-cyan-400 uppercase tracking-[0.35em] sm:text-base">
            About Me
          </p>


          <h2 className="mt-3 text-3xl font-black sm:mt-4 sm:text-4xl lg:text-5xl">
            Beyond the Code
          </h2>

        </div>

      </Reveal>



      {/* Developer Introduction */}
      <Reveal
        delay={0.15}
      >

        <div className="container-width">

          <DeveloperDNA />

        </div>

      </Reveal>




      {/* Horizontal Story */}
      <Reveal
        delay={0.2}
      >

        <HorizontalStory />

      </Reveal>




      <div className="container-width">


        {/* Stats */}
        <Reveal
          delay={0.15}
        >

          <StatsCounter />

        </Reveal>




        {/* Expertise */}
        <Reveal
          delay={0.2}
        >

          <ExpertiseDomains />

        </Reveal>





        {/* Profile + Journey */}
        <Reveal
          delay={0.25}
        >

          <div className="mt-16 grid gap-6 sm:mt-20 sm:gap-8 lg:mt-28 lg:grid-cols-2">

            <ProfileCard />

            <Journey />

          </div>

        </Reveal>





        {/* Tech Stack */}
        <Reveal
          delay={0.3}
        >

          <TechStack />

        </Reveal>


      </div>


    </section>
  );
}