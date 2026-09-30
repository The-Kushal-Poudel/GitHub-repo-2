import { useEffect } from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Blogs from "../components/sections/Blogs";
import Contact from "../components/sections/Contact";
import SEO from "../components/common/SEO";

export default function Home({ data, reducedMotion }) {
  const { profile, hero, about, techStack, projectsSection, blogsSection, journeySection, contact } = data;

  useEffect(() => {
    const revealGroups = [
      {
        selector: [
          ".about-copy-panel",
          ".about-copy-panel p",
          ".about-button",
          ".about-portrait-panel",
          ".about-principles-strip > div",
        ].join(","),
        type: "text",
      },
      {
        selector: [
          ".stack-reference-header",
          ".stack-reference-header h2",
          ".stack-reference-header p",
          ".stack-gallery-card",
          ".stack-reference-footer",
        ].join(","),
        type: "card",
      },
      {
        selector: [
          ".projects-reference-head",
          ".projects-reference-head h2",
          ".projects-head-copy",
          ".project-poster-card",
          ".projects-reference-bottom",
        ].join(","),
        type: "card",
      },
      {
        selector: [
          ".career-editorial-head",
          ".career-editorial-heading h2",
          ".career-editorial-intro",
          ".career-editorial-item",
          ".career-editorial-ghost",
        ].join(","),
        type: "row",
      },
      {
        selector: [
          ".blogs-reference-head",
          ".blogs-reference-head h2",
          ".blogs-reference-head p",
          ".blog-featured-card",
          ".blog-small-card",
        ].join(","),
        type: "card",
      },
      {
        selector: [
          ".contact-reference-head",
          ".contact-reference-head h2",
          ".contact-reference-head p",
          ".contact-editorial-row > *",
          ".contact-message-field",
          ".contact-elsewhere",
          ".contact-submit-button",
        ].join(","),
        type: "text",
      },
    ];

    const seen = new Set();
    const nodes = [];

    revealGroups.forEach((group) => {
      document.querySelectorAll(group.selector).forEach((node) => {
        if (seen.has(node)) return;
        seen.add(node);

        const index = nodes.length;
        node.classList.add("motion-reveal", `motion-${group.type}`);
        node.style.setProperty("--motion-order", String(index % 6));
        nodes.push(node);
      });
    });

    const parallaxNodes = [
      ...document.querySelectorAll(
        [
          ".section-script-title",
          ".projects-title-ghost",
          ".career-editorial-ghost",
          ".contact-reference-watermark",
          ".projects-stage-orbit",
        ].join(","),
      ),
    ];

    parallaxNodes.forEach((node, index) => {
      node.classList.add("motion-parallax");
      node.style.setProperty("--parallax-factor", String((index % 3) + 1));
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-motion-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-motion-visible");
          } else {
            entry.target.classList.remove("is-motion-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "-6% 0px -10% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));

    let raf = 0;
    const updateParallax = () => {
      raf = 0;
      const viewportHeight = window.innerHeight || 1;

      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;

        const center = rect.top + rect.height / 2;
        const normalized = (center - viewportHeight / 2) / viewportHeight;
        const factor = Number(node.style.getPropertyValue("--parallax-factor")) || 1;
        node.style.setProperty("--parallax-y", `${normalized * -18 * factor}px`);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://kushalpoudel2060.com.np/",
    jobTitle: "Full-Stack Developer",
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["Laravel", "Spring Boot", "React", "PostgreSQL", "MySQL"],
  };

  return (
    <>
      <SEO schema={schema} />
      <Hero profile={profile} hero={hero} reducedMotion={reducedMotion} />
      <About about={about} profile={profile} reducedMotion={reducedMotion} />
      <TechStack techStack={techStack} reducedMotion={reducedMotion} />
      <Projects projectsSection={projectsSection} reducedMotion={reducedMotion} />
      <Experience journeySection={journeySection} reducedMotion={reducedMotion} />
      <Blogs blogsSection={blogsSection} reducedMotion={reducedMotion} />
      <Contact contactData={contact} profile={profile} reducedMotion={reducedMotion} />
    </>
  );
}
