import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile, hero, reducedMotion }) {
  return (
    <section id="home" className="hero-video-page">
      <video
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/video/hero-loop.webm" type="video/webm" />
        <source src="/video/hero-loop.mp4" type="video/mp4" />
      </video>

      <div className="hero-video-overlay" aria-hidden="true" />

      <motion.div
        initial={reducedMotion ? false : "hidden"}
        animate={reducedMotion ? undefined : "show"}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="hero-video-inner"
      >
        <motion.div variants={reveal} className="hero-video-copy">
          <span className="hero-video-script">Kushal</span>
          <p className="hero-video-role">{profile.role}</p>
          <h1>
            Kushal
            <span>Poudel</span>
          </h1>

          <a href={hero.primaryLink} className="hero-video-cta">
            View selected work <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <motion.div variants={reveal} className="hero-video-index">
          01 / PORTFOLIO
        </motion.div>
      </motion.div>
    </section>
  );
}
