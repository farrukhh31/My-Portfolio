

export type ProjectCategory = "webdev" | "gamedev" | "devops" | "ai";

type CategoryStyle = {
  label: string;
  text: string;
  groupHoverText: string;
  badgeBorder: string;
  badgeBg: string;
  chipBorder: string;
  chipBg: string;
  chipHoverBorder: string;
  chipHoverBg: string;
  cardHoverBorder: string;
  glow: string;
  gradientBar: string;
  button: string;
  buttonGlow: string;
  spotlight: string;
  dot: string;
  ring: string;
};

export const categoryConfig: Record<ProjectCategory, CategoryStyle> = {
  webdev: {
    label: "Full-Stack",
    text: "text-cyan-300",
    groupHoverText: "group-hover:text-cyan-300",
    badgeBorder: "border-cyan-400/30",
    badgeBg: "bg-cyan-400/10",
    chipBorder: "border-cyan-400/20",
    chipBg: "bg-cyan-400/10",
    chipHoverBorder: "hover:border-cyan-400/50",
    chipHoverBg: "hover:bg-cyan-400/20",
    cardHoverBorder: "hover:border-cyan-400/30",
    glow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]",
    gradientBar: "from-cyan-400 via-cyan-300 to-blue-400",
    button: "bg-cyan-400 text-slate-950",
    buttonGlow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]",
    spotlight: "rgba(34,211,238,0.14)",
    dot: "bg-cyan-400",
    ring: "ring-cyan-400/40",
  },
  gamedev: {
    label: "Game Dev",
    text: "text-violet-300",
    groupHoverText: "group-hover:text-violet-300",
    badgeBorder: "border-violet-400/30",
    badgeBg: "bg-violet-400/10",
    chipBorder: "border-violet-400/20",
    chipBg: "bg-violet-400/10",
    chipHoverBorder: "hover:border-violet-400/50",
    chipHoverBg: "hover:bg-violet-400/20",
    cardHoverBorder: "hover:border-violet-400/30",
    glow: "hover:shadow-[0_0_40px_rgba(167,139,250,0.18)]",
    gradientBar: "from-violet-400 via-purple-300 to-fuchsia-400",
    button: "bg-violet-400 text-slate-950",
    buttonGlow: "hover:shadow-[0_0_25px_rgba(167,139,250,0.4)]",
    spotlight: "rgba(167,139,250,0.14)",
    dot: "bg-violet-400",
    ring: "ring-violet-400/40",
  },
  devops: {
    label: "DevOps",
    text: "text-amber-300",
    groupHoverText: "group-hover:text-amber-300",
    badgeBorder: "border-amber-400/30",
    badgeBg: "bg-amber-400/10",
    chipBorder: "border-amber-400/20",
    chipBg: "bg-amber-400/10",
    chipHoverBorder: "hover:border-amber-400/50",
    chipHoverBg: "hover:bg-amber-400/20",
    cardHoverBorder: "hover:border-amber-400/30",
    glow: "hover:shadow-[0_0_40px_rgba(251,191,36,0.18)]",
    gradientBar: "from-amber-400 via-orange-300 to-yellow-400",
    button: "bg-amber-400 text-slate-950",
    buttonGlow: "hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]",
    spotlight: "rgba(251,191,36,0.14)",
    dot: "bg-amber-400",
    ring: "ring-amber-400/40",
  },
  ai: {
    label: "AI / ML",
    text: "text-emerald-300",
    groupHoverText: "group-hover:text-emerald-300",
    badgeBorder: "border-emerald-400/30",
    badgeBg: "bg-emerald-400/10",
    chipBorder: "border-emerald-400/20",
    chipBg: "bg-emerald-400/10",
    chipHoverBorder: "hover:border-emerald-400/50",
    chipHoverBg: "hover:bg-emerald-400/20",
    cardHoverBorder: "hover:border-emerald-400/30",
    glow: "hover:shadow-[0_0_40px_rgba(52,211,153,0.18)]",
    gradientBar: "from-emerald-400 via-teal-300 to-green-400",
    button: "bg-emerald-400 text-slate-950",
    buttonGlow: "hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]",
    spotlight: "rgba(52,211,153,0.14)",
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/40",
  },
};

export const categoryOrder: ProjectCategory[] = [
  "webdev",
  "gamedev",
  "devops",
  "ai",
];
