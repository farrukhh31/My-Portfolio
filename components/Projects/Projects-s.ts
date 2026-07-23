
import { ProjectCategory } from "./project-categories";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  hoverImage?: string;
  highlight?: string;
  technologies: string[];
  category: ProjectCategory;
  github?: string;

  demo?: string;

  video?: string;
  videoLabel?: string;

  featured?: boolean;
};

export const Projects: Project[] = [
  {
    slug: "developer-portfolio",
    title: "Developer Portfolio",

    description:
      "A modern, interactive portfolio showcasing my projects, skills, certifications, and experience with premium animations, responsive design, and an engaging user experience.",

    image: "/images/portfolio.PNG",
    hoverImage: "/images/portfolio-hover.PNG",

    highlight:
      "Designed to create a memorable first impression with smooth animations, dark/light mode, and an immersive UI that highlights my work effectively.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion"
    ],

    category: "webdev",

    github: "https://github.com/farrukhh31/My-Portfolio",
    demo: "https://my-portfolio-tdj6.vercel.app/",

    featured: true,
  },
  {
    slug: "mask-jam-stealth-game",
    title: "Mask Jam - Sound Based Stealth Game",

    description:
      "A 3D stealth game created during Global Game Jam where players steal a golden mask by masking their footsteps with environmental sounds like trains and snoring.",

    image: "/images/MaskJam.PNG",
    hoverImage: "/images/MaskJam-hover.PNG",

    highlight:
      "Designed a unique sound masking mechanic where players strategically move with background noises to avoid alerting the sleeping watchman.",

    technologies: [
      "Unity",
      "C#",
      "Unity Audio System",
      "Blender",
      "Unity Asset Store"
    ],

    category: "gamedev",

    github: "https://github.com/farrukhh31/MaskJam-StealthGame",
    video: "/videos/Mask-Jam.mp4",
    videoLabel: "Watch Demo",

    featured: true,
  },

  {
    slug: "emotion-aware-ai-containment-lab",
    title: "Emotion-Aware AI Containment Lab",
    description:
      "An immersive VR experience where players awaken and interact with an AI robot that dynamically responds to proximity, gaze, and interaction speed through an emotion simulation system.",

    image: "/images/Hero6-1.PNG",
    hoverImage: "/images/Hero6.PNG",

    highlight:
      "Built a real-time emotion simulation system that adapts robot behavior, lighting, animations, and audio based on player interactions in VR.",

    technologies: [
      "Unity",
      "C#",
      "OpenXR",
      "XR Interaction Toolkit",
      "Unity Input System"
    ],

    category: "gamedev",

    github: "https://github.com/farrukhh31/emotion-aware-ai-containment-lab",

    // Showcase the gameplay/demo video
    video: "/videos/Hero6-Project",
    videoLabel: "Watch Demo",

    featured: true,
  },

  {
    slug: "frontend-development-projects",
    title: "Frontend Development Projects",

    description:
      "A collection of responsive and interactive frontend applications built with modern web technologies, focusing on clean UI, smooth user experience, and performance.",

    image: "/images/frontend.PNG",
    hoverImage: "/images/frontend-hover.PNG",

    highlight:
      "Developed modern, responsive interfaces with reusable components, interactive animations, and optimized performance across desktop and mobile devices.",

    technologies: [
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3"
    ],

    category: "webdev",

    github: "https://github.com/farrukhh31/ITVE-Assessment-Frontend-Development-",
    demo: "https://itve-assessment-frontend-n8pa.vercel.app/",

    featured: true,
  },
  {
    slug: "vr-pit-stop-game",
    title: "VR Pit Stop Game",

    description:
      "An immersive VR simulation where players take on the role of an F1 pit crew mechanic, racing to change tires under time pressure using realistic hand interactions and haptic feedback.",

    image: "/images/PitStop.PNG",
    hoverImage: "/images/PitStop-hover.PNG",

    highlight:
      "Built a decoupled IDrillable interface architecture letting a single impact gun drill any object type, paired with a custom stencil-based outline shader for real-time interaction feedback.",

    technologies: [
      "Unity",
      "C#",
      "XR Interaction Toolkit",
      "Unity VFX Graph",
      "Custom Shaders"
    ],

    category: "gamedev",

    github: "https://github.com/farrukhh31/vr-pit-stop-game",
    video: "/videos/PitStop-Game.mp4",
    videoLabel: "Watch Demo",

    featured: true,
  },

  {
    slug: "ragdoll-fighting-game",
    title: "Ragdoll Fighting Game",

    description:
      "A local 2-player physics-based fighting game in Unreal Engine 5, blending animation-driven combos with real-time ragdoll physics on a floating island arena.",

    image: "/images/Ragdoll-Fight.PNG",
    hoverImage: "/images/Ragdoll-Fight-hover.PNG",

    highlight:
      "Built a knockout force accumulation system layered over a Physical Animation Component, letting every punch blend animation and physics per-bone for unpredictable, physically consequential combat.",

    technologies: [
      "Unreal Engine 5",
      "Blender",
      "UMG",
      "Physical Animation Component",
      "Blueprints"
    ],

    category: "gamedev",

    github: "https://github.com/farrukhh31/ragdoll-fighting-game",
    video: "/videos/Ragdoll-Fight.mp4",
    videoLabel: "Watch Demo",

    featured: true,
  },
];


