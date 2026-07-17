export const Projects = [
  {
    title: "Employee Task Management System",
    description:
      "A full-stack task management application with authentication, dashboards, role-based access, and real-time project management.",

    // Shown by default
    image: "/projects/taskmanager.png",
    // Crossfades in on hover — e.g. a close-up of the dashboard UI
    hoverImage: "/projects/taskmanager-hover.png",

    // Shown by default
    // Swaps in on hover — keep this short, it replaces the description
    highlight:
      "Cut manual status updates by automating task assignment and progress tracking across teams.",

    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Docker",
    ],

    github: "#",

    demo: "#",

    featured: true,
  },

  {
    title: "Portfolio Website",

    description:
      "Modern animated portfolio built using Next.js, Tailwind CSS and Framer Motion.",

    image: "/projects/portfolio.png",
    hoverImage: "/projects/portfolio-hover.png",

    highlight:
      "Built for 90+ Lighthouse scores with cursor-driven micro-interactions throughout.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
    ],

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

    technologies: [
      "Unity",
      "C#",
      "Blender",
    ],

    github: "#",

    demo: "#",

    featured: true,
  },
];
