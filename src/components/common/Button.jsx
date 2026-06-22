import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Button({
  as = "a",
  children,
  className = "",
  variant = "primary",
  reducedMotion,
  ...props
}) {
  const MotionTag = motion[as];
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove(e) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.15); // subtle pull for large buttons
    y.set(dy * 0.15);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const styles =
    variant === "secondary"
      ? "border border-[#beb3a2] bg-white/30 text-[#1d1b17] hover:bg-white"
      : "bg-[#151412] text-white hover:bg-[#292723]";

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center gap-3 rounded-md px-6 py-3.5 text-sm font-semibold transition ${styles} ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
