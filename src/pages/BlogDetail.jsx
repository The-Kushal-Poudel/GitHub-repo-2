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
      <Container className="flex min-h-[70vh] flex-col justify-center py-20">
        <h1 className="text-5xl font-black tracking-[-0.05em]">Note not found.</h1>
        <Link to="/" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#171712] px-5 py-3 text-sm font-bold text-white">
          <ArrowLeft size={15} /> Back home
        </Link>
      </Container>
    );
  }

  return (
    <article className="bg-[#f4f0e8] py-12 sm:py-16 lg:py-20">
      <SEO title={blog.title} description={blog.description} url={`/blog/${blog.id}`} type="article" />
      <Container className="max-w-[980px]">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-black/45 hover:text-black">
          <ArrowLeft size={14} /> Back to portfolio
        </Link>

        <header className="mt-12 border-b border-black/10 pb-10">
          <div className="flex gap-4 text-[10px] font-black uppercase tracking-[0.18em] text-black/38">
            <span>{blog.category}</span><span>•</span><span>{blog.date}</span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl">{blog.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-black/58">{blog.description}</p>
        </header>

        <div className="mx-auto max-w-[760px] py-10 sm:py-14">
          {blog.content.map((paragraph) => (
            <p key={paragraph} className="mb-7 text-[17px] leading-8 text-black/68">{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
