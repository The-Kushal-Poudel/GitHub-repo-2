import { useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Container from "../common/Container";

/** Magnetic hover chip — icon follows cursor slightly on hover. */
function MagneticChip({ children, reducedMotion }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.6 });

  function handleMouseMove(e) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }}
      whileHover={reducedMotion ? undefined : { scale: 1.12 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="flex min-w-[130px] cursor-default items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/75 backdrop-blur transition-shadow hover:border-[#b9a17a]/40 hover:bg-white/[0.08] hover:text-white hover:shadow-lg hover:shadow-[#b9a17a]/10 sm:min-w-[145px] sm:px-5 sm:py-3"
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-[#b9a17a]"
        aria-hidden="true"
        animate={reducedMotion ? undefined : { scale: [1, 1.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </motion.div>
  );
}

export default function TechStack({ techStack, reducedMotion }) {
  const repeatedTech = useMemo(
    () => [...techStack.items, ...techStack.items, ...techStack.items],
    [techStack.items]
  );

  return (
    <section id="skills" className="relative overflow-hidden bg-[#151513] py-10 text-white lg:py-12">
      <motion.div
        animate={reducedMotion ? undefined : { x: ["-20%", "0%", "-20%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-y-0 left-0 w-[160%] opacity-[0.05] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:50px_50px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-7 text-center ${techStack.iconImage ? "inline-flex items-center justify-center gap-2 w-full" : ""} text-[10px] font-black uppercase tracking-[0.35em] text-[#b9a17a] sm:text-[11px]`}
        >
          {techStack.iconImage && (
            <img src={techStack.iconImage} alt="" className="w-5 h-5 object-contain" />
          )}
          {techStack.label}
        </motion.p>

        <div className="relative overflow-hidden">
          <motion.div
            animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-3 sm:gap-4"
          >
            {repeatedTech.map((tech, index) => (
              <MagneticChip key={`${tech.id}-${index}`} reducedMotion={reducedMotion}>
                {tech.label}
              </MagneticChip>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
