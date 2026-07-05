import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, Phone } from "lucide-react";
import Button from "../common/Button";
import Container from "../common/Container";
import SocialButton from "../common/SocialButton";
import { GitHubIcon, LinkedInIcon } from "../../lib/icons";
import { fadeUp, stagger } from "../../lib/animations";

function AnimatedBackground({ reducedMotion }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        animate={reducedMotion ? undefined : { x: [0, 60, -20, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-[#d6bd93]/30 blur-3xl"
      />
      <motion.div
        animate={reducedMotion ? undefined : { x: [0, -80, 30, 0], y: [0, 45, -35, 0], scale: [1, 0.9, 1.18, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-28 top-40 h-80 w-80 rounded-full bg-[#a78d67]/20 blur-3xl"
      />
      <motion.div
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="absolute left-[48%] top-12 h-44 w-44 rounded-full border border-[#cab99e]/40"
      />
      <motion.div
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-[18%] h-28 w-28 rounded-full border border-dashed border-[#b9a17a]/50"
      />
    </div>
  );
}

function FloatingChip({ children, className = "", delay = 0, reducedMotion }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.9 }}
      animate={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, y: [0, -12, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 3.4, delay, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" },
      }}
      className={`absolute rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2a2824] shadow-xl shadow-black/10 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Typewriter effect — reveals text character by character with a blinking cursor. */
function Typewriter({ text, className = "", reducedMotion }) {
  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const chars = text.split("");
  const charDuration = 0.035;
  const totalDuration = chars.length * charDuration;

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * charDuration, duration: 0.02 }}
          aria-hidden="true"
        >
          {char}
        </motion.span>
      ))}
      {/* Blinking cursor */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          delay: 0.5 + totalDuration,
          duration: 0.9,
          repeat: Infinity,
          ease: "linear",
        }}
        className="ml-px inline-block font-light text-[#b69a70]"
        aria-hidden="true"
      >
        |
      </motion.span>
    </span>
  );
}

function AnimatedTitle({ children, className = "", reducedMotion }) {
  const words = children.split(" ");

  return (
    <motion.h1 variants={stagger} initial={reducedMotion ? false : "hidden"} animate="show" className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 48, rotateX: -80, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="mr-[0.22em] inline-block origin-bottom"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero({ profile, hero, reducedMotion }) {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, reducedMotion ? 0 : -90]);
  const imageY = useTransform(scrollYProgress, [0, 0.35], [0, reducedMotion ? 0 : 70]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.35], [0, reducedMotion ? 0 : -4]);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="home" className="relative overflow-hidden bg-[#f8f3eb]">
      <AnimatedBackground reducedMotion={reducedMotion} />
      <div className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(#d2c4ae_1px,transparent_1px)] [background-size:28px_28px]" aria-hidden="true" />

      <Container className="relative grid items-center gap-7 pb-10 pt-7 lg:grid-cols-[0.86fr_1.14fr] lg:pb-14 lg:pt-12">
        <motion.div style={{ y: heroY }} variants={stagger} initial={reducedMotion ? false : "hidden"} animate="show">
          <motion.p variants={fadeUp} className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#a78d67] sm:text-[11px] sm:tracking-[0.35em]">
            <motion.span
              animate={reducedMotion ? undefined : { scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-[#b69a70]"
              aria-hidden="true"
            />
            <Typewriter text={profile.role} reducedMotion={reducedMotion} />
          </motion.p>

          <AnimatedTitle reducedMotion={reducedMotion} className="max-w-[720px] font-serif text-[34px] leading-[1.08] tracking-tight text-[#1f1c18] sm:text-5xl lg:text-[70px]">
            {hero.title}
          </AnimatedTitle>

          <motion.p variants={fadeUp} className="mt-4 max-w-[620px] text-[14px] leading-7 text-[#5f574d] sm:text-[15px] sm:leading-8">
            {hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={profile.cv} download={profile.cvFileName}>
              {hero.primaryButton} <Download size={16} aria-hidden="true" />
            </Button>

            <Button href={hero.secondaryLink} variant="secondary">
              {hero.secondaryButton} <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8c806f] sm:text-[11px]">Follow me on</span>
            <SocialButton href={profile.github} label="Open Kushal Poudel GitHub profile">
              <GitHubIcon size={17} />
            </SocialButton>
            <SocialButton href={profile.linkedin} label="Open Kushal Poudel LinkedIn profile">
              <LinkedInIcon size={17} />
            </SocialButton>
            <SocialButton href={`mailto:${profile.email}`} label="Email Kushal Poudel">
              <Mail size={17} aria-hidden="true" />
            </SocialButton>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageY, rotate: imageRotate }}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.88, rotate: 4, filter: "blur(12px)" }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto min-h-[370px] w-full max-w-[650px] lg:mx-0 lg:min-h-[455px]"
        >
          {hero.chips.map((chip) => (
            <FloatingChip key={chip.id} delay={chip.delay} className={chip.className} reducedMotion={reducedMotion}>
              {chip.label}
            </FloatingChip>
          ))}

          <motion.div
            whileHover={reducedMotion ? undefined : { scale: 1.035, rotate: -1.5 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className={`absolute right-0 top-0 h-[330px] w-[88%] overflow-hidden rounded-[18px] shadow-2xl shadow-black/15 sm:h-[410px] ${!imageLoaded ? "animate-pulse bg-[#c8b9a6]" : "bg-[#d8cbb8]"}`}
          >
            <motion.img
              src={profile.image}
              alt={`${profile.name}, backend Java and Laravel developer`}
              width="1086"
              height="1448"
              loading="eager"
              fetchPriority="high"
              onLoad={() => setImageLoaded(true)}
              onError={(event) => {
                event.currentTarget.src = profile.imageFallback;
              }}
              whileHover={reducedMotion ? undefined : { scale: 1.08 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full w-full object-cover object-center transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </motion.div>



          <motion.div
            animate={reducedMotion ? undefined : { y: [0, 18, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-54px] top-56 hidden items-center gap-8 xl:flex"
            aria-hidden="true"
          >
            <span className="h-px w-20 bg-[#d8ccba]" />
            <span className="rotate-90 text-[10px] font-black uppercase tracking-[0.45em] text-[#8f816d]">Scroll Down</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
