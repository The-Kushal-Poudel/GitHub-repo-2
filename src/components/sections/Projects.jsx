import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Container from "../common/Container";

const tones = {
  ink: "bg-[#181813] text-white",
  forest: "bg-[#1f3a31] text-white",
  sand: "bg-[#d6a66d] text-[#171712]",
  blue: "bg-[#9fc3df] text-[#171712]",
  sunset: "bg-[#d78663] text-[#171712]",
  plum: "bg-[#a898bd] text-[#171712]",
};

function ProjectVisual({ project }) {
  if (project.image) {
    return <img src={project.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />;
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${tones[project.tone] || tones.ink}`}>
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] opacity-60">
          <span>{project.kicker}</span>
          <span>Case study</span>
        </div>
        <div>
          <p className="max-w-[80%] text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl">{project.title}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full border border-current/25 px-2.5 py-1 text-[10px] font-bold opacity-70">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projectsSection, reducedMotion }) {
  return (
    <section id="projects" className="border-b border-black/10 bg-[#ece6db] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/42">{projectsSection.label}</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl">{projectsSection.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/55 lg:justify-self-end sm:text-base">{projectsSection.description}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {projectsSection.items.map((project, index) => (
            <motion.article
              key={project.id}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
              className="group overflow-hidden rounded-[26px] border border-black/10 bg-[#f4f0e8]"
            >
              <Link to={`/project/${project.slug}`} className="block aspect-[16/10] overflow-hidden border-b border-black/10">
                <ProjectVisual project={project} />
              </Link>

              <div className="p-6 sm:p-7">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">{project.kicker}</p>
                  <span className="rounded-full border border-black/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.13em] text-black/45">{project.status}</span>
                </div>
                <h3 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/58 sm:text-[15px]">{project.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link to={`/project/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-black">
                    View case study <ArrowUpRight size={15} />
                  </Link>
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-black/45 transition hover:text-black">
                      Live site <ExternalLink size={14} />
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
