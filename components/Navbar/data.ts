
import { FaGithub, FaLinkedin } from "react-icons/fa";

import {
  User,
  FolderKanban,
  BrainCircuit,
  Briefcase,
  Mail,
  FileDown,
} from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  icon: any;
  shortcut?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: any;
  action: string;
}

export const navigation: NavItem[] = [
  {
    id: "about",
    title: "About",
    icon: User,
    shortcut: "G A",
  },
  {
    id: "Recruiter",
    title: "Recruiter",
    icon: Briefcase,
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderKanban,
    shortcut: "G P",
  },
  {
    id: "skills",
    title: "Skills",
    icon: BrainCircuit,
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    shortcut: "G C",
  },
];

export const quickActions: QuickAction[] = [
  {
    id: "resume",
    title: "Download Resume",
    icon: FileDown,
    action: "resume",
  },
  {
    id: "github",
    title: "GitHub",
    icon: FaGithub,
    action: "github",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    icon: FaLinkedin,
    action: "linkedin",
  },
];

export const searchableItems = [
  ...navigation.map((item) => ({
    id: item.id,
    title: item.title,
    type: "Navigation",
    icon: item.icon,
  })),

  {
    id: "resume",
    title: "Download Resume",
    type: "Quick Action",
    icon: FileDown,
  },

  {
    id: "github",
    title: "GitHub",
    type: "Quick Action",
    icon: FaGithub,
  },

  {
    id: "linkedin",
    title: "LinkedIn",
    type: "Quick Action",
    icon: FaLinkedin,
  },

  {
    id: "email",
    title: "Copy Email",
    type: "Quick Action",
    icon: Mail,
  },

  {
    id: "sudo",
    title: "sudo hire",
    type: "Easter Egg",
    icon: BrainCircuit,
  },
];

