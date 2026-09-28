import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Container from "../common/Container";

const palette = [
  { shell: "bg-[#4f73ff] text-white", badge: "bg-white/16 text-white", soft: "text-white/68", ring: "border-white/20" },
  { shell: "bg-[#fffaf3] text-[#152238]", badge: "bg-[#e9edf9] text-[#44506a]", soft: "text-[#152238]/58", ring: "border-[#152238]/12" },
  { shell: "bg-[#ff7858] text-white", badge: "bg-white/16 text-white", soft: "text-white/72", ring: "border-white/20" },
  { shell: "bg-[#152238] text-white", badge: "bg-white/10 text-white/78", soft: "text-white/58", ring: "border-white/14" },
  { shell: "bg-[#caff4f] text-[#0d1830]", badge: "bg-[#0d1830]/10 text-[#0d1830]/66", soft: "text-[#0d1830]/62", ring: "border-[#0d1830]/14" },
  { shell: "bg-[#9ed7ff] text-[#10203a]", badge: "bg-white/35 text-[#10203a]/70", soft: "text-[#10203a]/60", ring: "border-[#10203a]/14" },
];

function ProjectArtwork({ project, index }) {
  if (project.image) {
    return (
      <div className="relative h-full min-h-[250px] overflow-hidden bg-[#dfe4ec] sm:min-h-[320px]">
        <img
          src={project.image}
          alt={project.imageAlt || `${project.title} project preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition duration-[900ms] ease-[cubic-bezier(.2,.65,.3,1)] group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1830]/46 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#0d1830]/55 px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-md">
          {project.status}
        </span>
      </div>
    );
  }

  const colors = palette[index % palette.length];
  return (
    <div className={`relative flex h-full min-h-[250px] overflow-hidden p-5 sm:min-h-[320px] sm:p-7 ${colors.shell}`}>
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className={`absolute -right-20 -bottom-24 h-64 w-64 rounded-full border ${colors.ring}`} />
      <div className={`absolute -right-2 -bottom-6 h-36 w-36 rounded-full border ${colors.ring}`} />
      <div className="relative z-10 flex w-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <span className={`rounded-full px-3 py-2 text-[8px] font-black uppercase tracking-[0.14em] ${colors.badge}`}>{project.status}</span>
          <span className={`text-[10px] font-black ${colors.soft}`}>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div>
          <p className={`text-[8px] font-black uppercase tracking-[0.18em] ${colors.soft}`}>{project.kicker}</p>
          <p className="mt-3 max-w-[92%] text-[2rem] font-black leading-[.94] tracking-[-.055em] sm:text-[2.65rem]">{project.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projectsSection, reducedMotion }) {
  const projects = projectsSection?.items || [];
  if (!projects.length) return null;

  return (
    <section id="projects" className="border-b border-[#152238]/10 bg-[#f6f0e7] py-18 text-[#152238] sm:py-22 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4f73ff]">{projectsSection.label}</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#152238]/52">{projectsSection.description}</p>
          </div>
          <h2 className="max-w-5xl text-balance text-[2.8rem] font-black leading-[.92] tracking-[-.06em] sm:text-6xl lg:text-[5.7rem]">
            {projectsSection.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:gap-5">
          {projects.map((project, index) => {
            const wide = index === 2 || index === projects.length - 1;
            return (
              <motion.article
                key={project.id}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ duration: 0.58, delay: Math.min(index, 3) * 0.045, ease: [0.22, 1, 0.36, 1] }}
                className={`group overflow-hidden rounded-[28px] border border-[#152238]/10 bg-[#fffaf3] shadow-[0_16px_45px_rgba(21,34,56,.055)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(21,34,56,.09)] ${wide ? "lg:col-span-2" : ""}`}
              >
                <div className={`grid h-full ${wide ? "lg:grid-cols-[1.05fr_.95fr]" : ""}`}>
                  <Link to={`/project/${project.slug}`} className="block min-h-[250px]" aria-label={`View ${project.title} case study`}>
                    <ProjectArtwork project={project} index={index} />
                  </Link>

                  <div className="flex min-h-[260px] flex-col p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#4f73ff]">{project.kicker}</p>
                        <h3 className="mt-2 text-[1.55rem] font-black leading-[1] tracking-[-.045em] sm:text-[1.8rem]">{project.title}</h3>
                      </div>
                      <Link to={`/project/${project.slug}`} aria-label={`Open ${project.title}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#152238] text-white transition duration-300 group-hover:rotate-6 group-hover:bg-[#4f73ff]">
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#152238]/55">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {(project.techStack || []).map((item) => (
                        <span key={item} className="rounded-full border border-[#152238]/10 bg-[#f6f0e7] px-3 py-2 text-[9px] font-bold text-[#152238]/54">{item}</span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#152238]/10 pt-5">
                      <Link to={`/project/${project.slug}`} className="inline-flex items-center gap-2 text-[11px] font-black text-[#152238] transition hover:text-[#4f73ff]">
                        View case study <ArrowUpRight size={13} />
                      </Link>
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#152238]/42 transition hover:text-[#152238]">
                          Live <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
