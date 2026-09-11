import { motion } from "framer-motion";
import Container from "../common/Container";

export default function Experience({ journeySection, reducedMotion }) {
  return (
    <section id="experience" className="border-b border-black/[0.07] bg-[#fbfaf7] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">{journeySection.label}</p>
            <h2 className="text-balance mt-4 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl">{journeySection.title}</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-black/46">A simple timeline of where I learned, what I shipped, and how the work became more serious.</p>
          </div>

          <div className="border-t border-black/[0.08]">
            {journeySection.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
                className="grid gap-4 border-b border-black/[0.08] py-7 sm:grid-cols-[155px_1fr] sm:gap-7"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#3557c8]">{item.period}</p>
                  <p className="mt-2 text-[9px] font-bold text-black/20">0{index + 1}</p>
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-[-0.035em] sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-black/32">{item.company}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-black/54">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
