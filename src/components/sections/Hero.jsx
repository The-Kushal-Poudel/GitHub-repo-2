import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import Container from "../common/Container";

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ profile, hero, reducedMotion }) {
  const stack = (hero.stack || []).slice(0, 5);
  const headline = hero.title || "I build products that hold up when the easy part ends.";
  const [beforeHoldUp, afterHoldUp] = headline.includes(" hold up")
    ? headline.split(" hold up")
    : [headline, ""];

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-black/[0.07] bg-[#f5f3ee] text-[#171817]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 76% 22%, rgba(53,87,200,.07), transparent 30%), radial-gradient(circle at 8% 92%, rgba(23,24,23,.035), transparent 28%)",
        }}
      />

      <Container className="relative grid items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1.12fr_.88fr] lg:gap-16 lg:py-16 xl:gap-24">
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion ? undefined : "show"}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-[860px]"
        >
          <motion.div
            variants={reveal}
            className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-bold uppercase tracking-[0.15em] text-black/42 sm:mb-10 sm:gap-x-5 sm:gap-y-3 sm:text-[10px] sm:tracking-[0.17em]"
          >
            <span className="text-[#3557c8]">{profile.role}</span>
            <span className="hidden h-px w-8 bg-black/15 sm:block" aria-hidden="true" />
            <span>{profile.location}</span>
            <span className="inline-flex basis-full items-center gap-2 normal-case tracking-normal text-black/48 min-[430px]:basis-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3557c8]" />
              {profile.availability}
            </span>
          </motion.div>

          <motion.p
            variants={reveal}
            className="mb-4 text-[9px] font-black uppercase tracking-[0.2em] text-black/35 sm:mb-5 sm:text-[10px] sm:tracking-[0.22em]"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={reveal}
            className="max-w-[900px] text-balance text-[clamp(2.85rem,14vw,4.35rem)] font-black leading-[0.91] tracking-[-0.062em] text-[#171817] sm:text-[clamp(4rem,9vw,6rem)] sm:leading-[0.9] lg:text-[clamp(4.5rem,6.9vw,7rem)] lg:tracking-[-0.068em]"
          >
            {beforeHoldUp}
            {headline.includes(" hold up") ? (
              <>
                {" "}
                <span className="text-[#3557c8]">hold up</span>
                {afterHoldUp}
              </>
            ) : null}
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-6 max-w-[650px] text-[15px] leading-7 text-black/55 sm:mt-7 sm:text-[17px] sm:leading-8"
          >
            {hero.description}
          </motion.p>

          <motion.div variants={reveal} className="mt-7 grid gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <a
              href={hero.primaryLink}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#171817] px-6 text-sm font-bold text-white transition duration-300 hover:bg-[#3557c8]"
            >
              {hero.primaryButton}
              <ArrowDownRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={profile.cv}
              download={profile.cvFileName}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-black/10 bg-white/35 px-6 text-sm font-semibold text-black/60 transition duration-300 hover:border-black/15 hover:bg-white/75 hover:text-black"
            >
              {hero.secondaryButton}
              <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            className="mt-8 border-t border-black/[0.07] pt-5 sm:mt-11"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-black/26">Working with</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2.5 sm:gap-x-5">
              {stack.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-4 text-[11px] font-semibold text-black/43 sm:gap-5">
                  {item}
                  {index < stack.length - 1 ? <span className="h-1 w-1 rounded-full bg-black/13" aria-hidden="true" /> : null}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.78, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[430px] sm:max-w-[500px] lg:justify-self-end"
        >
          <div className="relative">
            <div className="absolute -left-5 top-8 hidden -translate-x-full flex-col items-end gap-2 xl:flex" aria-hidden="true">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/25">Profile</span>
              <span className="h-16 w-px bg-black/10" />
              <span className="text-[9px] font-bold text-black/25">01</span>
            </div>

            <div className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-[#e8e5de] shadow-[0_22px_58px_rgba(23,24,23,.09)] sm:rounded-[26px] sm:shadow-[0_30px_80px_rgba(23,24,23,.11)]">
              <div className="relative aspect-[4/4.65] overflow-hidden bg-[#e5e1d9] sm:aspect-[4/4.75]">
                <img
                  src={profile.image}
                  alt={profile.name}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover object-center grayscale-[12%] contrast-[1.02] saturate-[.9] transition duration-700 sm:hover:scale-[1.012] sm:hover:grayscale-0 sm:hover:saturate-100"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/42 via-black/9 to-transparent sm:h-36" aria-hidden="true" />

                <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/20 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:text-[9px] sm:tracking-[0.16em]">
                  {profile.role}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white sm:bottom-5 sm:left-5 sm:right-5 sm:gap-5">
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/65 sm:text-[10px] sm:tracking-[0.18em]">Kushal Poudel</p>
                    <p className="mt-1 max-w-[290px] text-[22px] font-black leading-[1] tracking-[-0.045em] sm:text-[30px]">
                      Backend depth.<br />Product sense.
                    </p>
                  </div>
                  <a
                    href="#projects"
                    aria-label="View selected projects"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#171817] transition duration-300 hover:bg-[#3557c8] hover:text-white"
                  >
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-black/[0.07] border-t border-black/[0.07] bg-[#fbfaf7]">
                <div className="px-4 py-4 sm:px-6">
                  <p className="text-[8px] font-black uppercase tracking-[0.15em] text-black/28 sm:text-[9px] sm:tracking-[0.16em]">Focus</p>
                  <p className="mt-1.5 text-[11px] font-semibold leading-5 text-black/68 sm:text-xs">Systems + product UI</p>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <p className="text-[8px] font-black uppercase tracking-[0.15em] text-black/28 sm:text-[9px] sm:tracking-[0.16em]">Approach</p>
                  <p className="mt-1.5 text-[11px] font-semibold leading-5 text-black/68 sm:text-xs">Own the whole flow</p>
                </div>
              </div>
            </div>

            <div className="mx-4 flex items-center justify-between border-x border-b border-black/[0.07] bg-[#efede7] px-4 py-3 text-[8px] font-bold uppercase tracking-[0.13em] text-black/32 sm:mx-7 sm:px-5 sm:text-[9px] sm:tracking-[0.15em]">
              <span>Design the logic</span>
              <span className="h-1 w-1 rounded-full bg-[#3557c8]" aria-hidden="true" />
              <span>Ship the product</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
