export const fadeUp = {
  hidden: { opacity: 0, y: 42, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 50, filter: "blur(10px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.82, y: 28, rotate: -2, filter: "blur(12px)" },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewportOnce = { once: true, amount: 0.25 };
