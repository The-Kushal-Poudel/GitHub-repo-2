import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Container from "../common/Container";

const tones = {
  ink: {
    shell: "bg-[#1c1e1d] text-white",
    panel: "bg-white/[0.07] border-white/10",
    muted: "text-white/48",
  },
  forest: {
    shell: "bg-[#28312e] text-white",
    panel: "bg-white/[0.07] border-white/10",
    muted: "text-white/48",
  },
  sand: {
    shell: "bg-[#d8d0c4] text-[#171817]",
    panel: "bg-white/30 border-black/[0.08]",
    muted: "text-black/45",
  },
  blue: {
    shell: "bg-[#2e477e] text-white",
    panel: "bg-white/[0.08] border-white/10",
    muted: "text-white/50",
  },
  sunset: {
    shell: "bg-[#c9b7aa] text-[#171817]",
    panel: "bg-white/25 border-black/[0.08]",
    muted: "text-black/45",
  },
  plum: {
    shell: "bg-[#4a4752] text-white",
    panel: "bg-white/[0.07] border-white/10",
    muted: "text-white/48",
  },
};

function formatIndex(value) {
  return String(value).padStart(2, "0");
}

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#e7e4dc] p-3 sm:p-4">
        <div className="absolute left-4 top-4 z-20 rounded-full border border-black/[0.08] bg-[#fbfaf7]/90 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.15em] text-black/48 shadow-sm backdrop-blur-md sm:left-5 sm:top-5">
          {project.status}
        </div>

        <div className="relative h-full overflow-hidden rounded-[12px] border border-black/[0.09] bg-[#f8f7f3] shadow-[0_12px_28px_rgba(23,24,23,0.10)] sm:rounded-[14px]">
          <div className="flex h-7 items-center gap-1.5 border-b border-black/[0.07] bg-[#f8f7f3] px-3 sm:h-8">
            <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/[0.06]" />
            <div className="ml-2 h-3.5 w-24 rounded-full bg-black/[0.045] sm:w-32" />
          </div>
          <div className="relative h-[calc(100%-1.75rem)] overflow-hidden bg-[#dedbd3] sm:h-[calc(100%-2rem)]">
            <img
              src={project.image}
              alt={project.imageAlt || `${project.title} project preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(.2,.65,.3,1)] group-hover:scale-[1.012]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.07] via-transparent to-white/[0.02]" />
          </div>
        </div>
      </div>
    );
  }

  const tone = tones[project.tone] || tones.ink;
  const shortStack = Array.isArray(project.techStack) ? project.techStack.slice(0, 3) : [];

  return (
    <div className={`relative h-full w-full overflow-hidden ${tone.shell}`}>
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-current/[0.08]" />
      <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-current/[0.06]" />

      <div className="relative flex h-full flex-col p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 opacity-50" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-30" />
          </div>
          <p className={`text-[8px] font-bold uppercase tracking-[0.17em] ${tone.muted}`}>
            {project.status}
          </p>
        </div>

        <div className={`mt-4 flex flex-1 flex-col justify-between rounded-[14px] border p-4 sm:mt-5 sm:p-6 ${tone.panel}`}>
          <div>
            <p className={`text-[8px] font-black uppercase tracking-[0.18em] ${tone.muted}`}>
              {project.kicker}
            </p>
            <h3 className="mt-3 max-w-[94%] text-[1.8rem] font-black leading-[0.94] tracking-[-0.052em] sm:max-w-[90%] sm:text-[2.4rem] sm:leading-[0.92] sm:tracking-[-0.055em]">
              {project.title}
            </h3>
          </div>

          <div>
            <div className="mb-4 h-px bg-current opacity-10" />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {shortStack.map((item) => (
                <span key={item} className={`text-[9px] font-semibold ${tone.muted}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projectsSection, reducedMotion }) {
  const scrollerRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = projectsSection?.items || [];

  const scrollToProject = (index) => {
    const scroller = scrollerRef.current;
    if (!scroller || !projects.length) return;

    const safeIndex = Math.max(0, Math.min(index, projects.length - 1));
    const cards = Array.from(scroller.querySelectorAll("[data-project-card]"));
    const card = cards[safeIndex];
    if (!card) return;

    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(safeIndex);
  };

  const goPrev = () => scrollToProject(activeIndex - 1);
  const goNext = () => scrollToProject(activeIndex + 1);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const updateActiveCard = () => {
      scrollFrameRef.current = null;
      const cards = Array.from(scroller.querySelectorAll("[data-project-card]"));
      if (!cards.length) return;

      const scrollerRect = scroller.getBoundingClientRect();
      const targetX = scrollerRect.left + Math.min(scrollerRect.width * 0.12, 90);
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - targetX);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const handleScroll = () => {
      if (scrollFrameRef.current) return;
      scrollFrameRef.current = window.requestAnimationFrame(updateActiveCard);
    };

    const handleResize = () => updateActiveCard();

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    updateActiveCard();

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [projects.length]);

  useEffect(() => {
    if (activeIndex > projects.length - 1) setActiveIndex(Math.max(0, projects.length - 1));
  }, [projects.length, activeIndex]);

  if (!projects.length) return null;

  const progress = projects.length > 1 ? ((activeIndex + 1) / projects.length) * 100 : 100;

  return (
    <section id="projects" className="overflow-hidden border-b border-black/[0.07] bg-[#f6f5f2] py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,.65fr)] lg:items-end lg:gap-14">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">
              {projectsSection.label}
            </p>
            <h2 className="mt-3 max-w-3xl text-[2.15rem] font-black leading-[0.98] tracking-[-0.048em] text-[#171817] sm:mt-4 sm:text-5xl sm:leading-[0.96] sm:tracking-[-0.052em] lg:text-[3.65rem]">
              {projectsSection.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/50 sm:text-[15px] lg:justify-self-end lg:text-right">
            {projectsSection.description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/[0.09] pt-5 sm:mt-10 lg:mt-14">
          <div className="flex min-w-0 flex-1 items-center gap-3 text-[10px] font-bold tracking-[0.05em] text-[#171817] sm:gap-3.5">
            <span className="w-5 tabular-nums">{formatIndex(activeIndex + 1)}</span>
            <div className="relative h-px min-w-0 flex-1 overflow-hidden bg-black/12">
              <div
                className="absolute inset-y-0 left-0 origin-left bg-[#3557c8] transition-[width] duration-500 ease-[cubic-bezier(.22,.61,.36,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-5 tabular-nums text-right text-black/35">{formatIndex(projects.length)}</span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:pl-4 lg:pl-8">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="group inline-flex h-11 w-11 items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white/65 text-[10px] font-bold text-[#171817] transition-[background-color,border-color,opacity] duration-200 hover:border-black/15 hover:bg-white disabled:cursor-default disabled:opacity-30 sm:w-auto sm:px-3.5"
              aria-label="Previous project"
            >
              <ChevronLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === projects.length - 1}
              className="group inline-flex h-11 w-11 items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white/65 text-[10px] font-bold text-[#171817] transition-[background-color,border-color,opacity] duration-200 hover:border-black/15 hover:bg-white disabled:cursor-default disabled:opacity-30 sm:w-auto sm:px-3.5"
              aria-label="Next project"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </Container>

      <div className="mt-7 sm:mt-8 lg:mt-9">
        <Container>
          <div
            ref={scrollerRef}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                goPrev();
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                goNext();
              }
            }}
            aria-label="Selected projects carousel"
            className="project-rail -mx-[18px] flex touch-pan-x snap-x snap-mandatory gap-3.5 overflow-x-auto px-[18px] pb-4 outline-none sm:-mx-6 sm:gap-4 sm:px-6 sm:pb-5 lg:-mx-8 lg:gap-5 lg:px-8"
          >
            {projects.map((project, index) => {
              const distance = Math.abs(index - activeIndex);

              return (
                <motion.article
                  key={project.id}
                  data-project-card
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.48, delay: Math.min(index, 2) * 0.035 }}
                  className={`group min-w-[calc(100vw-54px)] max-w-[420px] snap-start snap-always overflow-hidden rounded-[18px] border bg-[#fbfaf7] transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out sm:min-w-[60%] sm:max-w-none sm:rounded-[20px] lg:min-w-[38%] xl:min-w-[31.5%] ${
                    distance === 0
                      ? "border-black/[0.10] shadow-[0_14px_34px_rgba(24,24,22,0.075)]"
                      : "border-black/[0.07] shadow-[0_8px_24px_rgba(24,24,22,0.04)]"
                  } sm:hover:-translate-y-0.5 sm:hover:border-black/[0.11] sm:hover:shadow-[0_16px_38px_rgba(24,24,22,0.085)]`}
                >
                  <Link
                    to={`/project/${project.slug}`}
                    className="block aspect-[1.2/1] overflow-hidden sm:aspect-[1.46/1]"
                    aria-label={`View ${project.title} case study`}
                  >
                    <ProjectVisual project={project} />
                  </Link>

                  <div className="p-5 sm:p-6">
                    <Link to={`/project/${project.slug}`} className="block text-[#171817]">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#3557c8]">
                            {project.kicker}
                          </p>
                          <h3 className="mt-2 text-[1.3rem] font-black leading-tight tracking-[-0.037em] sm:text-[1.42rem]">
                            {project.title}
                          </h3>
                        </div>
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white transition-[background-color,color,border-color] duration-200 group-hover:border-[#3557c8] group-hover:bg-[#3557c8] group-hover:text-white">
                          <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-2 min-h-11 text-[13px] leading-[1.65] text-black/48 sm:min-h-12 sm:leading-6">
                        {project.description}
                      </p>
                    </Link>

                    <div className="mt-4 flex min-h-10 items-center justify-between gap-4 border-t border-black/[0.08] pt-4 sm:mt-5">
                      <Link
                        to={`/project/${project.slug}`}
                        className="group/link inline-flex items-center gap-2 text-[10px] font-bold text-[#171817]"
                      >
                        View case study
                        <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
                      </Link>

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-black/40 transition-colors hover:text-black"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Live <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}

            <div className="min-w-1 shrink-0 sm:min-w-3 lg:min-w-6" aria-hidden="true" />
          </div>
        </Container>
      </div>
    </section>
  );
}
