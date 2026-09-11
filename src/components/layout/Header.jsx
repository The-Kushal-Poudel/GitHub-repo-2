import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function ScrollProgress({ reducedMotion }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: reducedMotion ? 0 : scaleX }}
      className="fixed left-0 top-0 z-[10000] h-[3px] w-full origin-left bg-[#c9ff4b]"
      aria-hidden="true"
    />
  );
}

export default function Header({ site, navItems, reducedMotion }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[9999] border-b border-white/[0.08] bg-[#0a0c10]/88 text-white backdrop-blur-2xl">
      <div className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-[14px] border border-white/10 bg-white/[0.06] text-[11px] font-black tracking-tight text-white transition duration-300 group-hover:rotate-[-5deg] group-hover:border-[#c9ff4b]/60 group-hover:bg-[#c9ff4b] group-hover:text-[#0a0c10]">
            {site.logoInitial}
          </span>
          <span className="text-sm font-bold tracking-[-0.02em] sm:text-base">
            {site.logoName} <span className="text-white/40">{site.logoHighlight}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.035] p-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`/${item.href}`} className="rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/50 transition hover:bg-white/[0.07] hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#contact"
            className="hidden items-center gap-2 rounded-full bg-[#c9ff4b] px-5 py-2.5 text-xs font-black text-[#0a0c10] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(201,255,75,.22)] sm:inline-flex"
          >
            Let’s talk <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] lg:hidden"
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
          className="border-t border-white/[0.08] bg-[#0a0c10] px-5 py-5 lg:hidden"
        >
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/${item.href}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-white/70 hover:bg-white/[0.06] hover:text-white"
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
