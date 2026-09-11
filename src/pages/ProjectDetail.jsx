import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

const toneMap = {
  ink: {
    cover: "bg-[#202220] text-white",
    soft: "bg-[#ebe9e3] text-[#171817]",
    accent: "text-[#7890df]",
  },
  forest: {
    cover: "bg-[#29342f] text-white",
    soft: "bg-[#e5eae5] text-[#171817]",
    accent: "text-[#9eb5a9]",
  },
  sand: {
    cover: "bg-[#d7c4ad] text-[#171817]",
    soft: "bg-[#eee5da] text-[#171817]",
    accent: "text-[#725f4d]",
  },
  blue: {
    cover: "bg-[#3557c8] text-white",
    soft: "bg-[#e7ebf8] text-[#171817]",
    accent: "text-[#9fb0ee]",
  },
  sunset: {
    cover: "bg-[#c6a894] text-[#171817]",
    soft: "bg-[#eee3dc] text-[#171817]",
    accent: "text-[#765743]",
  },
  plum: {
    cover: "bg-[#57566c] text-white",
    soft: "bg-[#e8e7ed] text-[#171817]",
    accent: "text-[#bbb9d1]",
  },
};

const labelClass =
  "text-[10px] font-black uppercase tracking-[0.18em] text-[#3557c8]";

function BrowserVisual({ project, tone }) {
  const image = project.image || project.images?.find((item) => item?.url)?.url;

  if (image) {
    return (
      <div className="overflow-hidden rounded-[18px] border border-black/[0.08] bg-[#e8e6df] shadow-[0_18px_50px_rgba(20,21,20,0.08)] sm:rounded-[26px] sm:shadow-[0_28px_90px_rgba(20,21,20,0.10)]">
        <div className="flex h-11 items-center gap-2 border-b border-black/[0.07] bg-[#f8f7f3] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/[0.07]" />
          <div className="ml-3 h-6 max-w-[280px] flex-1 rounded-full border border-black/[0.06] bg-white/70" />
        </div>
        <div className="relative aspect-[16/10] bg-[#dedbd3] sm:aspect-[16/9] sm:min-h-[420px]">
          <img
            src={image}
            alt={project.imageAlt || `${project.title} project preview`}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    );
  }

  const architecture = project.architecture?.length
    ? project.architecture
    : ["Input", "Business rules", "Application flow", "Output"];

  return (
    <div
      className={`relative min-h-[350px] overflow-hidden rounded-[18px] border border-black/[0.06] p-5 shadow-[0_18px_50px_rgba(20,21,20,0.08)] sm:min-h-[520px] sm:rounded-[26px] sm:p-10 sm:shadow-[0_28px_90px_rgba(20,21,20,0.10)] ${tone.cover}`}
    >
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-current opacity-[0.08]" />
      <div className="absolute -bottom-20 right-20 h-52 w-52 rounded-full border border-current opacity-[0.06]" />

      <div className="relative flex h-full min-h-[310px] flex-col justify-between sm:min-h-[440px]">
        <div className="flex items-center justify-between gap-6 text-[9px] font-bold uppercase tracking-[0.18em] opacity-45">
          <span>{project.kicker || "Case study"}</span>
          <span>{project.status}</span>
        </div>

        <div>
          <p className="max-w-[780px] text-[clamp(2.7rem,14vw,4.2rem)] font-black leading-[0.86] tracking-[-0.065em] sm:text-[clamp(3.5rem,8vw,7.4rem)] sm:leading-[0.82] sm:tracking-[-0.075em]">
            {project.title}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
            {architecture.map((step, index) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm">
                  {step}
                </span>
                {index < architecture.length - 1 && (
                  <ArrowRight size={13} className="opacity-25" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function ScreenshotFrame({ image, alt, onOpen, wide = false }) {
  return (
    <figure
      className={`${wide ? "sm:col-span-2" : ""} group overflow-hidden rounded-[16px] border border-black/[0.08] bg-[#e7e4dd] shadow-[0_10px_30px_rgba(22,23,22,0.05)] sm:rounded-[20px]`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Open ${alt} fullscreen`}
      >
        <div className="flex h-9 items-center gap-1.5 border-b border-black/[0.07] bg-[#f8f7f3] px-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/[0.06]" />
          <div className="ml-2 h-4 max-w-[220px] flex-1 rounded-full bg-black/[0.045]" />
          <span className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full text-black/30 transition group-hover:bg-black/[0.05] group-hover:text-black/60">
            <Maximize2 size={12} />
          </span>
        </div>
        <div className="relative overflow-hidden bg-[#dedbd3]">
          <img
            src={image.url}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="max-h-[720px] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.006]"
          />
        </div>
      </button>
      {image.alt && (
        <figcaption className="border-t border-black/[0.06] bg-[#fbfaf7] px-4 py-3 text-[10px] font-semibold leading-5 text-black/42">
          {image.alt}
        </figcaption>
      )}
    </figure>
  );
}

function SectionIntro({ number, label, title, children }) {
  return (
    <div className="grid gap-4 border-t border-black/[0.09] pt-6 sm:pt-7 md:grid-cols-[160px_1fr] md:gap-12">
      <div>
        <p className="text-[10px] font-black tabular-nums text-black/25">{number}</p>
        <p className="mt-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#3557c8]">
          {label}
        </p>
      </div>
      <div>
        <h2 className="max-w-3xl text-[2rem] font-black leading-[1.03] tracking-[-0.043em] sm:text-4xl sm:leading-[1.02] sm:tracking-[-0.045em] lg:text-[2.9rem]">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export default function ProjectDetail({ data }) {
  const { slug } = useParams();
  const projects = data.projectsSection?.items || [];
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  const nextProject =
    projectIndex >= 0 && projects.length > 1
      ? projects[(projectIndex + 1) % projects.length]
      : null;
  const gallery = (project?.images || []).filter(
    (item, index) => item?.url && (index > 0 || item.url !== project?.image)
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLightboxIndex(null);
  }, [slug]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft" && gallery.length > 1) {
        setLightboxIndex((current) => (current - 1 + gallery.length) % gallery.length);
      }
      if (event.key === "ArrowRight" && gallery.length > 1) {
        setLightboxIndex((current) => (current + 1) % gallery.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, gallery.length]);

  if (!project) {
    return (
      <div className="bg-[#f5f3ee]">
        <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20">
          <p className={labelClass}>404</p>
          <h1 className="mt-4 text-[2.5rem] font-black leading-none tracking-[-0.05em] sm:text-5xl">
            Project not found.
          </h1>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#171817] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3557c8]"
          >
            <ArrowLeft size={15} /> Back home
          </Link>
        </Container>
      </div>
    );
  }

  const tone = toneMap[project.tone] || toneMap.ink;
  const architecture = project.architecture?.length
    ? project.architecture
    : ["Input", "Business rules", "Application flow", "Output"];
  const decisions = project.decisions?.length
    ? project.decisions
    : [
        "Keep business rules explicit so the interface cannot create invalid application state.",
        "Prefer maintainable boundaries over clever abstractions that make future changes harder.",
        "Design the user flow and backend behavior together so edge cases have one clear source of truth.",
      ];
  return (
    <article className="bg-[#f5f3ee] text-[#171817]">
      <SEO
        title={`${project.title} — Case Study`}
        description={project.description}
        url={`/project/${project.slug}`}
        type="article"
      />

      <section className="border-b border-black/[0.08] bg-[#f5f3ee] pb-9 pt-8 sm:pb-14 sm:pt-12 lg:pb-16">
        <Container>
          <div className="flex items-center justify-between gap-6">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.13em] text-black/38 transition hover:text-black"
            >
              <ArrowLeft size={13} /> Selected work
            </Link>
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.16em] text-black/26 sm:block">
              Case study {String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-9 grid gap-7 sm:mt-12 sm:gap-9 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-16">
            <div>
              <p className={labelClass}>{project.kicker}</p>
              <h1 className="text-balance mt-4 max-w-5xl text-[clamp(2.9rem,15vw,4.3rem)] font-black leading-[0.88] tracking-[-0.064em] sm:mt-5 sm:text-[clamp(4rem,9vw,8.6rem)] sm:leading-[0.82] sm:tracking-[-0.078em]">
                {project.title}
              </h1>
            </div>
            <div className="pb-1">
              <p className="max-w-2xl text-[15px] leading-7 text-black/55 sm:text-base sm:leading-8">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/[0.09] bg-[#fbfaf7] px-3 py-1.5 text-[10px] font-semibold text-black/48"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-5 sm:py-10 lg:py-12">
        <Container>
          <BrowserVisual project={project} tone={tone} />
        </Container>
      </section>

      <section className="pb-16 pt-8 sm:pb-24 sm:pt-14 lg:pb-32">
        <Container>
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-[230px_1fr] lg:gap-20">
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <p className={labelClass}>Project details</p>
              <dl className="mt-6 border-t border-black/[0.09]">
                <div className="border-b border-black/[0.08] py-5">
                  <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/28">
                    Role
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-6">{project.role}</dd>
                </div>
                <div className="border-b border-black/[0.08] py-5">
                  <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/28">
                    Status
                  </dt>
                  <dd className="mt-2 text-sm font-semibold">{project.status}</dd>
                </div>
                <div className="border-b border-black/[0.08] py-5">
                  <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/28">
                    Stack
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-6 text-black/65">
                    {project.techStack.join(" · ")}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col items-start gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#3557c8] transition hover:text-[#171817]"
                  >
                    Visit live project <ExternalLink size={13} />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-black/48 transition hover:text-black"
                  >
                    View source <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </aside>

            <div className="space-y-16 sm:space-y-24">
              <SectionIntro number="01" label="Context" title="The problem behind the interface.">
                <div className="mt-6 grid gap-7 sm:mt-7 md:grid-cols-2 md:gap-10">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-black/28">
                      The challenge
                    </p>
                    <p className="mt-3 text-[15px] leading-8 text-black/58">
                      {project.problem || project.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-black/28">
                      My contribution
                    </p>
                    <p className="mt-3 text-[15px] leading-8 text-black/58">
                      {project.contribution || project.description}
                    </p>
                  </div>
                </div>
              </SectionIntro>

              <SectionIntro number="02" label="System" title="A flow I could reason about.">
                <p className="mt-5 max-w-3xl text-[15px] leading-8 text-black/55">
                  I prefer making the important system boundaries visible. It makes implementation easier to test, easier to debug, and much harder to accidentally break as the product grows.
                </p>
                <div className={`mt-7 rounded-[18px] p-4 sm:mt-8 sm:rounded-[22px] sm:p-7 ${tone.soft}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    {architecture.map((step, index) => (
                      <div key={step} className="flex w-full items-center gap-3 sm:w-auto">
                        <div className="flex min-h-12 w-full items-center rounded-xl border border-black/[0.09] bg-white/50 px-4 py-2.5 text-xs font-bold backdrop-blur-sm sm:w-auto sm:rounded-full">
                          <span className="mr-2 text-[9px] tabular-nums text-black/28">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {step}
                        </div>
                        {index < architecture.length - 1 && (
                          <ArrowRight size={14} className="hidden text-black/22 sm:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SectionIntro>

              <SectionIntro number="03" label="Decisions" title="The engineering choices that mattered.">
                <div className="mt-7 border-t border-black/[0.09] sm:mt-8">
                  {decisions.map((decision, index) => (
                    <div
                      key={decision}
                      className="grid gap-2.5 border-b border-black/[0.08] py-5 sm:grid-cols-[58px_1fr] sm:gap-5 sm:py-6"
                    >
                      <span className="text-[10px] font-black tabular-nums text-[#3557c8]">
                        0{index + 1}
                      </span>
                      <p className="max-w-3xl text-[15px] font-semibold leading-7 text-black/66 sm:text-base sm:leading-8">
                        {decision}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionIntro>

              <SectionIntro number="04" label="Build" title="What made it into the product.">
                <div className="mt-7 grid border-t border-black/[0.09] sm:mt-8 sm:grid-cols-2">
                  {project.features.map((feature, index) => (
                    <div
                      key={feature}
                      className={`border-b border-black/[0.08] py-5 sm:py-6 ${
                        index % 2 === 1 ? "sm:border-l sm:pl-7" : "sm:pr-7"
                      }`}
                    >
                      <p className="text-[9px] font-black tabular-nums text-black/22">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-6 text-black/72">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionIntro>

              {gallery.length > 0 && (
                <SectionIntro number="05" label="Screens" title="A closer look at the product.">
                  <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                    {gallery.map((image, index) => {
                      const alt = image.alt || `${project.title} screen ${index + 2}`;
                      return (
                        <ScreenshotFrame
                          key={`${image.url}-${index}`}
                          image={image}
                          alt={alt}
                          wide={index % 3 === 0}
                          onOpen={() => setLightboxIndex(index)}
                        />
                      );
                    })}
                  </div>
                </SectionIntro>
              )}

              <SectionIntro
                number={gallery.length > 0 ? "06" : "05"}
                label="Outcome"
                title="Built to survive the edge cases."
              >
                <div className="mt-7 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-[1.15fr_.85fr]">
                  <div className="rounded-[18px] bg-[#191b1a] p-6 text-white sm:rounded-[22px] sm:p-9">
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#91a6f0]">
                      Result
                    </p>
                    <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 tracking-[-0.015em] text-white/74 sm:text-xl sm:leading-9">
                      {project.outcome}
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-black/[0.08] bg-[#fbfaf7] p-6 sm:rounded-[22px] sm:p-9">
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#3557c8]">
                      What it demonstrates
                    </p>
                    <p className="mt-5 text-[15px] leading-8 text-black/58">
                      {project.takeaway || project.challenge}
                    </p>
                  </div>
                </div>
              </SectionIntro>
            </div>
          </div>
        </Container>
      </section>

      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111210]/95 p-3 sm:p-7"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screenshot viewer`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxIndex(null);
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-white/75 backdrop-blur-md transition hover:bg-white hover:text-[#171817] sm:right-6 sm:top-6"
            aria-label="Close screenshot viewer"
          >
            <X size={17} />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)}
                className="absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/25 text-white/75 backdrop-blur-md transition hover:bg-white hover:text-[#171817] sm:left-6"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)}
                className="absolute right-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/25 text-white/75 backdrop-blur-md transition hover:bg-white hover:text-[#171817] sm:right-6"
                aria-label="Next screenshot"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div className="flex max-h-[92vh] max-w-[min(94vw,1500px)] flex-col overflow-hidden rounded-[16px] border border-white/10 bg-[#1c1d1b] shadow-2xl sm:rounded-[22px]">
            <div className="flex h-10 shrink-0 items-center gap-1.5 border-b border-white/[0.08] bg-[#20211f] px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
              <span className="ml-auto text-[9px] font-bold tabular-nums text-white/30">
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
            </div>
            <div className="min-h-0 overflow-auto bg-[#111210]">
              <img
                src={gallery[lightboxIndex].url}
                alt={gallery[lightboxIndex].alt || `${project.title} screenshot ${lightboxIndex + 2}`}
                className="mx-auto h-auto max-h-[82vh] w-auto max-w-full object-contain"
              />
            </div>
            {gallery[lightboxIndex].alt && (
              <p className="shrink-0 border-t border-white/[0.08] px-4 py-3 text-xs leading-5 text-white/48 sm:px-5">
                {gallery[lightboxIndex].alt}
              </p>
            )}
          </div>
        </div>
      )}

      {nextProject && (
        <section className="border-t border-white/[0.08] bg-[#191b1a] py-12 text-white sm:py-[72px] lg:py-20">
          <Container>
            <Link
              to={`/project/${nextProject.slug}`}
              className="group block"
              aria-label={`Next project: ${nextProject.title}`}
            >
              <div className="flex items-center justify-between gap-6">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">
                  Next project
                </p>
                <div className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/65 transition duration-300 group-hover:border-white/30 group-hover:bg-white group-hover:text-[#171817]">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <div className="mt-7 grid gap-4 sm:mt-9 sm:gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#91a6f0]">
                    {nextProject.kicker}
                  </p>
                  <h2 className="mt-3 text-[clamp(2.6rem,13vw,4rem)] font-black leading-[0.9] tracking-[-0.06em] transition duration-300 group-hover:text-white/75 sm:text-[clamp(3rem,7vw,6.7rem)] sm:leading-[0.86] sm:tracking-[-0.07em]">
                    {nextProject.title}
                  </h2>
                </div>
                <p className="max-w-md pb-1 text-sm leading-7 text-white/42">
                  {nextProject.description}
                </p>
              </div>
            </Link>
          </Container>
        </section>
      )}
    </article>
  );
}
