import DeveloperDNA from "./DeveloperDNA";
import ExpertiseDomains from "./ExpertiseDomains";
import HorizontalStory from "./HorizontalStory";
import Journey from "./Journey";
import ProfileCard from "./ProfileCard";
import StatsCounter from "./StatsCounter";
import TechStack from "./TechStack";

export default function About() {
  return (
    <section id="about" className="py-32">

      <div className="container-width mb-20">
        <p className="text-cyan-400 uppercase tracking-[0.35em]">
          About Me
        </p>

        <h2 className="mt-4 text-5xl font-black">
          Beyond the Code
        </h2>
      </div>

      {/* Hero intro */}
      <div className="container-width">
        <DeveloperDNA />
      </div>

      {/* Scroll-driven story */}
      <HorizontalStory />

      <div className="container-width">

        {/* Live stats */}
        <StatsCounter />

        {/* Dynamic, tabbed deep-dive into each discipline */}
        <ExpertiseDomains />

        {/* Profile + narrative side-by-side */}
        <div className="mt-28 grid gap-8 lg:grid-cols-2">
          <ProfileCard />
          <Journey />
        </div>

        {/* Filterable tech stack */}
        <TechStack />

      </div>

    </section>
  );
}
