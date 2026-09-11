import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function About({ about, profile, reducedMotion }) {
  return (
    <section id="about" className="border-b border-white/[0.08] bg-[#191b1a] py-16 text-white sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#91a6f0]">{about.label}</p>
            <h2 className="text-balance mt-3 max-w-xl text-[2.15rem] font-black leading-[0.97] tracking-[-0.05em] sm:mt-4 sm:text-5xl sm:leading-[0.95] sm:tracking-[-0.055em] lg:text-6xl">{about.title}</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/56 sm:mt-7 sm:text-base sm:leading-8">{about.description}</p>

            <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5 sm:mt-9 sm:w-fit sm:pr-8 sm:pt-6">
              <img src={profile.image} alt={profile.name} className="h-12 w-12 rounded-xl object-cover grayscale-[15%]" />
              <div>
                <p className="text-sm font-bold">{profile.name}</p>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-white/35 hover:text-white">
                  LinkedIn <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
            {about.principles.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.46, delay: index * 0.05 }}
                className="grid gap-2.5 py-6 sm:grid-cols-[54px_1fr] sm:gap-5 sm:py-7"
              >
                <p className="text-[9px] font-black tracking-[0.16em] text-white/22">{item.number}</p>
                <div>
                  <h3 className="text-[1.15rem] font-bold tracking-[-0.03em] sm:text-xl">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-white/48">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
