import { motion } from "framer-motion";
import Container from "../common/Container";
import { fadeUp, stagger } from "../../lib/animations";
import { iconMap } from "../../lib/iconMap";
import { Briefcase } from "lucide-react";

export default function Experience({ journeySection, reducedMotion }) {
  return (
    <section id="experience" className="relative overflow-hidden bg-[#151513] py-12 text-white lg:py-14">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:60px_60px]" aria-hidden="true" />
      <motion.div
        animate={reducedMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#b9a17a] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.p variants={fadeUp} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true }} className={`mb-3 ${journeySection.iconImage ? "inline-flex items-center gap-2" : ""} text-[10px] font-black uppercase tracking-[0.3em] text-[#b9a17a] sm:text-[11px]`}>
          {journeySection.iconImage && (
            <img src={journeySection.iconImage} alt="" className="w-5 h-5 object-contain" />
          )}
          {journeySection.label}
        </motion.p>
        <motion.h2 variants={fadeUp} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true }} className="mb-10 font-serif text-3xl sm:text-4xl lg:text-5xl">
          {journeySection.title}
        </motion.h2>

        <svg className="absolute left-8 right-8 top-40 hidden h-36 w-[calc(100%-4rem)] opacity-35 lg:block" viewBox="0 0 1200 120" fill="none" aria-hidden="true">
          <motion.path
            d="M 0 55 C 180 0, 280 110, 430 50 S 720 20, 850 55 S 1050 75, 1200 35"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="6 8"
            initial={reducedMotion ? false : { pathLength: 0 }}
            whileInView={reducedMotion ? undefined : { pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </svg>

        <motion.div variants={stagger} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative grid gap-8 md:grid-cols-3">
          {journeySection.items.map((item) => {
            const Icon = iconMap[item.icon] || Briefcase;

            return (
              <motion.div key={item.id} variants={fadeUp} whileHover={reducedMotion ? undefined : { y: -12 }} className="relative">
                <motion.div
                  animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white text-[#171614] shadow-xl"
                  aria-hidden="true"
                >
                  <Icon size={22} />
                </motion.div>
                <p className="mb-2 text-sm font-bold text-[#b9a17a]">{item.year}</p>
                <h3 className="mb-1 text-lg font-bold lg:text-xl">{item.title}</h3>
                <p className="mb-4 text-sm text-white/55">{item.company}</p>
                <p className="max-w-sm text-sm leading-7 text-white/70">{item.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
