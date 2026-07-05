import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, X, User } from "lucide-react";

export function ScrollProgress({ reducedMotion }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      initial={false}
      style={{ scaleX: reducedMotion ? 0 : scaleX }}
      className="fixed left-0 top-0 z-[99999] h-1 w-full origin-left bg-[#a78d67]"
      aria-hidden="true"
    />
  );
}

export default function Header({ site, navItems, reducedMotion }) {
  const [open, setOpen] = useState(false);
  const menuId = "mobile-navigation";

  return (
    <div className="sticky top-4 z-[9999] px-4 sm:px-6 md:px-8 mb-4">
      <motion.header
        initial={reducedMotion ? false : { y: -80, opacity: 0 }}
        animate={reducedMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex max-w-screen-2xl items-center justify-between rounded-full border border-[#e6ded0]/80 bg-white/95 py-2 pl-6 pr-2 shadow-lg shadow-[#151412]/5 backdrop-blur-xl"
      >
        {/* Left: Logo */}
        <motion.a
          href="#home"
          whileHover={reducedMotion ? undefined : { scale: 1.02 }}
          className="flex min-w-0 shrink-0 items-center gap-3"
          aria-label="Go to home section"
          onClick={() => setOpen(false)}
        >
          <motion.span
            animate={reducedMotion ? undefined : { rotate: [0, 4, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="font-serif text-2xl font-black leading-none tracking-tight text-[#151412] sm:text-3xl"
          >
            {site.logoInitial}
          </motion.span>
          <span className="block truncate font-serif text-[15px] font-bold tracking-wide text-[#29251f] sm:text-[17px]">
            {site.logoName} <span className="text-[#a78d67]">{site.logoHighlight}</span>
          </span>
        </motion.a>

        {/* Center: Pill Navigation */}
        <nav className="hidden items-center rounded-full bg-[#f8f3eb] px-2 py-1.5 border border-[#e6ded0]/60 lg:flex" aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              initial={reducedMotion ? false : { opacity: 0, y: -10 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              href={item.href}
              className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#332f29] transition hover:bg-white hover:text-[#a78d67] hover:shadow-sm"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Right: Contact/Account Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <motion.a
            href="#contact"
            whileHover={reducedMotion ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="hidden items-center gap-2.5 rounded-full border border-[#e6ded0] bg-white pl-2 pr-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#151412] shadow-sm transition hover:bg-[#f8f3eb] lg:flex"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f8f3eb] text-[#332f29]">
              <User size={13} strokeWidth={2.5} />
            </div>
            Contact Me
            <ArrowRight size={13} className="ml-0.5 text-[#8c806f]" />
          </motion.a>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setOpen((currentOpen) => !currentOpen)}
            aria-label={open ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={open}
            aria-controls={menuId}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e6ded0] bg-[#f8f3eb] text-[#151412] shadow-sm lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {open && (
          <motion.nav
            id={menuId}
            initial={reducedMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            className="absolute left-0 right-0 top-full mt-3 rounded-2xl border border-[#e6ded0] bg-white p-4 shadow-2xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-[#332f29] transition hover:bg-[#f8f3eb] hover:text-[#a78d67]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#151412] px-4 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#2a2824]"
              >
                Contact Me <ArrowRight size={14} />
              </a>
            </div>
          </motion.nav>
        )}
      </motion.header>
    </div>
  );
}
