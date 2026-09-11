import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function About({ about, profile, reducedMotion }) {
  return (
    <section id="about" className="border-b border-white/[0.08] bg-[#191b1a] py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#91a6f0]">{about.label}</p>
            <h2 className="text-balance mt-4 max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl">{about.title}</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/56 sm:text-base sm:leading-8">{about.description}</p>

            <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-6 sm:w-fit sm:pr-8">
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
                className="grid gap-3 py-7 sm:grid-cols-[54px_1fr] sm:gap-5"
              >
                <p className="text-[9px] font-black tracking-[0.16em] text-white/22">{item.number}</p>
                <div>
                  <h3 className="text-xl font-bold tracking-[-0.03em]">{item.title}</h3>
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
