import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function About({ about, profile, reducedMotion }) {
  return (
    <section id="about" className="border-b border-black/10 bg-[#f4f0e8] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/42">{about.label}</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">{about.title}</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-black/58 sm:text-base sm:leading-8">{about.description}</p>

            <div className="mt-8 flex items-center gap-4">
              <img src={profile.image} alt={profile.name} className="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <p className="text-sm font-black">{profile.name}</p>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-black/45 hover:text-black">
                  LinkedIn <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid border-t border-l border-black/10 sm:grid-cols-2">
            {about.principles.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="min-h-[230px] border-b border-r border-black/10 p-6 sm:p-7"
              >
                <p className="text-[10px] font-black tracking-[0.2em] text-black/30">{item.number}</p>
                <h3 className="mt-12 text-xl font-black tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/55">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
