import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function Blogs({ blogsSection }) {
  return (
    <section id="blogs" className="border-b border-black/[0.07] bg-[#f5f3ee] py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">{blogsSection.label}</p>
            <h2 className="text-balance mt-3 text-[2.15rem] font-black leading-[0.98] tracking-[-0.048em] sm:mt-4 sm:text-5xl sm:leading-[0.96] sm:tracking-[-0.052em] lg:text-6xl">{blogsSection.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/50 lg:justify-self-end sm:text-base">{blogsSection.description}</p>
        </div>

        <div className="mt-9 grid border-t border-black/[0.08] sm:mt-12 lg:mt-14 lg:grid-cols-3">
          {blogsSection.items.map((blog, index) => (
            <article key={blog.id} className={`group flex min-h-[270px] flex-col border-b border-black/[0.08] py-6 sm:min-h-[300px] sm:py-7 lg:min-h-[320px] lg:px-7 ${index > 0 ? "lg:border-l lg:border-black/[0.08]" : ""}`}>
              <div className="flex items-center justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.14em] text-black/30">
                <span>{blog.category}</span>
                <span>{blog.date}</span>
              </div>
              <h3 className="mt-7 text-[1.35rem] font-black leading-[1.05] tracking-[-0.04em] sm:mt-10 sm:text-2xl sm:leading-[1.03] sm:tracking-[-0.042em]">{blog.title}</h3>
              <p className="mt-4 text-sm leading-7 text-black/50">{blog.description}</p>
              <Link to={`/blog/${blog.id}`} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-[#3557c8] transition group-hover:text-[#171817]">
                Read note <ArrowUpRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
