import { motion } from "framer-motion";
import Container from "../common/Container";

export default function Experience({ journeySection, reducedMotion }) {
  return (
    <section id="experience" className="border-b border-black/10 bg-[#f4f0e8] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/42">{journeySection.label}</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">{journeySection.title}</h2>
          </div>

          <div className="border-t border-black/12">
            {journeySection.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, x: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="grid gap-4 border-b border-black/12 py-7 sm:grid-cols-[150px_1fr] sm:py-9"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/40">{item.period}</p>
                <div>
                  <h3 className="text-xl font-black tracking-[-0.03em] sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-black/38">{item.company}</p>
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
