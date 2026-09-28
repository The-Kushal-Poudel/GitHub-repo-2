import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

const cardStyles = [
  "border-t-[#4f73ff]",
  "border-t-[#ff7858]",
  "border-t-[#caff4f]",
];

export default function Blogs({ blogsSection }) {
  return (
    <section id="blogs" className="border-b border-[#152238]/10 bg-[#fffaf3] py-18 text-[#152238] sm:py-22 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ff7858]">{blogsSection.label}</p>
            <h2 className="mt-4 text-balance text-[2.65rem] font-black leading-[.95] tracking-[-.055em] sm:text-6xl lg:text-[5.4rem]">{blogsSection.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#152238]/50 sm:text-base lg:justify-self-end">{blogsSection.description}</p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-3">
          {blogsSection.items.map((blog, index) => (
            <article key={blog.id} className={`group flex min-h-[330px] flex-col rounded-[24px] border border-[#152238]/10 border-t-4 bg-[#f6f0e7] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white sm:p-7 ${cardStyles[index % cardStyles.length]}`}>
              <div className="flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[0.14em] text-[#152238]/32"><span>{blog.category}</span><span>{blog.date}</span></div>
              <h3 className="mt-9 text-[1.55rem] font-black leading-[1.02] tracking-[-.043em] sm:text-[1.8rem]">{blog.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#152238]/52">{blog.description}</p>
              <Link to={`/blog/${blog.id}`} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black text-[#4f73ff] transition group-hover:text-[#152238]">Read note <ArrowUpRight size={14} /></Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
