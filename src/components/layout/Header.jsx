import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function ScrollProgress({ reducedMotion }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: reducedMotion ? 0 : scaleX }}
      className="fixed left-0 top-0 z-[10000] h-[3px] w-full origin-left bg-[#d8ff57]"
      aria-hidden="true"
    />
  );
}

export default function Header({ site, navItems, reducedMotion }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[9999] border-b border-black/10 bg-[#f4f0e8]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#171712] text-[11px] font-black tracking-tight text-white">
            {site.logoInitial}
          </span>
          <span className="text-sm font-bold tracking-[-0.02em] sm:text-base">
            {site.logoName} <span className="text-black/45">{site.logoHighlight}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`/${item.href}`} className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55 transition hover:text-black">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="hidden items-center gap-2 rounded-full bg-[#171712] px-5 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-black sm:inline-flex"
          >
            Let’s talk <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/15 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          className="border-t border-black/10 bg-[#f4f0e8] px-5 py-5 lg:hidden"
        >
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/${item.href}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold hover:bg-black/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
}
