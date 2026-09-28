import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import Container from "../common/Container";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile, hero, reducedMotion }) {
  const stack = (hero.stack || []).slice(0, 5);

  return (
    <section id="home" className="relative overflow-hidden bg-[#0d1830] text-white">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-80" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 top-[12%] h-[340px] w-[340px] rounded-full bg-[#4f73ff] opacity-90 blur-[1px] sm:right-[5%] lg:h-[410px] lg:w-[410px]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[27%] top-[57%] h-20 w-20 rounded-full bg-[#caff4f] sm:h-24 sm:w-24" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-16 bottom-[8%] h-44 w-44 rounded-full border-2 border-[#ff7858]/70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(79,115,255,.34),transparent_28%),radial-gradient(circle_at_12%_78%,rgba(255,120,88,.14),transparent_27%)]" aria-hidden="true" />

      <Container className="relative grid min-h-[calc(100svh-64px)] grid-rows-[auto_1fr_auto] py-10 sm:min-h-[calc(100svh-76px)] sm:py-12 lg:py-14">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "show"}
          variants={reveal}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-black uppercase tracking-[0.17em] text-white/58 sm:text-[10px]"
        >
          <span className="inline-flex items-center gap-2 text-[#caff4f]"><span className="h-1.5 w-1.5 rounded-full bg-[#caff4f] shadow-[0_0_0_5px_rgba(202,255,79,.09)]" />{profile.role}</span>
          <span className="hidden h-px w-8 bg-white/16 sm:block" />
          <span>{profile.location}</span>
          <span className="basis-full normal-case tracking-normal text-white/42 min-[480px]:basis-auto">{profile.availability}</span>
        </motion.div>

        <div className="grid items-center py-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.55fr)] lg:gap-14 lg:py-20 xl:gap-20">
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? undefined : "show"}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="relative z-10"
          >
            <motion.p variants={reveal} className="mb-5 text-[9px] font-black uppercase tracking-[0.22em] text-white/38 sm:text-[10px]">
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={reveal}
              className="max-w-[1050px] text-balance text-[clamp(3.2rem,14vw,5.4rem)] font-black leading-[0.88] tracking-[-0.07em] sm:text-[clamp(4.6rem,10vw,7.5rem)] lg:text-[clamp(5.3rem,7.6vw,8rem)]"
            >
              {hero.title}
            </motion.h1>
            <motion.p variants={reveal} className="mt-7 max-w-[720px] text-[15px] leading-7 text-white/62 sm:text-[17px] sm:leading-8">
              {hero.description}
            </motion.p>
            <motion.div variants={reveal} className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
              <a href={hero.primaryLink} className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#caff4f] px-6 text-sm font-black text-[#0d1830] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(202,255,79,.18)]">
                {hero.primaryButton}<ArrowDownRight size={16} className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a href={profile.cv} download={profile.cvFileName} className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.06] px-6 text-sm font-bold text-white/76 backdrop-blur-sm transition duration-300 hover:border-white/28 hover:bg-white/10 hover:text-white">
                {hero.secondaryButton}<Download size={15} className="transition group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 26, rotate: 1.5 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-12 w-full max-w-[420px] lg:mt-0 lg:justify-self-end"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-[#f6f0e7] p-2 shadow-[0_35px_90px_rgba(2,7,18,.34)]">
              <div className="relative aspect-[4/4.8] overflow-hidden rounded-[24px] bg-[#d8dbe2]">
                <img src={profile.image} alt={profile.name} fetchPriority="high" decoding="async" className="h-full w-full object-cover object-center saturate-[.92] transition duration-700 hover:scale-[1.02] hover:saturate-100" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d1830]/85 via-[#0d1830]/18 to-transparent" aria-hidden="true" />
                <div className="absolute left-4 top-4 rounded-full bg-[#ff7858] px-3 py-2 text-[8px] font-black uppercase tracking-[0.14em] text-white sm:left-5 sm:top-5">{profile.role}</div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/58">{profile.name}</p>
                    <p className="mt-1 text-[25px] font-black leading-[.98] tracking-[-0.045em] sm:text-[30px]">Backend depth.<br />Product sense.</p>
                  </div>
                  <a href="#projects" aria-label="View selected projects" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#caff4f] text-[#0d1830] transition hover:rotate-6 hover:scale-105"><ArrowUpRight size={17} /></a>
                </div>
              </div>
            </div>
            <div className="absolute -left-8 -top-8 hidden rounded-2xl bg-[#ff7858] px-4 py-3 text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-xl sm:block">Build → test → ship</div>
          </motion.div>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col gap-4 border-t border-white/12 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">Working with</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((item, index) => (
              <span key={item} className={`rounded-full border px-3 py-2 text-[10px] font-bold ${index % 3 === 0 ? "border-[#4f73ff] bg-[#4f73ff] text-white" : index % 3 === 1 ? "border-[#ff7858]/70 bg-[#ff7858]/10 text-[#ffb6a5]" : "border-white/12 bg-white/[0.04] text-white/54"}`}>{item}</span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
