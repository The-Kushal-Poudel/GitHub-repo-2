import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

function OrbitProject({ project, index, count, rotation }) {
  const baseAngle = (360 / count) * index - 90;
  const angle = baseAngle + rotation;
  const initials = project.title
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      to={`/project/${project.slug}`}
      className="gravity-project-node"
      style={{
        "--orbit-angle": `${angle}deg`,
        "--orbit-index": index,
      }}
    >
      <div className="gravity-project-media">
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="gravity-project-fallback" aria-hidden="true">
            <strong>{initials}</strong>
          </div>
        )}

        <span className="gravity-project-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="gravity-project-label">
        <div>
          <span>{project.kicker}</span>
          <strong>{project.title}</strong>
        </div>
        <ArrowUpRight size={14} />
      </div>
    </Link>
  );
}

export default function Projects({ projectsSection, reducedMotion = false }) {
  const stageRef = useRef(null);
  const dragRef = useRef({
    active: false,
    lastX: 0,
    velocity: 0,
  });

  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;

    let frame = 0;
    let last = performance.now();

    const tick = (now) => {
      const delta = Math.min((now - last) / 16.67, 2);
      last = now;

      if (!dragRef.current.active && !paused) {
        setRotation((value) => value + 0.035 * delta);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, reducedMotion]);

  const onPointerDown = (event) => {
    dragRef.current.active = true;
    dragRef.current.lastX = event.clientX;
    dragRef.current.velocity = 0;
    setDragging(true);
    stageRef.current?.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragRef.current.active) return;

    const dx = event.clientX - dragRef.current.lastX;
    dragRef.current.lastX = event.clientX;
    dragRef.current.velocity = dx;

    setRotation((value) => value + dx * 0.22);
  };

  const releasePointer = (event) => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    setDragging(false);

    try {
      stageRef.current?.releasePointerCapture?.(event.pointerId);
    } catch {
      // Pointer capture may already be released.
    }

    const momentum = dragRef.current.velocity * 0.45;
    if (Math.abs(momentum) > 0.5) {
      setRotation((value) => value + momentum);
    }
  };

  return (
    <section id="projects" className="gravity-projects-section">
      <Container>
        <header className="gravity-projects-head">
          <div>
            <p className="section-tech-label">04 / {projectsSection.label}</p>
            <span className="section-script-title">Selected work</span>
          </div>

          <div className="gravity-projects-title">
            <h2>WORK<br />IN ORBIT</h2>
          </div>

          <p>{projectsSection.description}</p>
        </header>

        <div
          ref={stageRef}
          className={`gravity-orbit-stage ${dragging ? "is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={releasePointer}
          onPointerCancel={releasePointer}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            if (dragRef.current.active) {
              dragRef.current.active = false;
              setDragging(false);
            }
          }}
          role="region"
          aria-label="Interactive project orbit. Drag horizontally to rotate projects."
        >
          <div className="gravity-orbit-rings" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <div className="gravity-orbit-center">
            <span>DRAG</span>
            <strong>TO EXPLORE</strong>
            <small>{projectsSection.items.length} PROJECTS</small>
          </div>

          <div className="gravity-orbit-track">
            {projectsSection.items.map((project, index) => (
              <OrbitProject
                key={project.id}
                project={project}
                index={index}
                count={projectsSection.items.length}
                rotation={rotation}
              />
            ))}
          </div>

          <div className="gravity-orbit-axis gravity-orbit-axis-x" aria-hidden="true" />
          <div className="gravity-orbit-axis gravity-orbit-axis-y" aria-hidden="true" />
        </div>

        <footer className="gravity-projects-foot">
          <span>DRAG HORIZONTALLY TO ROTATE</span>
          <span>CLICK A PROJECT TO OPEN ITS CASE STUDY</span>
        </footer>
      </Container>
    </section>
  );
}
