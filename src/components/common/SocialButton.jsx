import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SocialButton({ children, href, label, reducedMotion }) {
  const isExternal = href?.startsWith("http");
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
    x.set(dx * 0.3); // stronger pull for small buttons
    y.set(dy * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }}
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      whileHover={reducedMotion ? undefined : { scale: 1.1, rotate: 4 }}
      whileTap={{ scale: 0.92 }}
      className="grid h-10 w-10 place-items-center rounded-full border border-[#e6ded0] bg-white text-[#151412] shadow-sm transition hover:border-[#b59a71] hover:text-[#b59a71]"
    >
      {children}
    </motion.a>
  );
}
