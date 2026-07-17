import { Certificate } from "./types";

export const certificates: Certificate[] = [
  {
    id: "cgea-preproduction",

    title: "Pre-Production for Games & Animation",

    issuer:
      "CGEA — Centre of Excellence in Gaming & Animation",

    year: "2025",

    category: "game-dev",

    status: "completed",

    featured: true,

    description:
      "Learned the complete game production pipeline including ideation, storyboarding, concept art, documentation, asset planning and production workflow.",

    skills: [
      "Game Design",
      "Concept Art",
      "Storyboarding",
      "Production Pipeline",
      "Documentation",
    ],

    image: "/certificates/cgea-preproduction.jpg",

    pdf: "#",

    credentialId: "CGEA-PP-2025",
  },

  {
    id: "cgea-unreal",

    title: "Unreal Engine Development",

    issuer:
      "CGEA — Centre of Excellence in Gaming & Animation",

    year: "2025",

    category: "game-dev",

    status: "completed",

    description:
      "Built interactive gameplay systems using Unreal Engine, Blueprints, level design principles and real-time rendering techniques.",

    skills: [
      "Unreal Engine",
      "Blueprints",
      "Level Design",
      "Lighting",
      "Gameplay Systems",
    ],

    image: "/certificates/unreal.jpg",

    pdf: "#",

    credentialId: "CGEA-UE-2025",
  },

  {
    id: "aspire-ai",

    title: "Generative AI Certification",

    issuer: "Aspire Pakistan",

    year: "2025",

    category: "ai",

    status: "completed",

    description:
      "Hands-on training in Generative AI, prompt engineering, LLM applications and modern AI productivity tools.",

    skills: [
      "Generative AI",
      "Prompt Engineering",
      "LLMs",
      "AI Tools",
      "Automation",
    ],

    image: "/certificates/aspire-ai.jpg",

    pdf: "#",

    credentialId: "ASP-GENAI-2025",
  },

  {
    id: "meta-frontend",

    title: "Meta Front-End Developer",

    issuer: "Coursera",

    year: "2025",

    category: "web-dev",

    status: "completed",

    description:
      "Comprehensive training covering responsive web development using React, JavaScript, HTML and CSS.",

    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Responsive Design",
    ],

    image: "/certificates/meta-frontend.jpg",

    pdf: "#",
  },

  {
    id: "fullstack",

    title: "Full Stack Web Development",

    issuer: "Coursera",

    year: "2026",

    category: "web-dev",

    status: "completed",

    description:
      "Full-stack application development including backend APIs, databases, authentication and deployment.",

    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "Authentication",
    ],

    image: "/certificates/fullstack.jpg",

    pdf: "#",
  },

  {
    id: "ml-specialization",

    title: "Machine Learning Specialization",

    issuer: "Coursera",

    year: "2026",

    category: "ai",

    status: "in-progress",

    progress: 65,

    expectedCompletion: "Dec 2026",

    description:
      "Studying supervised learning, neural networks, deep learning and practical machine learning workflows.",

    skills: [
      "Python",
      "Machine Learning",
      "Neural Networks",
      "TensorFlow",
      "Data Processing",
    ],

    image: "/certificates/ml.jpg",
  },

  {
    id: "backend",

    title: "Backend Development",

    issuer: "Coursera",

    year: "2026",

    category: "web-dev",

    status: "in-progress",

    progress: 40,

    expectedCompletion: "2026",

    description:
      "Learning backend architecture, REST APIs, authentication, cloud deployment and scalable server-side development.",

    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST API",
      "JWT",
    ],

    image: "/certificates/backend.jpg",
  },
];