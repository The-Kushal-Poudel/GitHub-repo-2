import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Container from "../common/Container";

export function ScrollProgress({ reducedMotion }) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      initial={false}
      style={{ scaleX: reducedMotion ? 0 : scrollYProgress }}
      className="fixed left-0 top-0 z-[999] h-1 w-full origin-left bg-[#a78d67]"
      aria-hidden="true"
    />
  );
}

export default function Header({ site, navItems, reducedMotion }) {
  const [open, setOpen] = useState(false);
  const menuId = "mobile-navigation";

  return (
    <motion.header
      initial={reducedMotion ? false : { y: -80, opacity: 0 }}
      animate={reducedMotion ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-[9999] border-b border-[#e6ded0]/80 bg-[#f8f3eb]/95 backdrop-blur-xl"
    >
      <Container className="flex items-center justify-between py-3">
        <motion.a
          href="#home"
          whileHover={reducedMotion ? undefined : { scale: 1.04 }}
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          aria-label="Go to home section"
          onClick={() => setOpen(false)}
        >
          <motion.span
            animate={reducedMotion ? undefined : { rotate: [0, 4, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="font-serif text-3xl font-black leading-none tracking-tight text-[#151412] sm:text-4xl"
          >
            {site.logoInitial}
          </motion.span>

          <span className="block max-w-[135px] truncate font-serif text-[15px] font-semibold tracking-wide text-[#29251f] sm:max-w-none sm:text-lg">
            {site.logoName} <span className="text-[#a78d67]">{site.logoHighlight}</span>
          </span>
        </motion.a>

        <nav className="hidden items-center gap-7 text-[13px] font-semibold text-[#332f29] md:flex" aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              initial={reducedMotion ? false : { opacity: 0, y: -14 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              href={item.href}
              className="relative transition hover:text-[#a78d67] after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-[#151412] after:transition-all hover:after:w-full"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="#contact"
          whileHover={reducedMotion ? undefined : { y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="hidden items-center gap-3 rounded-lg bg-[#151412] px-5 py-3 text-[13px] font-semibold text-white shadow-xl shadow-black/10 transition hover:bg-[#2a2824] lg:flex"
        >
          Contact Me <ArrowRight size={15} aria-hidden="true" />
        </motion.a>

        <button
          type="button"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          aria-label={open ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={open}
          aria-controls={menuId}
          className="relative z-[10000] flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#151412]/20 bg-[#151412] text-white shadow-md md:hidden"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </Container>

      {open && (
        <motion.nav
          id={menuId}
          initial={reducedMotion ? false : { opacity: 0, y: -12 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          className="absolute left-0 top-full z-[9998] w-full border-t border-[#e6ded0] bg-[#f8f3eb] px-4 py-3 shadow-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-screen-2xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#332f29] transition hover:text-[#a78d67]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
