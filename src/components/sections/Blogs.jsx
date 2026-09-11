import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function Blogs({ blogsSection }) {
  return (
    <section id="blogs" className="border-b border-black/10 bg-[#e9e4da] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#5b6cff]">{blogsSection.label}</p>
            <h2 className="text-balance mt-4 text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-5xl lg:text-6xl">{blogsSection.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/55 lg:justify-self-end sm:text-base">{blogsSection.description}</p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-3">
          {blogsSection.items.map((blog, index) => (
            <article key={blog.id} className={`group flex min-h-[340px] flex-col overflow-hidden rounded-[24px] border border-black/[0.08] p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${index === 0 ? "bg-[#11131a] text-white" : "bg-[#f4f1ea]"}`}>
              <div className={`flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[0.16em] ${index === 0 ? "text-white/35" : "text-black/35"}`}>
                <span>{blog.category}</span>
                <span>{blog.date}</span>
              </div>
              <h3 className="mt-10 text-2xl font-black leading-[1.02] tracking-[-0.045em]">{blog.title}</h3>
              <p className={`mt-4 text-sm leading-7 ${index === 0 ? "text-white/50" : "text-black/55"}`}>{blog.description}</p>
              <Link to={`/blog/${blog.id}`} className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black ${index === 0 ? "text-[#c9ff4b]" : "text-[#5b6cff]"}`}>
                Read note <ArrowUpRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
