import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, Download } from "lucide-react";
import Container from "../common/Container";

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile, hero, reducedMotion }) {
  return (
    <section id="home" className="relative overflow-hidden border-b border-black/[0.07] bg-[#f5f3ee] text-[#171817]">
      <Container className="grid min-h-[calc(100vh-72px)] items-center gap-14 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "show"}
          variants={{ show: { transition: { staggerChildren: 0.075 } } }}
          className="max-w-4xl"
        >
          <motion.div variants={reveal} className="mb-9 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-black/42">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3557c8]" /> {profile.availability}
            </span>
            <span>{profile.location}</span>
          </motion.div>

          <motion.p variants={reveal} className="mb-5 text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">
            {hero.eyebrow}
          </motion.p>

          <motion.h1 variants={reveal} className="text-balance max-w-[900px] text-[clamp(3.25rem,7vw,7.35rem)] font-black leading-[0.9] tracking-[-0.07em] text-[#171817]">
            I build software that feels considered <span className="text-[#3557c8]">and works properly.</span>
          </motion.h1>

          <motion.p variants={reveal} className="mt-7 max-w-[670px] text-base leading-7 text-black/55 sm:text-lg sm:leading-8">
            {hero.description}
          </motion.p>

          <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
            <a href={hero.primaryLink} className="inline-flex items-center gap-3 rounded-full bg-[#171817] px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-[#3557c8]">
              {hero.primaryButton} <ArrowDownRight size={17} />
            </a>
            <a href={profile.cv} download={profile.cvFileName} className="inline-flex items-center gap-3 rounded-full border border-black/12 bg-white/45 px-6 py-3.5 text-sm font-semibold text-black/65 transition hover:bg-white hover:text-black">
              {hero.secondaryButton} <Download size={16} />
            </a>
          </motion.div>

          <motion.div variants={reveal} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/[0.07] pt-6">
            {(hero.signals || hero.stack).slice(0, 5).map((item) => (
              <span key={item} className="text-[11px] font-semibold text-black/42">{item}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[570px]"
        >
          <div className="overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#fbfaf7] shadow-[0_28px_70px_rgba(23,24,23,.09)]">
            <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <img src={profile.image} alt={profile.name} className="h-10 w-10 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-bold">{profile.name}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-black/40">Full-stack developer</p>
                </div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-[.16em] text-[#3557c8]">Selected approach</span>
            </div>

            <div className="p-5 sm:p-7">
              <p className="max-w-sm text-2xl font-black leading-[1.03] tracking-[-0.045em] sm:text-3xl">Good product work is mostly good decisions.</p>
              <p className="mt-4 max-w-md text-sm leading-7 text-black/52">I care about the workflow, the data, the edge cases and the interface — not just the screenshot.</p>

              <div className="mt-8 divide-y divide-black/[0.07] border-y border-black/[0.07]">
                {["Understand the workflow", "Design the system", "Build the interface", "Test the edge cases"].map((item, index) => (
                  <div key={item} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-3.5">
                    <span className="text-[9px] font-black text-black/25">0{index + 1}</span>
                    <span className="text-sm font-semibold text-black/72">{item}</span>
                    <Check size={14} className="text-[#3557c8]" />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[.12em] text-black/32">Laravel · Spring Boot · React · SQL</p>
                <a href="#projects" className="grid h-10 w-10 place-items-center rounded-full bg-[#171817] text-white transition hover:bg-[#3557c8]" aria-label="View projects">
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
