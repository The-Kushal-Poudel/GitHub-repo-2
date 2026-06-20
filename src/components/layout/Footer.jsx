import { motion } from "framer-motion";
import Container from "../common/Container";

export default function Footer({ site, reducedMotion }) {
  return (
    <footer className="bg-[#151513] text-white">
      <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 md:flex-row">
        <motion.p
          animate={reducedMotion ? undefined : { rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="font-serif text-xl text-white"
          aria-hidden="true"
        >
          {site.logoInitial}
        </motion.p>
        <p>{site.footerCopyright}</p>
        <p>{site.footerCredit}</p>
      </Container>
    </footer>
  );
}
