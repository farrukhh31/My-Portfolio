// Single source of truth for footer content.

interface SocialLink {
  name: string;
  icon: string;
  href: string;
  accent: string;
  download?: string;
}

export const socials: SocialLink[] = [
  {
    name: "GitHub",
    icon: "github",
    href: "https://github.com/farrukhh31",
    accent: "#a78bfa",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/farrukh-ahmed-248356246/",
    accent: "#38bdf8",
  },
  {
    name: "Email",
    icon: "mail",
    href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=afarrukh553@gmail.com&su=Portfolio%20Inquiry%20for%20Farrukh%20Ahmad",
    accent: "#34d399",
  },
  {
    name: "Resume",
    icon: "download",
    href: "/resume.pdf",
    accent: "#fbbf24",
    download: "Farrukh-Ahmad-Resume.pdf",
  },
];


export const quickLinks = [
  {
    label: "Home",
    href: "#hero",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Contact",
    href: "#footer",
  },
];


export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
];


export const availability = {
  open: true,
  label: "Open to full-time & freelance work",
};


export const identity = {
  initials: "FA",
  name: "Farrukh Ahmad",
};