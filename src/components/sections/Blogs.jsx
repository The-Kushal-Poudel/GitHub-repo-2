import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { fadeUp, popIn, stagger } from "../../lib/animations";

export default function Blogs({ blogsSection, reducedMotion }) {
  return (
    <section id="blogs" className="relative overflow-hidden border-y border-[#e6ded0] bg-white py-12 lg:py-14">
      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#d2c4ae_1px,transparent_1px)] [background-size:30px_30px]" aria-hidden="true" />

      <Container className="relative">
        <motion.div variants={stagger} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.35 }} className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading label={blogsSection.label} title={blogsSection.title} description={blogsSection.description} icon={<BookOpen size={15} aria-hidden="true" />} iconImage={blogsSection.iconImage} />
          <motion.a variants={fadeUp} whileHover={reducedMotion ? undefined : { x: 8 }} href={blogsSection.ctaLink} className="inline-flex items-center gap-2 text-sm font-bold text-[#211f1a] hover:text-[#a78d67]">
            {blogsSection.ctaText} <ArrowRight size={16} aria-hidden="true" />
          </motion.a>
        </motion.div>

        <motion.div variants={stagger} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {blogsSection.items.map((blog) => (
            <motion.article
              key={blog.id}
              variants={popIn}
              whileHover={reducedMotion ? undefined : { y: -16, scale: 1.035, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group rounded-xl border border-[#e6ded0] bg-[#f8f3eb]/85 p-5 shadow-sm transition-all hover:bg-white hover:shadow-2xl hover:shadow-black/15 sm:p-6"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#151412] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  {blog.category}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#7d7162]">
                  <CalendarDays size={14} aria-hidden="true" /> {blog.date}
                </span>
              </div>

              <h3 className="text-xl font-bold leading-snug text-[#201d18] transition group-hover:text-[#a78d67]">{blog.title}</h3>
              <p className="mt-4 min-h-[98px] text-sm leading-7 text-[#655d52]">{blog.description}</p>

              {blog.link ? (
                <motion.a href={blog.link} target="_blank" rel="noreferrer" whileHover={reducedMotion ? undefined : { x: 8 }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a78d67]">
                  Read Article <ArrowRight size={14} aria-hidden="true" />
                </motion.a>
              ) : (
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a78d67]">
                  Draft Coming Soon <ArrowRight size={14} aria-hidden="true" />
                </span>
              )}
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
