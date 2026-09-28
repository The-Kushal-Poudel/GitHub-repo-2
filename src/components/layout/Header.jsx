import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function ScrollProgress({ reducedMotion }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: reducedMotion ? 0 : scaleX }}
      className="fixed left-0 top-0 z-[10000] h-[3px] w-full origin-left bg-[#caff4f]"
      aria-hidden="true"
    />
  );
}

export default function Header({ site, navItems, reducedMotion }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const sectionIds = useMemo(
    () => navItems.map((item) => item.href?.replace(/^#/, "")).filter(Boolean),
    [navItems],
  );

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return undefined;
    }

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.01, 0.15, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname, sectionIds]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[9999] border-b text-white backdrop-blur-xl transition duration-300 ${
        scrolled
          ? "border-white/10 bg-[#0d1830]/95 shadow-[0_18px_50px_rgba(4,10,24,.18)]"
          : "border-white/[0.08] bg-[#0d1830]/90"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between px-[18px] sm:h-[76px] sm:px-7 lg:px-12">
        <Link to="/#home" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#caff4f] text-[10px] font-black tracking-tight text-[#0d1830] shadow-[0_10px_28px_rgba(202,255,79,.14)] transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
            {site.logoInitial}
          </span>
          <span className="truncate text-[13px] font-bold tracking-[-0.02em] sm:text-[15px]">
            {site.logoName} <span className="font-medium text-white/42">{site.logoHighlight}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const sectionId = item.href?.replace(/^#/, "");
            const isActive = location.pathname === "/" && activeSection === sectionId;
            return (
              <Link
                key={item.id}
                to={`/${item.href}`}
                aria-current={isActive ? "location" : undefined}
                className={`relative py-2 text-[11px] font-bold transition ${
                  isActive ? "text-[#caff4f]" : "text-white/52 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-[#caff4f] transition ${
                    isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/#contact"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-[#f6f0e7] px-5 text-xs font-black text-[#0d1830] transition duration-300 hover:bg-[#caff4f] sm:inline-flex"
          >
            Let’s talk <ArrowUpRight size={14} />
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          id="mobile-navigation"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-[#08101f]/70 backdrop-blur-sm sm:top-[76px] sm:h-[calc(100dvh-76px)] lg:hidden"
          onClick={() => setOpen(false)}
        >
          <motion.nav
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-full overflow-y-auto border-b border-white/10 bg-[#0d1830] px-[18px] pb-6 pt-3 shadow-2xl sm:px-7"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto grid max-w-[1500px] gap-1">
              {navItems.map((item, index) => {
                const sectionId = item.href?.replace(/^#/, "");
                const isActive = location.pathname === "/" && activeSection === sectionId;
                return (
                  <Link
                    key={item.id}
                    to={`/${item.href}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex min-h-12 items-center justify-between rounded-xl px-3 text-[15px] font-semibold transition ${
                      isActive ? "bg-[#caff4f] text-[#0d1830]" : "text-white/68 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[9px] font-black tabular-nums ${isActive ? "text-[#0d1830]/60" : "text-white/24"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                );
              })}
              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f6f0e7] px-5 text-sm font-black text-[#0d1830]"
              >
                Let’s talk <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </header>
  );
}
