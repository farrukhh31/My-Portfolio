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

  // A publicly hosted, clickable live demo. Leave empty ("" or omit)
  // for projects that can't be deployed for public access (games,
  // internal tools, infra) — use `video` instead.
  demo?: string;

  // A recorded walkthrough: a YouTube/Vimeo embed URL
  // (https://www.youtube.com/embed/VIDEO_ID) or a direct .mp4 file.
  // When present, the card shows a "Watch Gameplay" / "Watch Demo"
  // button that opens an in-page video modal instead of a dead link.
  video?: string;
  videoLabel?: string;

  featured?: boolean;
};

export const Projects: Project[] = [
  {
    title: "Employee Task Management System",
    description:
      "A full-stack task management application with authentication, dashboards, role-based access, and real-time project management.",

    image: "/projects/taskmanager.png",
    hoverImage: "/projects/taskmanager-hover.png",

    highlight:
      "Cut manual status updates by automating task assignment and progress tracking across teams.",

    technologies: ["React", "Node.js", "MongoDB", "Express", "Docker"],

    category: "webdev",

    github: "#",
    demo: "#",

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
    title: "Automated Cloud Deployment Pipeline",
    description:
      "A CI/CD pipeline that builds, tests, containerizes, and deploys services to the cloud on every push, with zero-downtime rollouts.",

    image: "/projects/devops.png",
    hoverImage: "/projects/devops-hover.png",

    highlight:
      "Cut deployment time from a manual half-day process to an automated, monitored rollout in minutes.",

    technologies: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "AWS"],

    category: "devops",

    github: "#",
    // Infra work has no public URL to demo — a screen recording of the
    // pipeline running end-to-end instead.
    video: "https://www.youtube.com/embed/REPLACE_WITH_VIDEO_ID",
    videoLabel: "Watch Pipeline Demo",

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
