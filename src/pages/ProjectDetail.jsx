import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

const tones = {
  ink: "bg-[#181813] text-white",
  forest: "bg-[#1f3a31] text-white",
  sand: "bg-[#d6a66d] text-[#171712]",
  blue: "bg-[#9fc3df] text-[#171712]",
  sunset: "bg-[#d78663] text-[#171712]",
  plum: "bg-[#a898bd] text-[#171712]",
};

export default function ProjectDetail({ data }) {
  const { slug } = useParams();
  const project = data.projectsSection.items.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">404</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Project not found.</h1>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#171712] px-5 py-3 text-sm font-bold text-white">
          <ArrowLeft size={15} /> Back home
        </Link>
      </Container>
    );
  }

  return (
    <article className="bg-[#f4f0e8]">
      <SEO title={project.title} description={project.description} url={`/project/${project.slug}`} type="article" />

      <section className="border-b border-black/10 py-12 sm:py-16">
        <Container>
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-black/45 hover:text-black">
            <ArrowLeft size={14} /> Back to portfolio
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">{project.kicker}</p>
              <h1 className="mt-4 text-[clamp(3.7rem,8vw,7.8rem)] font-black leading-[0.86] tracking-[-0.075em]">{project.title}</h1>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-8 text-black/58">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-black/12 px-3 py-1.5 text-xs font-bold text-black/55">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-black/10 py-8 sm:py-10">
        <Container>
          <div className={`relative min-h-[360px] overflow-hidden rounded-[30px] ${tones[project.tone] || tones.ink}`}>
            {project.image ? (
              <img src={project.image} alt={`${project.title} project preview`} className="h-full min-h-[360px] w-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:42px_42px]" />
                <div className="relative flex min-h-[360px] flex-col justify-between p-8 sm:p-12">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-55">
                    <span>Case study</span><span>{project.status}</span>
                  </div>
                  <div>
                    <p className="max-w-4xl text-5xl font-black leading-[0.88] tracking-[-0.065em] sm:text-7xl">{project.title}</p>
                    <p className="mt-5 max-w-xl text-sm font-semibold opacity-65 sm:text-base">{project.role}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[.62fr_1.38fr] lg:gap-20">
          <aside>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Project details</p>
            <div className="mt-6 space-y-6 border-t border-black/10 pt-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/32">Role</p>
                <p className="mt-2 text-sm font-bold">{project.role}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/32">Status</p>
                <p className="mt-2 text-sm font-bold">{project.status}</p>
              </div>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black">
                  Visit live site <ExternalLink size={14} />
                </a>
              )}
            </div>
          </aside>

          <div className="space-y-14">
            <section>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">What I built</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature, index) => (
                  <div key={feature} className="rounded-2xl border border-black/10 bg-white/45 p-5">
                    <p className="text-[10px] font-black text-black/25">0{index + 1}</p>
                    <p className="mt-3 text-sm font-bold leading-6">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-8 border-t border-black/10 pt-10 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Engineering challenge</p>
                <p className="mt-4 text-base leading-8 text-black/60">{project.challenge}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Result</p>
                <p className="mt-4 text-base leading-8 text-black/60">{project.outcome}</p>
              </div>
            </section>

            <Link to="/#projects" className="inline-flex items-center gap-2 rounded-full bg-[#171712] px-5 py-3 text-sm font-bold text-white">
              See more work <ArrowUpRight size={15} />
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
