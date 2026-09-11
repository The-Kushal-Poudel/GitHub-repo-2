import { motion } from "framer-motion";
import Container from "../common/Container";

export default function Experience({ journeySection, reducedMotion }) {
  return (
    <section id="experience" className="border-b border-black/10 bg-[#f4f1ea] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#5b6cff]">{journeySection.label}</p>
            <h2 className="text-balance mt-4 text-4xl font-black leading-[0.94] tracking-[-0.058em] sm:text-5xl lg:text-6xl">{journeySection.title}</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-black/50">The pattern is simple: learn fast, build something real, then make the next version harder to break.</p>
          </div>

          <div className="space-y-3">
            {journeySection.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, x: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group grid gap-5 rounded-[24px] border border-black/[0.08] bg-white p-6 shadow-[0_10px_30px_rgba(17,19,26,.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#5b6cff]/25 hover:shadow-[0_18px_45px_rgba(17,19,26,.08)] sm:grid-cols-[150px_1fr] sm:p-7"
              >
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#5b6cff]">{item.period}</p>
                  <p className="mt-3 text-[10px] font-black text-black/20">0{index + 1}</p>
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-[-0.035em] sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.12em] text-black/35">{item.company}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-black/57">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
