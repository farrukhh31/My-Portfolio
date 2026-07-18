export interface StoryItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  tags: string[];
}

export const story: StoryItem[] = [
  {
    id: 1,
    title: "Who I Am",
    subtitle: "Engineer. Creator. Problem Solver.",
    description:
      "I'm Farrukh Ahmad, a BS Gaming & Animation student at NED University of Engineering & Technology. I enjoy creating software that blends engineering with creativity — from modern web applications to interactive digital experiences and intelligent systems.",
    accent: "01",
    tags: ["Full Stack", "Game Dev", "DevOps", "AI"],
  },
  {
    id: 2,
    title: "What I Build",
    subtitle: "From ideas to production.",
    description:
      "I build full stack web applications, real-time games, AI-powered tools, and automated pipelines that ship them reliably. I enjoy transforming concepts into scalable products with clean architecture and intuitive user experiences.",
    accent: "02",
    tags: ["React", "Next.js", "Unity", "Node.js"],
  },
  {
    id: 3,
    title: "How I Work",
    subtitle: "Think. Build. Automate.",
    description:
      "Every project starts with understanding the problem. I focus on writing maintainable code, designing scalable systems, and automating the repetitive parts — CI/CD, testing, deployments — so I can spend more time on what actually moves the product forward.",
    accent: "03",
    tags: ["Docker", "CI/CD", "Linux", "Bash"],
  },
  {
    id: 4,
    title: "Current Focus",
    subtitle: "Always learning.",
    description:
      "I'm currently deepening my knowledge in backend engineering, applied AI, and cloud-native DevOps — building production-ready applications while automating everything from workflows to deployments.",
    accent: "04",
    tags: ["AI / ML", "Cloud", "Automation", "TypeScript"],
  },
];
