import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Container from "../common/Container";

const tones = {
  ink: "bg-[#1d201f] text-white",
  forest: "bg-[#26332f] text-white",
  sand: "bg-[#d9c5ad] text-[#171817]",
  blue: "bg-[#3557c8] text-white",
  sunset: "bg-[#c9a995] text-[#171817]",
  plum: "bg-[#56546c] text-white",
};

function ProjectVisual({ project, featured }) {
  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#1d201f]">
        <img src={project.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${tones[project.tone] || tones.ink}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="relative flex h-full flex-col justify-between p-7 sm:p-9 lg:p-10">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.16em] opacity-55">
          <span>{project.kicker}</span>
          <span>{featured ? "Selected work" : "Case study"}</span>
        </div>
        <div>
          <p className={`${featured ? "max-w-[82%] text-5xl sm:text-7xl" : "max-w-[85%] text-4xl sm:text-5xl"} font-black leading-[0.9] tracking-[-0.06em]`}>{project.title}</p>
          <p className="mt-5 max-w-md text-sm leading-6 opacity-60">{project.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projectsSection, reducedMotion }) {
  return (
    <section id="projects" className="border-b border-black/[0.07] bg-[#fbfaf7] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">{projectsSection.label}</p>
            <h2 className="text-balance mt-4 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-[#171817] sm:text-5xl lg:text-7xl">{projectsSection.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/52 lg:justify-self-end sm:text-base">{projectsSection.description}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2">
          {projectsSection.items.map((project, index) => {
            const featured = index === 0;
            return (
              <motion.article
                key={project.id}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.55, delay: (index % 2) * 0.05 }}
                className={`group overflow-hidden rounded-[22px] border border-black/[0.08] bg-white transition duration-300 hover:border-black/[0.16] ${featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.2fr_.8fr]" : ""}`}
              >
                <Link to={`/project/${project.slug}`} className={`block overflow-hidden ${featured ? "min-h-[380px] lg:min-h-[500px]" : "aspect-[16/10]"}`}>
                  <ProjectVisual project={project} featured={featured} />
                </Link>

                <div className={`p-6 sm:p-7 ${featured ? "flex flex-col justify-center lg:p-10" : ""}`}>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#3557c8]">{project.kicker}</p>
                    <span className="text-[9px] font-semibold text-black/30">{project.status}</span>
                  </div>
                  <h3 className={`${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} font-black tracking-[-0.045em] text-[#171817]`}>{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-black/55 sm:text-[15px]">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.slice(0, featured ? 5 : 4).map((tech) => (
                      <span key={tech} className="rounded-full bg-[#f2f0eb] px-3 py-1.5 text-[10px] font-semibold text-black/48">{tech}</span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    <Link to={`/project/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#171817] transition hover:text-[#3557c8]">
                      View case study <ArrowUpRight size={14} />
                    </Link>
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-black/40 transition hover:text-black">
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
