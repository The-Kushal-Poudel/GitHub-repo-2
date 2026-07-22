import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

export default function BlogDetail({ data, reducedMotion }) {
  const { id } = useParams();
  const blog = data.blogsSection.items.find((b) => b.id === id);
  const profile = data.profile;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return (
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-red-700">Article Not Found</h1>
        <p className="mt-4 text-[#655d52]">The blog post you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#151412] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a78d67]">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </Container>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description || blog.excerpt || blog.title,
    "url": `https://thekushalpoudel.com.np/blog/${blog.id}`,
    "datePublished": blog.date ? new Date(blog.date).toISOString() : undefined,
    "author": {
      "@type": "Person",
      "name": profile?.name || "Kushal Poudel"
    }
  };

  return (
    <article className="pt-8 pb-20 lg:pt-12 lg:pb-28">
      <SEO 
        title={blog.title} 
        description={blog.description || blog.excerpt} 
        url={`/blog/${blog.id}`}
        type="article"
        schema={schema}
      />
      <Container className="max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#a78d67] transition hover:text-[#151412]">
            <ArrowLeft size={16} /> Back to Articles
          </Link>
        </div>

        <header className="mb-12 border-b border-[#e6ded0] pb-10">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-[#151412] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
              {blog.category}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8c806f]">
              <CalendarDays size={16} /> {blog.date}
            </span>
          </div>
          
          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            className="font-serif text-4xl font-bold leading-tight text-[#201d18] md:text-5xl"
          >
            {blog.title}
          </motion.h1>
          
          {blog.description && (
            <p className="mt-6 text-xl leading-relaxed text-[#655d52]">
              {blog.description}
            </p>
          )}
        </header>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-stone max-w-none hover:prose-a:text-[#a78d67] prose-a:transition-colors prose-headings:font-serif prose-headings:text-[#201d18] prose-p:text-[#4a443c] prose-strong:text-[#151412]"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {blog.link && (
          <div className="mt-12 rounded-xl bg-white/50 p-6 text-center border border-[#e6ded0]">
            <p className="text-[#655d52] mb-4">This article was originally published externally.</p>
            <a href={blog.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#151412] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a78d67]">
              Read Original Post
            </a>
          </div>
        )}
      </Container>
    </article>
  );
}
