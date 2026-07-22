import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "../lib/icons";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

export default function ProjectDetail({ data, reducedMotion }) {
  const { slug } = useParams();
  const project = data.projectsSection.items.find((p) => p.slug === slug);
  const profile = data.profile;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-red-700">Project Not Found</h1>
        <p className="mt-4 text-[#655d52]">The case study you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#151412] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a78d67]">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </Container>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://thekushalpoudel.com.np/project/${project.slug}`,
    "image": project.images?.[0]?.url ? `https://thekushalpoudel.com.np${project.images[0].url}` : "https://thekushalpoudel.com.np/images/og-image.jpg",
    "author": {
      "@type": "Person",
      "name": profile?.name || "Kushal Poudel"
    }
  };

  return (
    <article className="pt-8 pb-20 lg:pt-12 lg:pb-28">
      <SEO 
        title={project.title} 
        description={project.description} 
        image={project.images?.[0]?.url} 
        url={`/project/${project.slug}`}
        type="article"
        schema={schema}
      />
      <Container>
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#a78d67] transition hover:text-[#151412]">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>

        <header className="mb-12 md:mb-16">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-[#a78d67]">
            {project.techStack.join(" / ")}
          </p>
          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            className="font-serif text-4xl font-bold leading-tight text-[#201d18] md:text-5xl lg:text-6xl"
          >
            {project.title}
          </motion.h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#655d52]">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#151412] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#292723]">
                Visit Live Site <ExternalLink size={16} />
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-[#beb3a2] bg-white/30 px-6 py-3 text-sm font-semibold text-[#1d1b17] transition hover:bg-white">
                View Source <GitHubIcon size={16} />
              </a>
            )}
          </div>
        </header>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {project.images && project.images.length > 0 ? (
            <div className="relative">
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {project.images.map((img, idx) => (
                  <div key={idx} className="min-w-full md:min-w-[85%] snap-center shrink-0 overflow-hidden rounded-2xl border border-[#e6ded0] bg-white shadow-xl">
                    <img src={img.url} alt={img.alt || `${project.title} screenshot ${idx + 1}`} className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
              {project.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-2">
                  {project.images.map((_, idx) => (
                    <div key={idx} className="w-2 h-2 rounded-full bg-[#d0c5b5]" />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[#e6ded0] bg-white shadow-xl flex h-64 items-center justify-center bg-[#ded4c4] text-[#a78d67]">
              No image available
            </div>
          )}
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[1fr_250px] lg:gap-20">
          <div>
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#201d18] md:text-3xl">Key Features</h2>
            <ul className="space-y-4 text-[#655d52]">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a17a]" aria-hidden="true" />
                  <span className="text-base leading-7">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <aside className="rounded-xl border border-[#e6ded0] bg-white/50 p-6 shadow-sm self-start">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#a78d67]">Project Details</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-[#8c806f]">Role</h4>
                <p className="mt-1 font-medium text-[#201d18]">{project.role}</p>
              </div>
              {project.status && (
                <div>
                  <h4 className="text-xs font-semibold text-[#8c806f]">Status</h4>
                  <p className="mt-1 inline-flex rounded-full bg-[#151412] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                    {project.status}
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
