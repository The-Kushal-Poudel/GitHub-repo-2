import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

const tones = {
  ink: "bg-[#1d201f] text-white",
  forest: "bg-[#26332f] text-white",
  sand: "bg-[#d9c5ad] text-[#171817]",
  blue: "bg-[#3557c8] text-white",
  sunset: "bg-[#c9a995] text-[#171817]",
  plum: "bg-[#56546c] text-white",
};

export default function ProjectDetail({ data }) {
  const { slug } = useParams();
  const project = data.projectsSection.items.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="bg-[#f5f3ee]">
        <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3557c8]">404</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Project not found.</h1>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#171817] px-5 py-3 text-sm font-bold text-white">
            <ArrowLeft size={15} /> Back home
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <article className="bg-[#f5f3ee] text-[#171817]">
      <SEO title={project.title} description={project.description} url={`/project/${project.slug}`} type="article" />

      <section className="border-b border-white/[0.08] bg-[#191b1a] py-12 text-white sm:py-16 lg:py-20">
        <Container>
          <Link to="/#projects" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-white/38 hover:text-white">
            <ArrowLeft size={14} /> Back to work
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#91a6f0]">{project.kicker}</p>
              <h1 className="text-balance mt-4 text-[clamp(3.4rem,7.6vw,7.2rem)] font-black leading-[0.89] tracking-[-0.07em]">{project.title}</h1>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-8 text-white/54">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/48">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-black/[0.07] py-8 sm:py-10">
        <Container>
          <div className={`relative min-h-[390px] overflow-hidden rounded-[24px] ${tones[project.tone] || tones.ink}`}>
            {project.image ? (
              <>
                <img src={project.image} alt={`${project.title} project preview`} className="h-full min-h-[390px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </>
            ) : (
              <div className="relative flex min-h-[390px] flex-col justify-between p-8 sm:p-12">
                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.18em] opacity-50">
                  <span>Case study</span><span>{project.status}</span>
                </div>
                <div>
                  <p className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">{project.title}</p>
                  <p className="mt-5 max-w-xl text-sm font-semibold opacity-55 sm:text-base">{project.role}</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[.62fr_1.38fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3557c8]">Project details</p>
            <div className="mt-6 space-y-6 border-y border-black/[0.08] py-6">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/28">Role</p>
                <p className="mt-2 text-sm font-semibold">{project.role}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/28">Status</p>
                <p className="mt-2 text-sm font-semibold">{project.status}</p>
              </div>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#3557c8] transition hover:text-[#171817]">
                  Visit live site <ExternalLink size={13} />
                </a>
              )}
            </div>
          </aside>

          <div className="space-y-14">
            <section>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3557c8]">What I built</p>
              <div className="mt-6 grid border-t border-black/[0.08] sm:grid-cols-2">
                {project.features.map((feature, index) => (
                  <div key={feature} className={`border-b border-black/[0.08] py-5 ${index % 2 === 1 ? "sm:border-l sm:pl-6" : "sm:pr-6"}`}>
                    <p className="text-[9px] font-bold text-black/22">0{index + 1}</p>
                    <p className="mt-3 text-sm font-semibold leading-6">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[20px] border border-black/[0.08] bg-[#fbfaf7] p-6 sm:p-7">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#3557c8]">Engineering challenge</p>
                <p className="mt-4 text-base leading-8 text-black/56">{project.challenge}</p>
              </div>
              <div className="rounded-[20px] bg-[#191b1a] p-6 text-white sm:p-7">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#91a6f0]">Result</p>
                <p className="mt-4 text-base leading-8 text-white/62">{project.outcome}</p>
              </div>
            </section>

            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#171817] transition hover:text-[#3557c8]">
              See more work <ArrowUpRight size={15} />
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
