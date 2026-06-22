import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { fadeLeft, popIn, stagger } from "../../lib/animations";
import { iconMap } from "../../lib/iconMap";
import { Code } from "lucide-react";

/** Animated counter — counts from 0 to target when scrolled into view. */
function AnimatedCounter({ value, suffix = "", reducedMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 28, mass: 1 });

  useEffect(() => {
    if (isInView) {
      motionVal.set(reducedMotion ? value : value);
    }
  }, [isInView, value, motionVal, reducedMotion]);

  useEffect(() => {
    if (reducedMotion && ref.current) {
      ref.current.textContent = value + suffix;
      return;
    }

    const unsubscribe = springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [springVal, suffix, value, reducedMotion]);

  return (
    <motion.span
      ref={ref}
      className="text-3xl font-bold tabular-nums text-[#1f1c18] sm:text-4xl"
    >
      0{suffix}
    </motion.span>
  );
}

const stats = [
  { id: "experience", value: 2, suffix: "+", label: "Years Experience" },
  { id: "projects", value: 10, suffix: "+", label: "Projects Built" },
  { id: "technologies", value: 9, suffix: "+", label: "Technologies" },
  { id: "satisfaction", value: 100, suffix: "%", label: "Client Satisfaction" },
];

export default function About({ about, reducedMotion }) {
  return (
    <section id="about" className="relative overflow-hidden border-y border-[#e6ded0] bg-[#f8f3eb] py-12 lg:py-14">
      <motion.div
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -left-24 top-10 h-52 w-52 rounded-full border border-dashed border-[#d6c7ad]"
        aria-hidden="true"
      />

      <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div variants={fadeLeft} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <SectionHeading label={about.label} title={about.title} description={about.description} iconImage={about.iconImage} />
          <motion.p
            whileInView={reducedMotion ? undefined : { x: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-5 font-serif text-3xl italic text-[#a78d67]"
          >
            {about.signature}
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {about.cards.map((card) => {
            const Icon = iconMap[card.icon] || Code;

            return (
              <motion.div
                key={card.id}
                variants={popIn}
                whileHover={reducedMotion ? undefined : { y: -14, rotate: -1.5, scale: 1.035, transition: { type: "spring", stiffness: 220, damping: 16 } }}
                className="group rounded-2xl border border-[#e6ded0] bg-white/55 p-5 shadow-sm transition hover:bg-white hover:shadow-xl hover:shadow-black/5"
              >
                <motion.div
                  whileHover={reducedMotion ? undefined : { rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 grid h-[52px] w-[52px] place-items-center rounded-full bg-[#f0eadf] text-[#1c1a17] transition group-hover:bg-[#1c1a17] group-hover:text-white"
                  aria-hidden="true"
                >
                  <Icon size={23} />
                </motion.div>
                <h3 className="mb-3 text-base font-bold text-[#211f1a]">{card.title}</h3>
                <p className="text-sm leading-7 text-[#665e53]">{card.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>

      {/* ── Animated Stats Counters ── */}
      <Container className="mt-10 lg:mt-14">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-6 rounded-2xl border border-[#e6ded0] bg-white/60 p-6 shadow-sm backdrop-blur sm:p-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                reducedMotion={reducedMotion}
              />
              <span className="mt-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8c806f] sm:text-[11px]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
