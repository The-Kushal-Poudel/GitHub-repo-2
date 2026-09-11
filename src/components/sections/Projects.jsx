import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Container from "../common/Container";

const tones = {
  ink: "from-[#151923] via-[#0e1016] to-[#23283a] text-white",
  forest: "from-[#103b31] via-[#15261f] to-[#294e42] text-white",
  sand: "from-[#ffb45e] via-[#e7974f] to-[#6e3d2a] text-[#14100c]",
  blue: "from-[#5f79ff] via-[#8da2ff] to-[#b6c6ff] text-white",
  sunset: "from-[#ff7d68] via-[#ff9d70] to-[#ffd0a4] text-[#1a1110]",
  plum: "from-[#7a5cff] via-[#9b82ff] to-[#d4c9ff] text-white",
};

function ProjectVisual({ project, featured }) {
  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#11141b]">
        <img src={project.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.15em] text-white backdrop-blur-md">{project.kicker}</div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${tones[project.tone] || tones.ink}`}>
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.38)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-9">
        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.18em] opacity-60">
          <span>{project.kicker}</span>
          <span>{featured ? "Featured build" : "Case study"}</span>
        </div>
        <div>
          <p className={`${featured ? "max-w-[82%] text-5xl sm:text-7xl" : "max-w-[85%] text-4xl sm:text-5xl"} font-black leading-[0.88] tracking-[-0.065em]`}>{project.title}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, featured ? 4 : 3).map((tech) => (
              <span key={tech} className="rounded-full border border-current/25 bg-black/[0.06] px-2.5 py-1 text-[9px] font-black uppercase tracking-[.08em] opacity-75 backdrop-blur-sm">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projectsSection, reducedMotion }) {
  return (
    <section id="projects" className="border-b border-black/10 bg-[#f4f1ea] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#5b6cff]">{projectsSection.label}</p>
            <h2 className="text-balance mt-4 text-4xl font-black leading-[0.94] tracking-[-0.058em] text-[#11131a] sm:text-5xl lg:text-7xl">{projectsSection.title}</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-sm leading-7 text-black/55 sm:text-base">{projectsSection.description}</p>
            <p className="mt-4 inline-flex rounded-full bg-[#11131a] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.14em] text-[#c9ff4b]">Real workflows · real edge cases</p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2">
          {projectsSection.items.map((project, index) => {
            const featured = index === 0;
            return (
              <motion.article
                key={project.id}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.58, delay: (index % 2) * 0.07 }}
                className={`group overflow-hidden rounded-[28px] border border-black/[0.09] bg-white shadow-[0_18px_55px_rgba(17,19,26,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(17,19,26,.11)] ${featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.18fr_.82fr]" : ""}`}
              >
                <Link to={`/project/${project.slug}`} className={`block overflow-hidden ${featured ? "min-h-[390px] lg:min-h-[500px]" : "aspect-[16/10]"}`}>
                  <ProjectVisual project={project} featured={featured} />
                </Link>

                <div className={`p-6 sm:p-7 ${featured ? "flex flex-col justify-center lg:p-10" : ""}`}>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5b6cff]">{project.kicker}</p>
                    <span className="rounded-full border border-black/10 bg-black/[.025] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.13em] text-black/45">{project.status}</span>
                  </div>
                  <h3 className={`${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} font-black tracking-[-0.045em] text-[#11131a]`}>{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-black/58 sm:text-[15px]">{project.description}</p>

                  {featured && (
                    <div className="mt-6 grid gap-2 sm:grid-cols-2">
                      {project.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="rounded-xl bg-[#f4f1ea] px-3.5 py-3 text-[11px] font-bold leading-5 text-black/65">{feature}</div>
                      ))}
                    </div>
                  )}

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link to={`/project/${project.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#11131a] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#5b6cff]">
                      View case study <ArrowUpRight size={14} />
                    </Link>
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-black/45 transition hover:text-black">
                        Live site <ExternalLink size={13} />
                      </a>
                    )}
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
