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
      <div className="bg-[#f4f1ea]">
        <Container className="flex min-h-[70vh] flex-col justify-center py-20">
          <h1 className="text-5xl font-black tracking-[-0.05em]">Note not found.</h1>
          <Link to="/" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#11131a] px-5 py-3 text-sm font-bold text-white">
            <ArrowLeft size={15} /> Back home
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <article className="bg-[#f4f1ea]">
      <SEO title={blog.title} description={blog.description} url={`/blog/${blog.id}`} type="article" />
      <section className="relative overflow-hidden bg-[#0a0c10] py-12 text-white sm:py-16 lg:py-20">
        <div className="cool-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute right-[-80px] top-[-160px] h-96 w-96 rounded-full bg-[#5b6cff]/22 blur-[120px]" />
        <Container className="relative max-w-[1040px]">
          <Link to="/#blogs" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/40 hover:text-[#c9ff4b]">
            <ArrowLeft size={14} /> Back to notes
          </Link>

          <header className="mt-12">
            <div className="flex gap-4 text-[9px] font-black uppercase tracking-[0.18em] text-[#7890ff]">
              <span>{blog.category}</span><span>•</span><span>{blog.date}</span>
            </div>
            <h1 className="text-balance mt-5 text-4xl font-black leading-[0.96] tracking-[-0.062em] sm:text-6xl lg:text-7xl">{blog.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/52">{blog.description}</p>
          </header>
        </Container>
      </section>

      <Container className="max-w-[980px] py-12 sm:py-16">
        <div className="mx-auto max-w-[760px]">
          {blog.content.map((paragraph, index) => (
            <p key={paragraph} className={`mb-7 text-[17px] leading-8 text-black/68 ${index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-black first-letter:leading-[.82] first-letter:text-[#5b6cff]" : ""}`}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
