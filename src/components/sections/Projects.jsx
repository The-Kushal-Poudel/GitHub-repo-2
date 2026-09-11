import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Container from "../common/Container";

const tones = {
  ink: "bg-[#1d201f] text-white",
  forest: "bg-[#26332f] text-white",
  sand: "bg-[#d9c5ad] text-[#171817]",
  blue: "bg-[#3557c8] text-white",
  sunset: "bg-[#c9a995] text-[#171817]",
  plum: "bg-[#56546c] text-white",
};

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#ece9e2]">
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${tones[project.tone] || tones.ink}`}>
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-current/15" />
      <div className="absolute -right-2 -top-3 h-24 w-24 rounded-full border border-current/10" />
      <div className="relative flex h-full flex-col justify-between p-7 sm:p-8">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.16em] opacity-60">
          <span>{project.kicker}</span>
          <span>{project.status}</span>
        </div>
        <div>
          <p className="max-w-[90%] text-[2.4rem] font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl">
            {project.title}
          </p>
          <p className="mt-4 max-w-xs text-xs leading-5 opacity-60">{project.role}</p>
        </div>
      </div>
    </div>
  );
}

function formatIndex(value) {
  return String(value).padStart(2, "0");
}

export default function Projects({ projectsSection, reducedMotion }) {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = projectsSection.items;

  const scrollToProject = (index) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll("[data-project-card]"));
    const card = cards[index];
    if (!card) return;

    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(index);
  };

  const goPrev = () => scrollToProject(Math.max(0, activeIndex - 1));
  const goNext = () => scrollToProject(Math.min(projects.length - 1, activeIndex + 1));

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const handleScroll = () => {
      const cards = Array.from(scroller.querySelectorAll("[data-project-card]"));
      if (!cards.length) return;

      const scrollerLeft = scroller.getBoundingClientRect().left;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - scrollerLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  const progress = projects.length > 1 ? ((activeIndex + 1) / projects.length) * 100 : 100;

  return (
    <section id="projects" className="overflow-hidden border-b border-black/[0.07] bg-[#f6f5f2] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">{projectsSection.label}</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.055em] text-[#171817] sm:text-5xl lg:text-6xl">
              {projectsSection.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/52 sm:text-base lg:text-right">
            {projectsSection.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex min-w-0 items-center gap-3 text-[11px] font-semibold text-[#171817]">
            <span className="tabular-nums">{formatIndex(activeIndex + 1)}</span>
            <div className="relative h-px min-w-0 flex-1 bg-black/15">
              <div
                className="absolute inset-y-0 left-0 bg-[#3557c8] transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="tabular-nums text-black/45">{formatIndex(projects.length)}</span>
          </div>

          <div className="flex items-center justify-between gap-5 lg:justify-end">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="group inline-flex items-center gap-2 text-xs font-semibold text-[#171817] transition disabled:cursor-default disabled:opacity-30"
              aria-label="Previous project"
            >
              <ChevronLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
              Prev
            </button>
            <div className="h-px w-12 bg-[#3557c8]" />
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === projects.length - 1}
              className="group inline-flex items-center gap-2 text-xs font-semibold text-[#171817] transition disabled:cursor-default disabled:opacity-30"
              aria-label="Next project"
            >
              Next
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="project-rail -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:gap-5 lg:px-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              data-project-card
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: Math.min(index, 2) * 0.04 }}
              className="group min-w-[86%] snap-start overflow-hidden rounded-[18px] border border-black/[0.08] bg-white shadow-[0_10px_28px_rgba(20,20,20,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(20,20,20,0.08)] sm:min-w-[62%] lg:min-w-[38%] xl:min-w-[32%]"
            >
              <Link to={`/project/${project.slug}`} className="block aspect-[1.42/1] overflow-hidden">
                <ProjectVisual project={project} />
              </Link>

              <div className="p-6">
                <Link
                  to={`/project/${project.slug}`}
                  className="flex items-start justify-between gap-5 text-[#171817]"
                >
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[#3557c8]">{project.kicker}</p>
                    <h3 className="mt-2 text-xl font-black tracking-[-0.035em] sm:text-[1.35rem]">{project.title}</h3>
                  </div>
                  <ArrowUpRight size={17} className="mt-1 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/52">{project.description}</p>

                <div className="my-5 h-px bg-black/10" />

                <div className="flex items-center justify-between gap-4">
                  <Link
                    to={`/project/${project.slug}`}
                    className="inline-flex items-center rounded-full bg-[#171817] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#3557c8]"
                  >
                    View project
                  </Link>

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-black/45 transition hover:text-black"
                    >
                      Live site <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
