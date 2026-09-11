import { motion } from "framer-motion";
import Container from "../common/Container";

function isCurrent(period = "") {
  return /present|current|now/i.test(period);
}

export default function Experience({ journeySection, reducedMotion }) {
  return (
    <section
      id="experience"
      className="border-b border-black/[0.07] bg-[#fbfaf7] py-16 sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">
              {journeySection.label}
            </p>
            <h2 className="mt-3 max-w-xl text-balance text-[2.25rem] font-black leading-[0.96] tracking-[-0.055em] sm:mt-4 sm:text-5xl lg:text-6xl">
              {journeySection.title}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-black/46">
              A focused timeline of where the work became more practical, more collaborative, and more product-driven.
            </p>

            <div className="mt-8 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-black/30 lg:flex">
              <span className="h-px w-10 bg-black/12" />
              Work, internship & education
            </div>
          </div>

          <div className="relative border-t border-black/[0.09]">
            {journeySection.items.map((item, index) => {
              const current = isCurrent(item.period);

              return (
                <motion.article
                  key={item.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.46, delay: index * 0.05 }}
                  className={`group relative grid gap-4 border-b border-black/[0.09] py-7 sm:grid-cols-[150px_1fr] sm:gap-8 sm:py-8 ${
                    current ? "before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-[#3557c8] sm:pl-5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-5 sm:block">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#3557c8]">
                        {item.period}
                      </p>
                      {current && (
                        <p className="mt-2 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-black/35">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#3557c8]" />
                          Current
                        </p>
                      )}
                    </div>
                    <p className="text-[9px] font-bold tracking-[0.14em] text-black/18 sm:mt-8">
                      0{index + 1}
                    </p>
                  </div>

                  <div className="sm:pr-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div>
                        <h3 className="text-[1.25rem] font-black tracking-[-0.038em] text-[#171817] transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-black/32">
                          {item.company}
                        </p>
                      </div>
                      <span className="mt-1 hidden h-px w-8 shrink-0 bg-black/10 transition-all duration-300 group-hover:w-12 group-hover:bg-[#3557c8]/45 sm:block" />
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-black/54 sm:mt-5">
                      {item.text}
                    </p>
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
