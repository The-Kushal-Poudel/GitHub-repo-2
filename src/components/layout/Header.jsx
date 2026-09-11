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
      className="fixed left-0 top-0 z-[10000] h-[2px] w-full origin-left bg-[#3557c8]"
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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return undefined;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

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

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[9999] border-b text-[#171817] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-black/[0.08] bg-[#f5f3ee]/96 shadow-[0_8px_30px_rgba(23,24,23,.045)]"
          : "border-black/[0.06] bg-[#f5f3ee]/90"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-[18px] sm:h-[72px] sm:px-6 lg:px-12">
        <Link to="/#home" className="group flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#171817] text-[10px] font-black tracking-tight text-white transition duration-300 group-hover:bg-[#3557c8]">
            {site.logoInitial}
          </span>
          <span className="truncate text-[13px] font-bold tracking-[-0.02em] sm:text-base">
            {site.logoName} <span className="font-medium text-black/35">{site.logoHighlight}</span>
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
                  isActive ? "text-[#171817]" : "text-black/45 hover:text-black"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-[#3557c8] transition duration-300 ${
                    isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link to="/#contact" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#171817] px-5 text-xs font-bold text-white transition duration-300 hover:bg-[#3557c8] sm:inline-flex">
            Let’s talk <ArrowUpRight size={14} />
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/55 transition hover:bg-white active:scale-[0.98] lg:hidden"
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
          className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-black/10 backdrop-blur-[2px] sm:top-[72px] sm:h-[calc(100dvh-72px)] lg:hidden"
          onClick={() => setOpen(false)}
        >
          <motion.nav
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-full overflow-y-auto border-b border-black/[0.07] bg-[#f5f3ee] px-[18px] pb-6 pt-3 shadow-[0_18px_45px_rgba(23,24,23,.08)] sm:px-6"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto grid max-w-[1440px] gap-1">
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
                      isActive ? "bg-black/[0.045] text-black" : "text-black/65 hover:bg-black/[0.04] hover:text-black"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[9px] font-black tabular-nums ${isActive ? "text-[#3557c8]" : "text-black/20"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                );
              })}

              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#171817] px-5 text-sm font-bold text-white"
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
