import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function About({ about, profile, reducedMotion }) {
  return (
    <section id="about" className="relative overflow-hidden border-b border-white/[0.08] bg-[#5b6cff] py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-[#c9ff4b]/18 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-[-120px] h-72 w-72 rounded-full bg-[#9b82ff]/30 blur-[110px]" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#dce2ff]">{about.label}</p>
            <h2 className="text-balance mt-4 max-w-xl text-4xl font-black leading-[0.94] tracking-[-0.06em] sm:text-5xl lg:text-7xl">{about.title}</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">{about.description}</p>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur-sm sm:w-fit sm:pr-6">
              <img src={profile.image} alt={profile.name} className="h-14 w-14 rounded-xl object-cover ring-1 ring-white/15" />
              <div>
                <p className="text-sm font-black">{profile.name}</p>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.12em] text-white/45 hover:text-[#c9ff4b]">
                  See profile <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {about.principles.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group min-h-[230px] rounded-[24px] border border-white/[0.13] bg-[#11131a] p-6 shadow-[0_18px_40px_rgba(0,0,0,.12)] transition duration-300 hover:-translate-y-1 hover:border-[#c9ff4b]/45 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black tracking-[0.2em] text-white/25">{item.number}</p>
                  <span className="h-2 w-2 rounded-full bg-[#c9ff4b] opacity-0 shadow-[0_0_16px_rgba(201,255,75,.7)] transition group-hover:opacity-100" />
                </div>
                <h3 className="mt-12 text-xl font-black tracking-[-0.035em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/52">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
