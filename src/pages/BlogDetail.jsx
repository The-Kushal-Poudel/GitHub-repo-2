import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

export default function BlogDetail({ data }) {
  const { id } = useParams();
  const blog = data.blogsSection.items.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="bg-[#f5f3ee]">
        <Container className="flex min-h-[70vh] flex-col justify-center py-20">
          <h1 className="text-5xl font-black tracking-[-0.05em]">Note not found.</h1>
          <Link to="/" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#171817] px-5 py-3 text-sm font-bold text-white">
            <ArrowLeft size={15} /> Back home
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <article className="bg-[#f5f3ee] text-[#171817]">
      <SEO title={blog.title} description={blog.description} url={`/blog/${blog.id}`} type="article" />
      <section className="bg-[#191b1a] py-10 text-white sm:py-16 lg:py-20">
        <Container className="max-w-[1040px]">
          <Link to="/#blogs" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-white/38 hover:text-white">
            <ArrowLeft size={14} /> Back to notes
          </Link>

          <header className="mt-9 sm:mt-12">
            <div className="flex gap-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#91a6f0]">
              <span>{blog.category}</span><span>•</span><span>{blog.date}</span>
            </div>
            <h1 className="text-balance mt-4 text-[2.35rem] font-black leading-[0.98] tracking-[-0.052em] sm:mt-5 sm:text-6xl sm:leading-[0.97] sm:tracking-[-0.058em] lg:text-7xl">{blog.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/52">{blog.description}</p>
          </header>
        </Container>
      </section>

      <Container className="max-w-[980px] py-10 sm:py-16">
        <div className="mx-auto max-w-[760px]">
          {blog.content.map((paragraph, index) => (
            <p key={paragraph} className={`mb-6 text-[16px] leading-7 text-black/64 sm:mb-7 sm:text-[17px] sm:leading-8 ${index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-black first-letter:leading-[.82] first-letter:text-[#3557c8]" : ""}`}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
