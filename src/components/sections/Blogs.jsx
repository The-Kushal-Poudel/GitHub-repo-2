import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function Blogs({ blogsSection }) {
  return (
    <section id="blogs" className="border-b border-black/10 bg-[#ece6db] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/42">{blogsSection.label}</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">{blogsSection.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/55 lg:justify-self-end sm:text-base">{blogsSection.description}</p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-3">
          {blogsSection.items.map((blog) => (
            <article key={blog.id} className="flex min-h-[330px] flex-col rounded-[24px] border border-black/10 bg-[#f4f0e8] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.16em] text-black/38">
                <span>{blog.category}</span>
                <span>{blog.date}</span>
              </div>
              <h3 className="mt-10 text-2xl font-black leading-[1.02] tracking-[-0.04em]">{blog.title}</h3>
              <p className="mt-4 text-sm leading-7 text-black/55">{blog.description}</p>
              <Link to={`/blog/${blog.id}`} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black">
                Read note <ArrowUpRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
