import { motion } from "framer-motion";
import Container from "../common/Container";

export default function Footer({ site, profile, reducedMotion }) {
  const name = profile?.name ? profile.name.replace(/\s+/g, '-').toUpperCase() : "PORTFOLIO";

  return (
    <footer className="relative bg-[#151513] text-white pt-16 overflow-hidden">
      <Container className="relative z-10 flex flex-col items-center justify-between gap-3 text-xs text-white/60 md:flex-row pb-12">
        <motion.p
          animate={reducedMotion ? undefined : { rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="font-serif text-xl text-white"
          aria-hidden="true"
        >
          {site?.logoInitial}
        </motion.p>
        <p>{site?.footerCopyright}</p>
        <p>{site?.footerCredit}</p>
      </Container>

      <div className="w-full flex justify-center pointer-events-none select-none overflow-hidden mt-8 px-4">
        <h1 
          className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5vw] leading-[0.7] font-black tracking-tighter text-[#4a4a4a] whitespace-nowrap"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 95%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 95%)"
          }}
        >
          {name}
        </h1>
      </div>
    </footer>
  );
}
