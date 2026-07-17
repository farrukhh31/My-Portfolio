import { Skill } from "./types";

export const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    icon: "react",
    category: "Frontend",
    level: "Advanced",
    experience: "2+ Years",
    description:
      "Built reusable components, dashboards, responsive interfaces and animations.",
    projects: [
      "Portfolio",
      "Employee Task Manager",
      "Internship Projects",
    ],
    related: ["next", "typescript", "tailwind"],
    x: 40,
    y: 20,
  },

  {
    id: "next",
    name: "Next.js",
    icon: "next",
    category: "Frontend",
    level: "Advanced",
    experience: "1+ Year",
    description:
      "Built production-ready applications using App Router and Server Components.",
    projects: ["Portfolio"],
    related: ["react", "typescript"],
    x: 70,
    y: 35,
  },

  {
    id: "typescript",
    name: "TypeScript",
    icon: "typescript",
    category: "Languages",
    level: "Strong",
    experience: "1+ Year",
    description:
      "Used throughout modern React and Next.js projects.",
    projects: ["Portfolio"],
    related: ["react", "next"],
    x: 25,
    y: 45,
  },

  {
    id: "node",
    name: "Node.js",
    icon: "node",
    category: "Backend",
    level: "Strong",
    experience: "2 Years",
    description:
      "REST APIs, authentication and backend services.",
    projects: ["Task Manager"],
    related: ["mongodb", "docker"],
    x: 18,
    y: 72,
  },

  {
    id: "mongodb",
    name: "MongoDB",
    icon: "mongodb",
    category: "Database",
    level: "Strong",
    experience: "2 Years",
    description:
      "Database design and backend integration.",
    projects: ["Task Manager"],
    related: ["node"],
    x: 52,
    y: 82,
  },

  {
    id: "docker",
    name: "Docker",
    icon: "docker",
    category: "DevOps",
    level: "Comfortable",
    experience: "1 Year",
    description:
      "Containerization and deployment workflows.",
    projects: ["DevOps Internship"],
    related: ["linux"],
    x: 85,
    y: 65,
  },

  {
    id: "linux",
    name: "Linux",
    icon: "linux",
    category: "DevOps",
    level: "Comfortable",
    experience: "1 Year",
    description:
      "Server management and DevOps workflows.",
    projects: ["DevOps Internship"],
    related: ["docker"],
    x: 72,
    y: 90,
  },

  {
    id: "unity",
    name: "Unity",
    icon: "unity",
    category: "Game Development",
    level: "Strong",
    experience: "3 Years",
    description:
      "Gameplay programming, XR, AI and animation systems.",
    projects: [
      "Kitchen Carnage",
      "VR Robot",
      "Forest Project",
    ],
    related: ["csharp"],
    x: 92,
    y: 25,
  },

  {
    id: "csharp",
    name: "C#",
    icon: "csharp",
    category: "Languages",
    level: "Strong",
    experience: "3 Years",
    description:
      "Primary language for Unity development.",
    projects: [
      "Kitchen Carnage",
      "VR Robot",
    ],
    related: ["unity"],
    x: 82,
    y: 8,
  },
];