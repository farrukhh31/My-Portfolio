import { ProjectCategory } from "./project-categories";

export type Project = {
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
  demo: "https://your-portfolio-url.com",

  featured: true,
},

  {
    title: "Unity Survival Game",
    description:
      "A 3D survival game featuring AI enemies, inventory, combat mechanics, and immersive gameplay.",

    image: "/projects/unity.png",
    hoverImage: "/projects/unity-hover.png",

    highlight:
      "Custom AI behavior trees drive enemy pathfinding, threat response, and pack tactics.",

    technologies: ["Unity", "C#", "Blender"],

    category: "gamedev",

    github: "#",
    // No public build to click into — a recorded run of the game instead.
    video: "https://www.youtube.com/embed/REPLACE_WITH_VIDEO_ID",
    videoLabel: "Watch Gameplay",

    featured: true,
  },

  {
  title: "Frontend Development Projects",

  description:
    "A collection of responsive and interactive frontend applications built with modern web technologies, focusing on clean UI, smooth user experience, and performance.",

  image: "/images/frontend.png",
  hoverImage: "/images/frontend-hover.png",

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
    title: "AI-Powered Document Q&A System",
    description:
      "A retrieval-augmented chatbot that answers questions over private documents using embeddings, vector search, and an LLM.",

    image: "/projects/ai.png",
    hoverImage: "/projects/ai-hover.png",

    highlight:
      "Reduced document lookup time by letting users ask questions in plain English instead of searching manually.",

    technologies: ["Python", "LangChain", "OpenAI API", "FastAPI", "Pinecone"],

    category: "ai",

    github: "#",
    demo: "#",

    featured: true,
  },
];
