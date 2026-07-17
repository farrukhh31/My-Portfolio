export type ExperienceItem = {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  type: "work" | "education";
  current?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    id: "zenvyrolabs",
    year: "2026",
    role: "Full Stack Web Development Intern",
    company: "Internship",
    description:
      "Worked on modern full-stack web applications using React, Node.js, MongoDB and collaborative development workflows.",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    type: "work",
    current: true,
  },

  {
    id: "devops-internship",
    year: "2025",
    role: "DevOps Intern",
    company: "Internship",
    description:
      "Learned Docker, Jenkins, Linux, CI/CD pipelines and deployment automation while working on practical DevOps projects.",
    technologies: ["Docker", "Jenkins", "Linux", "CI/CD", "Kubernetes"],
    type: "work",
  },

  {
    id: "sps-frontend",
    year: "2025",
    role: "Frontend Developer",
    company: " Internship",
    description:
      "Built responsive interfaces using HTML, CSS and JavaScript while learning UI development and best practices.",
    technologies: ["HTML", "CSS", "JavaScript"],
    type: "work",
  },

  {
    id: "ned-bscs",
    year: "2023",
    role: "BS Computer Science",
    company: "NED University",
    description:
      "Started Computer Science with specialization in Gaming & Animation while developing projects in web and game development.",
    technologies: ["Unity", "C#", "C++", "Game Development"],
    type: "education",
  },
];