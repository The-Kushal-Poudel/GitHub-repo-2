import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, Download } from "lucide-react";
import Container from "../common/Container";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile, hero, reducedMotion }) {
  return (
    <section id="home" className="relative overflow-hidden border-b border-black/10">
      <Container className="grid min-h-[calc(100vh-74px)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "show"}
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          className="max-w-4xl"
        >
          <motion.div variants={reveal} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white/45 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.17em]">
              <span className="h-2 w-2 rounded-full bg-[#8eb800]" /> {profile.availability}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/45">{profile.location}</span>
          </motion.div>

          <motion.p variants={reveal} className="mb-5 text-[11px] font-black uppercase tracking-[0.24em] text-black/45">
            {hero.eyebrow}
          </motion.p>

          <motion.h1 variants={reveal} className="max-w-[980px] text-[clamp(3.1rem,7.2vw,7.7rem)] font-black leading-[0.88] tracking-[-0.075em] text-[#171712]">
            {hero.title}
          </motion.h1>

          <motion.p variants={reveal} className="mt-7 max-w-2xl text-base leading-7 text-black/58 sm:text-lg sm:leading-8">
            {hero.description}
          </motion.p>

          <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
            <a href={hero.primaryLink} className="inline-flex items-center gap-3 rounded-full bg-[#171712] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">
              {hero.primaryButton} <ArrowDownRight size={17} />
            </a>
            <a href={profile.cv} download={profile.cvFileName} className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/35 px-6 py-3.5 text-sm font-bold transition hover:bg-white/75">
              {hero.secondaryButton} <Download size={16} />
            </a>
          </motion.div>

          <motion.div variants={reveal} className="mt-10 flex flex-wrap gap-2">
            {hero.stack.map((item) => (
              <span key={item} className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-black/55">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          <div className="rounded-[30px] border border-black/10 bg-[#171712] p-4 shadow-[0_35px_80px_rgba(23,23,18,.18)] sm:p-5">
            <div className="mb-4 flex items-center justify-between px-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              <span>Product system</span>
              <span>KP / 2026</span>
            </div>

            <div className="rounded-[22px] bg-[#f4f0e8] p-5 sm:p-7">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/35">Current focus</p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">Build the flow, then polish it.</h2>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#d8ff57]">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              <div className="space-y-3">
                {["Product UI", "API & business rules", "Data & permissions", "Deployment & iteration"].map((item, index) => (
                  <div key={item} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-2xl border border-black/8 bg-white/55 px-4 py-3.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-black/[0.055] text-[10px] font-black">0{index + 1}</span>
                    <span className="text-sm font-bold">{item}</span>
                    <Check size={15} className="text-[#6e9000]" />
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-[#d8ff57] p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/45">Backend</p>
                  <p className="mt-2 text-sm font-black">Laravel / Java</p>
                </div>
                <div className="rounded-2xl bg-[#d7dcff] p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/45">Frontend</p>
                  <p className="mt-2 text-sm font-black">React / UI</p>
                </div>
                <div className="rounded-2xl bg-[#ffd9c8] p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/45">Data</p>
                  <p className="mt-2 text-sm font-black">SQL / State</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-4 hidden w-[185px] rounded-2xl border border-black/10 bg-white p-3 shadow-xl sm:block">
            <div className="flex items-center gap-3">
              <img src={profile.image} alt={profile.name} className="h-11 w-11 rounded-xl object-cover" />
              <div>
                <p className="text-xs font-black">{profile.name}</p>
                <p className="mt-0.5 text-[10px] font-semibold text-black/45">{profile.role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
