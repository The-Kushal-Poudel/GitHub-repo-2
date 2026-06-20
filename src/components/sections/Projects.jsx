import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { fadeUp, popIn, stagger } from "../../lib/animations";
import { GitHubIcon } from "../../lib/icons";

export default function Projects({ projectsSection, reducedMotion }) {
  return (
    <section id="projects" className="relative overflow-hidden bg-[#f8f3eb] py-12 lg:py-14">
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -24, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-8 top-12 hidden rounded-full border border-[#dfd2bf] bg-white/35 p-5 text-[#a78d67] shadow-xl shadow-black/5 lg:block"
        aria-hidden="true"
      >
        <Sparkles size={32} />
      </motion.div>

      <Container>
        <motion.div variants={stagger} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.35 }} className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading label={projectsSection.label} title={projectsSection.title} iconImage={projectsSection.iconImage} />
          <motion.a variants={fadeUp} whileHover={reducedMotion ? undefined : { x: 8 }} href={projectsSection.ctaLink} className="inline-flex items-center gap-2 text-sm font-bold text-[#211f1a] hover:text-[#a78d67]">
            {projectsSection.ctaText} <ArrowRight size={16} aria-hidden="true" />
          </motion.a>
        </motion.div>

        <motion.div variants={stagger} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8 xl:grid-cols-3">
          {projectsSection.items.map((project) => (
            <motion.article
              key={project.id}
              variants={popIn}
              whileHover={reducedMotion ? undefined : { y: -18, rotateX: 4, rotateY: -4, scale: 1.025, transition: { type: "spring", stiffness: 190, damping: 16 } }}
              className="group overflow-hidden rounded-xl border border-[#e6ded0] bg-white shadow-sm transition hover:shadow-2xl hover:shadow-black/10"
            >
              <div className="relative h-40 overflow-hidden bg-[#ded4c4]">
                <motion.img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  width="900"
                  height="600"
                  whileHover={reducedMotion ? undefined : { scale: 1.16 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full w-full object-cover"
                />
                <motion.div
                  initial={reducedMotion ? false : { x: "-120%" }}
                  whileHover={reducedMotion ? undefined : { x: "120%" }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  aria-hidden="true"
                />
                {project.status && (
                  <motion.span
                    animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute left-4 top-4 rounded-full bg-[#151412] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white"
                  >
                    {project.status}
                  </motion.span>
                )}
              </div>

              <div className="p-5 sm:p-6">
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#a78d67]">{project.techStack.join(" / ")}</p>
                <h3 className="mb-3 text-xl font-bold text-[#201d18]">{project.title}</h3>
                <p className="min-h-[72px] text-sm leading-7 text-[#655d52]">{project.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8c806f]">Role: {project.role}</p>

                <ul className="mt-4 space-y-2 text-sm leading-6 text-[#655d52]">
                  {project.features.slice(0, 2).map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a17a]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-4">
                  {project.liveLink ? (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={reducedMotion ? undefined : { x: 8 }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#a78d67]"
                    >
                      View Project <ExternalLink size={14} aria-hidden="true" />
                    </motion.a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#a78d67]">
                      Case Study Coming Soon <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  )}

                  {project.githubLink ? (
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={reducedMotion ? undefined : { x: 8 }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#211f1a]"
                    >
                      GitHub <GitHubIcon size={14} />
                    </motion.a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8c806f]">
                      Private Repo
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
