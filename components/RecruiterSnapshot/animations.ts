export const fadeBlur = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
    filter: "blur(12px)",
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const spring = {
  type: "spring",
  stiffness: 140,
  damping: 20,
};

export const hover = {
  scale: 1.015,
};

export const active = {
  scale: 1.02,
};