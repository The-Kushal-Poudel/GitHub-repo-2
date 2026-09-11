import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

const tones = {
  ink: "from-[#151923] via-[#0e1016] to-[#23283a] text-white",
  forest: "from-[#103b31] via-[#15261f] to-[#294e42] text-white",
  sand: "from-[#ffb45e] via-[#e7974f] to-[#6e3d2a] text-[#14100c]",
  blue: "from-[#5f79ff] via-[#8da2ff] to-[#b6c6ff] text-white",
  sunset: "from-[#ff7d68] via-[#ff9d70] to-[#ffd0a4] text-[#1a1110]",
  plum: "from-[#7a5cff] via-[#9b82ff] to-[#d4c9ff] text-white",
};

export default function ProjectDetail({ data }) {
  const { slug } = useParams();
  const project = data.projectsSection.items.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="bg-[#f4f1ea]">
        <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5b6cff]">404</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Project not found.</h1>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#11131a] px-5 py-3 text-sm font-bold text-white">
            <ArrowLeft size={15} /> Back home
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <article className="bg-[#f4f1ea]">
      <SEO title={project.title} description={project.description} url={`/project/${project.slug}`} type="article" />

      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#0a0c10] py-12 text-white sm:py-16 lg:py-20">
        <div className="cool-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute right-[-10%] top-[-40%] h-96 w-96 rounded-full bg-[#5b6cff]/22 blur-[120px]" />
        <Container className="relative">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/40 hover:text-[#c9ff4b]">
            <ArrowLeft size={14} /> Back to work
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#7890ff]">{project.kicker}</p>
              <h1 className="text-balance mt-4 text-[clamp(3.7rem,8vw,7.8rem)] font-black leading-[0.86] tracking-[-0.075em]">{project.title}</h1>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-8 text-white/55">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold text-white/55">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-black/10 py-8 sm:py-10">
        <Container>
          <div className={`relative min-h-[390px] overflow-hidden rounded-[30px] bg-gradient-to-br shadow-[0_30px_80px_rgba(17,19,26,.13)] ${tones[project.tone] || tones.ink}`}>
            {project.image ? (
              <>
                <img src={project.image} alt={`${project.title} project preview`} className="h-full min-h-[390px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.38)_1px,transparent_1px)] [background-size:42px_42px]" />
                <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
                <div className="relative flex min-h-[390px] flex-col justify-between p-8 sm:p-12">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] opacity-55">
                    <span>Case study</span><span>{project.status}</span>
                  </div>
                  <div>
                    <p className="max-w-4xl text-5xl font-black leading-[0.88] tracking-[-0.065em] sm:text-7xl">{project.title}</p>
                    <p className="mt-5 max-w-xl text-sm font-bold opacity-60 sm:text-base">{project.role}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[.62fr_1.38fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5b6cff]">Project details</p>
            <div className="mt-6 space-y-6 rounded-[22px] border border-black/[0.08] bg-white p-6 shadow-[0_12px_35px_rgba(17,19,26,.05)]">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/30">Role</p>
                <p className="mt-2 text-sm font-bold">{project.role}</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/30">Status</p>
                <p className="mt-2 text-sm font-bold">{project.status}</p>
              </div>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#11131a] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#5b6cff]">
                  Visit live site <ExternalLink size={13} />
                </a>
              )}
            </div>
          </aside>

          <div className="space-y-14">
            <section>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5b6cff]">What I built</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature, index) => (
                  <div key={feature} className="group rounded-[20px] border border-black/[0.08] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#5b6cff]/25 hover:shadow-[0_14px_35px_rgba(17,19,26,.06)]">
                    <p className="text-[9px] font-black text-[#5b6cff]/55">0{index + 1}</p>
                    <p className="mt-3 text-sm font-bold leading-6">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[22px] bg-[#11131a] p-6 text-white sm:p-7">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7890ff]">Engineering challenge</p>
                <p className="mt-4 text-base leading-8 text-white/58">{project.challenge}</p>
              </div>
              <div className="rounded-[22px] bg-[#5b6cff] p-6 text-white sm:p-7">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#dfe4ff]">Result</p>
                <p className="mt-4 text-base leading-8 text-white/75">{project.outcome}</p>
              </div>
            </section>

            <Link to="/#projects" className="inline-flex items-center gap-2 rounded-full bg-[#11131a] px-5 py-3 text-sm font-black text-white transition hover:bg-[#5b6cff]">
              See more work <ArrowUpRight size={15} />
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
