import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, Download, Sparkles } from "lucide-react";
import Container from "../common/Container";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile, hero, reducedMotion }) {
  return (
    <section id="home" className="soft-noise relative overflow-hidden border-b border-white/[0.07] bg-[#0a0c10] text-white">
      <div className="cool-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-28 top-16 h-[420px] w-[420px] rounded-full bg-[#5b6cff]/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-8%] top-[12%] h-[460px] w-[460px] rounded-full bg-[#9b82ff]/16 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-220px] left-[35%] h-[420px] w-[420px] rounded-full bg-[#c9ff4b]/10 blur-[130px]" />

      <Container className="relative grid min-h-[calc(100vh-76px)] items-center gap-14 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "show"}
          variants={{ show: { transition: { staggerChildren: 0.085 } } }}
          className="max-w-4xl"
        >
          <motion.div variants={reveal} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c9ff4b]/25 bg-[#c9ff4b]/[0.08] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.17em] text-[#dfff86]">
              <span className="h-2 w-2 rounded-full bg-[#c9ff4b] shadow-[0_0_18px_rgba(201,255,75,.75)]" /> {profile.availability}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">{profile.location}</span>
          </motion.div>

          <motion.p variants={reveal} className="mb-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#7890ff]">
            <Sparkles size={13} /> {hero.eyebrow}
          </motion.p>

          <motion.h1 variants={reveal} className="text-balance max-w-[1020px] text-[clamp(3.25rem,7.2vw,7.9rem)] font-black leading-[0.88] tracking-[-0.075em] text-white">
            Products that look sharp <span className="bg-gradient-to-r from-[#7890ff] via-[#a78cff] to-[#c9ff4b] bg-clip-text text-transparent">and hold up underneath.</span>
          </motion.h1>

          <motion.p variants={reveal} className="mt-7 max-w-[690px] text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
            {hero.description}
          </motion.p>

          <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
            <a href={hero.primaryLink} className="inline-flex items-center gap-3 rounded-full bg-[#c9ff4b] px-6 py-3.5 text-sm font-black text-[#0a0c10] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(201,255,75,.2)]">
              {hero.primaryButton} <ArrowDownRight size={17} />
            </a>
            <a href={profile.cv} download={profile.cvFileName} className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-6 py-3.5 text-sm font-bold text-white/75 transition hover:border-white/22 hover:bg-white/[0.09] hover:text-white">
              {hero.secondaryButton} <Download size={16} />
            </a>
          </motion.div>

          <motion.div variants={reveal} className="mt-10 flex flex-wrap gap-2">
            {(hero.signals || hero.stack).map((item, index) => (
              <span key={item} className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${index === 0 ? "border-[#7890ff]/35 bg-[#7890ff]/10 text-[#aebcff]" : "border-white/10 text-white/42"}`}>
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24, rotate: 1.5 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.82, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          <div className="absolute -inset-10 rounded-[55px] bg-gradient-to-br from-[#5b6cff]/20 via-transparent to-[#c9ff4b]/10 blur-3xl" />
          <div className="relative rounded-[30px] border border-white/[0.10] bg-white/[0.055] p-3 shadow-[0_45px_100px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-4">
            <div className="mb-3 flex items-center justify-between px-2 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#c9ff4b]" /> Product mode</span>
              <span>KP / 2026</span>
            </div>

            <div className="overflow-hidden rounded-[23px] border border-white/[0.08] bg-[#10131a]">
              <div className="border-b border-white/[0.08] bg-[#141823] p-5 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7890ff]">How I build</p>
                    <h2 className="mt-3 max-w-sm text-2xl font-black leading-[.95] tracking-[-0.045em] sm:text-3xl">I don’t stop at the pretty layer.</h2>
                  </div>
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#c9ff4b] text-[#0a0c10] shadow-[0_12px_30px_rgba(201,255,75,.16)]">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="space-y-2.5">
                  {["Model the workflow", "Lock down the rules", "Build the interface", "Ship + debug the edge cases"].map((item, index) => (
                    <div key={item} className="grid grid-cols-[38px_1fr_auto] items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3.5 transition hover:border-[#7890ff]/30 hover:bg-[#7890ff]/[0.06]">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/[0.05] text-[9px] font-black text-white/35">0{index + 1}</span>
                      <span className="text-sm font-bold text-white/78">{item}</span>
                      <Check size={15} className="text-[#c9ff4b]" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  <div className="rounded-2xl bg-[#5b6cff] p-4 text-white">
                    <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/55">Backend</p>
                    <p className="mt-2 text-sm font-black">Laravel / Java</p>
                  </div>
                  <div className="rounded-2xl bg-[#c9ff4b] p-4 text-[#0a0c10]">
                    <p className="text-[8px] font-black uppercase tracking-[0.16em] text-black/45">Frontend</p>
                    <p className="mt-2 text-sm font-black">React / UI</p>
                  </div>
                  <div className="rounded-2xl bg-[#9b82ff] p-4 text-white">
                    <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/55">Systems</p>
                    <p className="mt-2 text-sm font-black">SQL / State</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-4 hidden w-[210px] rounded-2xl border border-white/10 bg-[#12151c]/95 p-3.5 shadow-2xl backdrop-blur-xl sm:block">
            <div className="flex items-center gap-3">
              <img src={profile.image} alt={profile.name} className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <p className="text-xs font-black text-white">{profile.name}</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[.11em] text-white/35">Backend-led · product-minded</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
