import { motion } from "framer-motion";
import Container from "../common/Container";

function isCurrent(period = "") {
  return /present|current|now/i.test(period);
}

export default function Experience({ journeySection, reducedMotion }) {
  return (
    <section id="experience" className="relative overflow-hidden border-b border-white/10 bg-[#0d1830] py-18 text-white sm:py-22 lg:py-28">
      <div className="pointer-events-none absolute left-[-8%] top-[8%] h-[360px] w-[360px] rounded-full bg-[#9ed7ff]/10 blur-3xl" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#caff4f]">{journeySection.label}</p>
            <h2 className="mt-4 max-w-xl text-balance text-[2.8rem] font-black leading-[.93] tracking-[-.06em] sm:text-6xl lg:text-[5.3rem]">{journeySection.title}</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">A focused timeline of where the work became more practical, more collaborative, and more product-driven.</p>
            <div className="mt-10 hidden h-[250px] overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-[#172846] to-[#10203a] p-7 lg:block">
              <div className="flex h-full flex-col justify-between">
                <span className="text-[9px] font-black uppercase tracking-[.16em] text-[#9ed7ff]">Work · Internship · Education</span>
                <div className="text-[7rem] font-black leading-none tracking-[-.1em] text-[#caff4f]/10">{"{}"}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/12">
            {journeySection.items.map((item, index) => {
              const current = isCurrent(item.period);
              return (
                <motion.article
                  key={item.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group relative grid gap-4 border-b border-white/12 py-8 sm:grid-cols-[155px_1fr] sm:gap-9 sm:py-9 ${current ? "before:absolute before:inset-y-5 before:left-0 before:w-[3px] before:rounded-full before:bg-[#caff4f] sm:pl-6" : ""}`}
                >
                  <div className="flex items-center justify-between gap-5 sm:block">
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-[0.12em] ${current ? "text-[#caff4f]" : "text-[#9ed7ff]"}`}>{item.period}</p>
                      {current && <p className="mt-2 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.12em] text-white/36"><span className="h-1.5 w-1.5 rounded-full bg-[#caff4f]" />Current</p>}
                    </div>
                    <p className="text-[9px] font-black tracking-[0.14em] text-white/18 sm:mt-8">0{index + 1}</p>
                  </div>
                  <div className="sm:pr-5">
                    <h3 className="text-[1.35rem] font-black tracking-[-.04em] transition duration-300 group-hover:translate-x-1 sm:text-[1.85rem]">{item.title}</h3>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#9ed7ff]">{item.company}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52 sm:mt-5">{item.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
