import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

function ProjectPoster({ project, index }) {
  const initials = project.title.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Link
      to={`/project/${project.slug}`}
      className={`project-poster-card project-poster-card-${index + 1}`}
      style={{ "--poster-index": index }}
    >
      <div className="project-poster-topline">
        <span>0{index + 1}</span>
        <span>{project.status}</span>
      </div>

      <div className="project-poster-visual">
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="project-poster-glyph" aria-hidden="true">
            <span>{initials}</span>
            <i />
            <b>{project.kicker}</b>
          </div>
        )}
      </div>

      <div className="project-poster-copy">
        <p>{project.kicker}</p>
        <h3>{project.title}</h3>
        <div className="project-poster-stack">
          {project.techStack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>

      <span className="project-poster-arrow"><ArrowUpRight size={17} /></span>
    </Link>
  );
}

export default function Projects({ projectsSection }) {
  return (
    <section id="projects" className="projects-reference-section">
      <Container>
        <div className="projects-reference-head">
          <div>
            <p className="section-tech-label">04 / {projectsSection.label}</p>
            <span className="projects-welcome">WELCOME<br />TO MY</span>
          </div>

          <div className="projects-title-block">
            <span className="section-script-title">Selected work</span>
            <span className="projects-title-ghost" aria-hidden="true">PORTFOLIO</span>
            <h2>PORTFOLIO</h2>
            <i aria-hidden="true" />
          </div>

          <p className="projects-head-copy">{projectsSection.description}</p>
        </div>

        <div className="projects-poster-stage">
          <div className="projects-stage-orbit" aria-hidden="true">
            <span>SELECTED WORK · SELECTED WORK · SELECTED WORK ·</span>
          </div>
          {projectsSection.items.map((project, index) => (
            <ProjectPoster key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="projects-reference-bottom">
          <span>CLICK A CARD TO OPEN THE CASE STUDY</span>
          <span>{projectsSection.items.length} SELECTED PROJECTS / AUTO MOTION</span>
        </div>
      </Container>
    </section>
  );
}
