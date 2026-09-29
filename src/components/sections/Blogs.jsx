import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

function ReadMeta({ index }) {
  return <span>{index === 0 ? "6" : index === 1 ? "4" : "5"} MIN READ</span>;
}

export default function Blogs({ blogsSection }) {
  const [featured, ...rest] = blogsSection.items;

  return (
    <section id="blogs" className="blogs-reference-section">
      <Container>
        <div className="blogs-reference-head">
          <p className="blogs-chip">{blogsSection.label}</p>
          <span className="section-script-title">Notes</span>
          <h2>{blogsSection.title}</h2>
          <p>{blogsSection.description}</p>
        </div>

        {featured && (
          <Link to={`/blog/${featured.id}`} className="blog-featured-card">
            <div className="blog-featured-art" aria-hidden="true">
              <div className="blog-ghost-form" />
              <div className="blog-scan-lines" />
              <span>STATE / 01</span>
            </div>
            <div className="blog-featured-copy">
              <div className="blog-card-meta">
                <span>{featured.category}</span>
                <span>{featured.date}</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <div className="blog-featured-foot">
                <ReadMeta index={0} />
                <span>READ NOTE <ArrowUpRight size={14} /></span>
              </div>
            </div>
          </Link>
        )}

        <div className="blog-card-grid">
          {rest.map((blog, index) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="blog-small-card">
              <div className={`blog-small-art blog-small-art-${index + 1}`} aria-hidden="true">
                <span>0{index + 2}</span>
                <i />
              </div>
              <div className="blog-small-copy">
                <div className="blog-card-meta"><span>{blog.category}</span><span>{blog.date}</span></div>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <div className="blog-small-foot"><ReadMeta index={index + 1} /><ArrowUpRight size={14} /></div>
              </div>
            </Link>
          ))}
          <div className="blog-small-card blog-coming-card" aria-hidden="true">
            <div className="blog-small-art blog-small-art-3"><span>+</span><i /></div>
            <div className="blog-small-copy">
              <div className="blog-card-meta"><span>ARCHIVE</span><span>MORE SOON</span></div>
              <h3>Notes from work that did not fit in a case study.</h3>
              <p>Architecture decisions, debugging lessons and practical product thinking.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
