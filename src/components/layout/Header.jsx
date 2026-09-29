import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, Home, Mail, NotebookPen, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navIconMap = {
  work: BriefcaseBusiness,
  about: UserRound,
  experience: Home,
  writing: NotebookPen,
  contact: Mail,
};

export function ScrollProgress({ reducedMotion }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: reducedMotion ? 0 : scaleX }}
      className="cinematic-scroll-progress"
      aria-hidden="true"
    />
  );
}

export default function Header({ site, navItems }) {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  const sectionIds = useMemo(
    () => navItems.map((item) => item.href?.replace(/^#/, "")).filter(Boolean),
    [navItems],
  );

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return undefined;
    }

    const sections = ["home", ...sectionIds]
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
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.01, 0.14, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname, sectionIds]);

  const allNav = [{ id: "home", label: "Home", href: "#home" }, ...navItems];

  return (
    <>
      <header className="cinematic-header">
        <div className="cinematic-header-inner">
          <Link to="/#home" className="cinematic-brand" aria-label="Go to home">
            <img src="/images/kp-crystal.webp" alt="" aria-hidden="true" />
            <span>{site.logoName} {site.logoHighlight}</span>
          </Link>

          <nav className="cinematic-nav" aria-label="Primary navigation">
            {allNav.map((item) => {
              const sectionId = item.href.replace(/^#/, "");
              const active = location.pathname === "/" && activeSection === sectionId;
              return (
                <Link
                  key={item.id}
                  to={`/${item.href}`}
                  aria-current={active ? "location" : undefined}
                  className={active ? "is-active" : ""}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link to="/#contact" className="cinematic-header-cta">
            Let&apos;s talk <ArrowUpRight size={13} />
          </Link>
        </div>
      </header>

      <nav className="cinematic-mobile-dock" aria-label="Mobile navigation">
        {allNav.slice(0, 5).map((item) => {
          const sectionId = item.href.replace(/^#/, "");
          const active = location.pathname === "/" && activeSection === sectionId;
          const Icon = navIconMap[item.id] || Home;
          return (
            <Link
              key={item.id}
              to={`/${item.href}`}
              className={active ? "is-active" : ""}
              aria-label={item.label}
              aria-current={active ? "location" : undefined}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
