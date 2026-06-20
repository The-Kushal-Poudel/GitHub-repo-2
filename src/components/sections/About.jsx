import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { fadeLeft, popIn, stagger } from "../../lib/animations";
import { iconMap } from "../../lib/iconMap";
import { Code } from "lucide-react";

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
    </section>
  );
}
